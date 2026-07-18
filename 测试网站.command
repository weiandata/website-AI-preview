#!/bin/zsh

set -u

typeset -gr PORT_START=3000
typeset -gr PORT_END=3010
typeset -gr READY_ATTEMPTS=60
typeset -g SERVER_PID=""
typeset -gi SERVER_WAS_STARTED=0

info() {
  print -u2 -r -- "提示：$*"
}

error() {
  print -u2 -r -- "错误：$*"
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

require_runtime() {
  local command_name

  for command_name in node npm curl lsof open; do
    if command_exists "$command_name"; then
      continue
    fi

    case "$command_name" in
      node)
        error "未找到 Node.js。请先安装 Node.js，然后重新双击此文件。"
        ;;
      npm)
        error "未找到 npm。请修复 Node.js/npm 安装后重试。"
        ;;
      *)
        error "未找到系统命令 $command_name，无法启动本地网站。"
        ;;
    esac
    return 1
  done
}

ensure_dependencies() {
  local project_dir="$1"

  if [[ -d "$project_dir/node_modules" ]]; then
    return 0
  fi

  info "首次运行，正在安装项目依赖，请稍候..."
  if (cd "$project_dir" && npm install); then
    info "项目依赖安装完成。"
    return 0
  fi

  error "项目依赖安装失败。请检查网络或 npm 配置后重试。"
  return 1
}

port_is_busy() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1
}

select_available_port() {
  local start_port="$1"
  local end_port="$2"
  local port

  for (( port = start_port; port <= end_port; port += 1 )); do
    if ! port_is_busy "$port"; then
      print -r -- "$port"
      return 0
    fi
  done

  error "端口 $start_port 到 $end_port 都已被占用。请关闭一个本地服务后重试。"
  return 1
}

process_is_running() {
  local pid="$1"
  kill -0 "$pid" >/dev/null 2>&1
}

url_is_ready() {
  local url="$1"
  curl -fsS --max-time 1 "$url" >/dev/null 2>&1
}

start_server() {
  local project_dir="$1"
  local port="$2"

  (
    cd "$project_dir" || exit 1
    exec npm run dev -- --port "$port"
  ) &

  SERVER_PID=$!
  SERVER_WAS_STARTED=1
}

wait_until_ready() {
  local url="$1"
  local attempts="$2"
  local attempt=1

  while (( attempt <= attempts )); do
    if url_is_ready "$url"; then
      return 0
    fi

    if ! process_is_running "$SERVER_PID"; then
      error "开发服务器在启动完成前已退出，请查看上方日志。"
      return 1
    fi

    sleep 1
    (( attempt += 1 ))
  done

  error "等待网站启动超时，请查看上方日志。"
  return 1
}

open_browser() {
  local url="$1"
  open "$url" >/dev/null 2>&1
}

open_site_when_ready() {
  local url="$1"
  local attempts="$2"

  wait_until_ready "$url" "$attempts" || return 1

  if ! open_browser "$url"; then
    error "网站已启动，但无法自动打开浏览器。请手动访问 $url"
    return 1
  fi
}

stop_server() {
  if (( SERVER_WAS_STARTED == 1 )) && [[ -n "$SERVER_PID" ]] && process_is_running "$SERVER_PID"; then
    info "正在停止开发服务器..."
    kill -TERM -- "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi

  SERVER_PID=""
  SERVER_WAS_STARTED=0
}

handle_signal() {
  info "收到停止指令。"
  stop_server
  exit 130
}

wait_for_server() {
  wait "$SERVER_PID"
  local exit_status=$?

  SERVER_PID=""
  SERVER_WAS_STARTED=0
  return "$exit_status"
}

main() {
  local project_dir="${0:A:h}"
  local port
  local url

  trap handle_signal INT TERM
  trap stop_server EXIT

  cd "$project_dir" || {
    error "无法进入项目目录：$project_dir"
    return 1
  }

  require_runtime || return 1
  ensure_dependencies "$project_dir" || return 1

  port="$(select_available_port "$PORT_START" "$PORT_END")" || return 1
  url="http://127.0.0.1:$port"

  info "正在端口 $port 启动网站..."
  start_server "$project_dir" "$port"

  if ! open_site_when_ready "$url" "$READY_ATTEMPTS"; then
    return 1
  fi

  info "网站已打开：$url"
  info "此窗口会继续显示日志。按 Control+C 可停止网站。"

  wait_for_server
  local exit_status=$?
  if (( exit_status != 0 )); then
    error "开发服务器已退出，状态码：$exit_status"
  fi
  return "$exit_status"
}

if [[ "${WEIAN_LAUNCHER_SOURCE_ONLY:-0}" != "1" ]]; then
  main "$@"
  exit $?
fi
