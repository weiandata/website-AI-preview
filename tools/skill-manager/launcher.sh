#!/bin/zsh
# Core logic behind the double-clickable launcher apps. Kept as a plain script
# so it can be exercised from a test run rather than only by double-clicking.
#
#   launcher.sh <service> status   -> prints running | stopped
#   launcher.sh <service> open     -> starts it if needed, then opens the browser
#   launcher.sh <service> stop     -> terminates it and any orphaned child
#
# Services: manager (the Skill editor) | preview (the site itself)

set -u

typeset -gr LAUNCHER_MIN_NODE_MAJOR=20
typeset -gr LAUNCHER_SCRIPT_DIR="${${(%):-%x}:A:h}"
typeset -gr LAUNCHER_PROJECT_DIR="${LAUNCHER_SCRIPT_DIR:h:h}"

typeset -g SERVICE_LABEL="" SERVICE_URL="" SERVICE_LOG="" SERVICE_PID_FILE=""
typeset -g SERVICE_NPM_SCRIPT=""
typeset -gi SERVICE_PORT=0 SERVICE_READY_ATTEMPTS=0
typeset -ga SERVICE_NPM_ARGS=()

launcher_configure() {
  case "$1" in
    manager)
      SERVICE_LABEL="Skill 管理器"
      SERVICE_PORT=4174
      SERVICE_NPM_SCRIPT="skill-manager"
      SERVICE_NPM_ARGS=()
      SERVICE_READY_ATTEMPTS=40
      ;;
    preview)
      SERVICE_LABEL="网站预览"
      SERVICE_PORT=3000
      SERVICE_NPM_SCRIPT="dev"
      SERVICE_NPM_ARGS=(-- --port 3000)
      # A cold Next.js dev build is slower than the manager's server.
      SERVICE_READY_ATTEMPTS=90
      ;;
    *)
      print -u2 -r -- "未知服务：$1"
      return 1
      ;;
  esac
  SERVICE_URL="http://127.0.0.1:${SERVICE_PORT}"
  SERVICE_LOG="${LAUNCHER_PROJECT_DIR}/.${1}-launcher.log"
  SERVICE_PID_FILE="${LAUNCHER_PROJECT_DIR}/.${1}-launcher.pid"
}

# A double-clicked app inherits PATH=/usr/bin:/bin:/usr/sbin:/sbin from
# LaunchServices — no Homebrew, no version manager. Node is installed and still
# "not found", which is the confusing failure this repairs.
launcher_widen_path() {
  local candidate
  for candidate in \
    /opt/homebrew/bin /usr/local/bin /opt/local/bin \
    "${HOME}/.volta/bin" "${HOME}/.local/bin"
  do
    [[ -d "$candidate" ]] && PATH="${candidate}:${PATH}"
  done

  # nvm, fnm, and asdf only exist once a shell has sourced its profile, so ask a
  # login shell where things are rather than guessing their layouts.
  if ! command -v node >/dev/null 2>&1; then
    local login_path
    login_path="$(/bin/zsh -lc 'print -rn -- $PATH' 2>/dev/null)"
    [[ -n "$login_path" ]] && PATH="${login_path}:${PATH}"
  fi

  export PATH
}

launcher_port_busy() {
  lsof -nP -iTCP:"${SERVICE_PORT}" -sTCP:LISTEN >/dev/null 2>&1
}

