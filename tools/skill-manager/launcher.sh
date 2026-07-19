#!/bin/zsh
# Core logic behind the two double-clickable launchers. Kept as a plain script
# so it can be exercised from a test run rather than only by double-clicking.
#
#   launcher.sh status   -> prints running | stopped
#   launcher.sh open     -> starts the manager if needed, then opens the browser
#   launcher.sh stop     -> terminates the manager and any orphaned child

set -u

typeset -gr MANAGER_PORT=4174
typeset -gr MANAGER_URL="http://127.0.0.1:${MANAGER_PORT}"
typeset -gr MANAGER_MIN_NODE_MAJOR=20
typeset -gr MANAGER_SCRIPT_DIR="${${(%):-%x}:A:h}"
typeset -gr MANAGER_PROJECT_DIR="${MANAGER_SCRIPT_DIR:h:h}"
typeset -gr MANAGER_LOG="${MANAGER_PROJECT_DIR}/.skill-manager.log"
typeset -gr MANAGER_PID_FILE="${MANAGER_PROJECT_DIR}/.skill-manager.pid"

manager_port_busy() {
  # Listening socket, not process table: this is what actually blocks a restart.
  lsof -nP -iTCP:"${MANAGER_PORT}" -sTCP:LISTEN >/dev/null 2>&1
}

manager_status() {
  if manager_port_busy; then
    print -r -- running
  else
    print -r -- stopped
  fi
}

# GUI launchers have no terminal, so anything the administrator must read goes
# through a native dialog instead of stdout.
manager_alert() {
  local body="$1"
  if [[ -n "${MANAGER_HEADLESS:-}" ]]; then
    print -u2 -r -- "$body"
    return
  fi
  osascript -e "display dialog ${(qqq)body} buttons {\"好\"} default button 1 with title \"Skill 管理器\" with icon caution" >/dev/null 2>&1
  return 0
}

manager_notify() {
  local body="$1"
  if [[ -n "${MANAGER_HEADLESS:-}" ]]; then
    print -r -- "$body"
    return
  fi
  osascript -e "display notification ${(qqq)body} with title \"Skill 管理器\"" >/dev/null 2>&1
  return 0
}

manager_node_major() {
  local raw
  raw="$(node --version 2>/dev/null)" || return 1
  raw="${raw#v}"
  print -r -- "${raw%%.*}"
}

manager_require_runtime() {
  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    manager_alert "未找到 Node.js。请先安装 Node.js ${MANAGER_MIN_NODE_MAJOR} 或更高版本，再打开管理器。"
    return 1
  fi
  local major
  major="$(manager_node_major)" || {
    manager_alert "无法确认 Node.js 版本，请重新安装 Node.js ${MANAGER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  }
  if (( major < MANAGER_MIN_NODE_MAJOR )); then
    manager_alert "Node.js 版本过低（当前 ${major}），需要 ${MANAGER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  fi
}

manager_ensure_dependencies() {
  [[ -d "${MANAGER_PROJECT_DIR}/node_modules" ]] && return 0
  manager_notify "首次运行，正在安装依赖，请稍候…"
  if (cd "${MANAGER_PROJECT_DIR}" && npm install >>"${MANAGER_LOG}" 2>&1); then
    return 0
  fi
  manager_alert "依赖安装失败。请检查网络后重试，详情见 .skill-manager.log。"
  return 1
}

# `condition` is evaluated so callers can negate it; every call site passes a
# literal defined in this file, never external input.
manager_wait_until() {
  local condition="$1" attempts="$2" index=0
  while (( index < attempts )); do
    if eval "$condition"; then
      return 0
    fi
    sleep 1
    (( index += 1 ))
  done
  return 1
}

manager_start_detached() {
  # The server must outlive this script and the launcher app, so double-clicking
  # never leaves the browser pointing at a dead port. The npm PID is recorded so
  # stopping can walk its children instead of pattern-matching command lines.
  (
    cd "${MANAGER_PROJECT_DIR}" || exit 1
    SKILL_MANAGER_NO_OPEN=1 nohup npm run skill-manager >>"${MANAGER_LOG}" 2>&1 &
    print -r -- $! >"${MANAGER_PID_FILE}"
  )
}

manager_open() {
  manager_require_runtime || return 1

  if manager_port_busy; then
    # Already serving: this is the "I closed the tab and lost the way back" path.
    open "${MANAGER_URL}"
    return 0
  fi

  manager_ensure_dependencies || return 1
  : >"${MANAGER_LOG}"
  manager_start_detached

  if ! manager_wait_until manager_port_busy 40; then
    manager_alert "管理器启动超时。请查看项目目录下的 .skill-manager.log 了解原因。"
    return 1
  fi
  open "${MANAGER_URL}"
  return 0
}

# Children first, so npm cannot outlive the node process it spawned.
manager_kill_tree() {
  local pid="$1" signal="$2" child
  for child in ${(f)"$(pgrep -P "$pid" 2>/dev/null)"}; do
    manager_kill_tree "$child" "$signal"
  done
  kill "-${signal}" "$pid" 2>/dev/null
  return 0
}

# Whoever is actually holding the port — the one process that definitely matters.
manager_listener_pids() {
  lsof -tnP -iTCP:"${MANAGER_PORT}" -sTCP:LISTEN 2>/dev/null
}

manager_terminate() {
  local signal="$1" pid
  if [[ -f "${MANAGER_PID_FILE}" ]]; then
    pid="$(<"${MANAGER_PID_FILE}")"
    [[ -n "$pid" ]] && manager_kill_tree "$pid" "$signal"
  fi
  # Covers a server started some other way, or a stale PID file.
  for pid in ${(f)"$(manager_listener_pids)"}; do
    manager_kill_tree "$pid" "$signal"
  done
  return 0
}

manager_stop() {
  if ! manager_port_busy; then
    rm -f "${MANAGER_PID_FILE}"
    manager_notify "管理器本来就没有在运行。"
    return 0
  fi

  # Never pattern-match command lines here: `pkill -f` also matches unrelated
  # processes that merely mention the path, including the shell running this.
  manager_terminate TERM
  if ! manager_wait_until "! manager_port_busy" 8; then
    manager_terminate KILL
    manager_wait_until "! manager_port_busy" 5
  fi

  if manager_port_busy; then
    manager_alert "未能停止管理器，端口 ${MANAGER_PORT} 仍被占用。"
    return 1
  fi
  rm -f "${MANAGER_PID_FILE}"
  manager_notify "管理器已停止。"
  return 0
}

case "${1:-}" in
  status) manager_status ;;
  open) manager_open ;;
  stop) manager_stop ;;
  *)
    print -u2 -r -- "用法: launcher.sh [status|open|stop]"
    exit 64
    ;;
esac