launcher_recorded_pid_alive() {
  [[ -f "${SERVICE_PID_FILE}" ]] || return 1
  local pid
  pid="$(<"${SERVICE_PID_FILE}")"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

# Port 3000 is popular, so "something is listening" is not proof it is ours.
# Treating a stranger's server as our own would open the wrong page and let Stop
# kill an unrelated process.
launcher_ours() {
  launcher_port_busy && launcher_recorded_pid_alive
}

launcher_status() {
  if launcher_ours; then
    print -r -- running
  else
    print -r -- stopped
  fi
}

# GUI launchers have no terminal, so anything the administrator must read goes
# through a native dialog instead of stdout.
launcher_alert() {
  local body="$1"
  if [[ -n "${MANAGER_HEADLESS:-}" ]]; then
    print -u2 -r -- "$body"
    return 0
  fi
  osascript -e "display dialog ${(qqq)body} buttons {\"好\"} default button 1 with title ${(qqq)SERVICE_LABEL} with icon caution" >/dev/null 2>&1
  return 0
}

launcher_notify() {
  local body="$1"
  if [[ -n "${MANAGER_HEADLESS:-}" ]]; then
    print -r -- "$body"
    return 0
  fi
  osascript -e "display notification ${(qqq)body} with title ${(qqq)SERVICE_LABEL}" >/dev/null 2>&1
  return 0
}

launcher_node_major() {
  local raw
  raw="$(node --version 2>/dev/null)" || return 1
  raw="${raw#v}"
  print -r -- "${raw%%.*}"
}

launcher_require_runtime() {
  launcher_widen_path
  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    launcher_alert "未找到 Node.js。请先安装 Node.js ${LAUNCHER_MIN_NODE_MAJOR} 或更高版本，再打开。"
    return 1
  fi
  local major
  major="$(launcher_node_major)" || {
    launcher_alert "无法确认 Node.js 版本，请重新安装 Node.js ${LAUNCHER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  }
  if (( major < LAUNCHER_MIN_NODE_MAJOR )); then
    launcher_alert "Node.js 版本过低（当前 ${major}），需要 ${LAUNCHER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  fi
}

launcher_ensure_dependencies() {
  [[ -d "${LAUNCHER_PROJECT_DIR}/node_modules" ]] && return 0
  launcher_notify "首次运行，正在安装依赖，请稍候…"
  if (cd "${LAUNCHER_PROJECT_DIR}" && npm install >>"${SERVICE_LOG}" 2>&1); then
    return 0
  fi
  launcher_alert "依赖安装失败。请检查网络后重试，详情见 $(basename "${SERVICE_LOG}")。"
  return 1
}

# `condition` is evaluated so callers can negate it; every call site passes a
# literal defined in this file, never external input.
launcher_wait_until() {
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

launcher_start_detached() {
  # The server must outlive this script and the launcher app, so double-clicking
  # never leaves the browser pointing at a dead port. The npm PID is recorded so
  # stopping can walk its children instead of pattern-matching command lines.
  (
    cd "${LAUNCHER_PROJECT_DIR}" || exit 1
    SKILL_MANAGER_NO_OPEN=1 nohup npm run "${SERVICE_NPM_SCRIPT}" ${SERVICE_NPM_ARGS[@]} \
      >>"${SERVICE_LOG}" 2>&1 &
    print -r -- $! >"${SERVICE_PID_FILE}"
  )
}

launcher_open() {
  launcher_require_runtime || return 1

  if launcher_ours; then
    # Already serving: this is the "I closed the tab and lost the way back" path.
    open "${SERVICE_URL}"
    return 0
  fi

  if launcher_port_busy; then
    launcher_alert "端口 ${SERVICE_PORT} 已被其他程序占用，无法启动${SERVICE_LABEL}。请先关闭那个程序。"
    return 1
  fi

  launcher_ensure_dependencies || return 1
  : >"${SERVICE_LOG}"
  launcher_start_detached

  if ! launcher_wait_until launcher_port_busy "${SERVICE_READY_ATTEMPTS}"; then
    launcher_alert "${SERVICE_LABEL}启动超时。详情见项目目录下的 $(basename "${SERVICE_LOG}")。"
    return 1
  fi
  open "${SERVICE_URL}"
  return 0
}

# Children first, so npm cannot outlive the node process it spawned.
launcher_kill_tree() {
  local pid="$1" signal="$2" child
  for child in ${(f)"$(pgrep -P "$pid" 2>/dev/null)"}; do
    launcher_kill_tree "$child" "$signal"
  done
  kill "-${signal}" "$pid" 2>/dev/null
  return 0
}

launcher_terminate() {
  local signal="$1" pid
  if [[ -f "${SERVICE_PID_FILE}" ]]; then
    pid="$(<"${SERVICE_PID_FILE}")"
    [[ -n "$pid" ]] && launcher_kill_tree "$pid" "$signal"
  fi
  return 0
}

launcher_stop() {
  if ! launcher_ours; then
    rm -f "${SERVICE_PID_FILE}"
    launcher_notify "${SERVICE_LABEL}本来就没有在运行。"
    return 0
  fi

  # Never pattern-match command lines here: `pkill -f` also matches unrelated
  # processes that merely mention the path, including the shell running this.
  launcher_terminate TERM
  if ! launcher_wait_until "! launcher_port_busy" 8; then
    launcher_terminate KILL
    launcher_wait_until "! launcher_port_busy" 5
  fi

  if launcher_port_busy; then
    launcher_alert "未能停止${SERVICE_LABEL}，端口 ${SERVICE_PORT} 仍被占用。"
    return 1
  fi
  rm -f "${SERVICE_PID_FILE}"
  launcher_notify "${SERVICE_LABEL}已停止。"
  return 0
}

# Allows tests to source the functions without running an action.
if [[ -n "${MANAGER_SOURCE_ONLY:-}" ]]; then
  return 0 2>/dev/null || exit 0
fi

launcher_configure "${1:-}" || exit 64
case "${2:-}" in
  status) launcher_status ;;
  open) launcher_open ;;
  stop) launcher_stop ;;
  *)
    print -u2 -r -- "用法: launcher.sh [manager|preview] [status|open|stop]"
    exit 64
    ;;
esac
