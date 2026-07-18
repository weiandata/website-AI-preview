#!/bin/zsh

set -u

typeset -gr MANAGER_URL="http://127.0.0.1:4174"
typeset -gr MANAGER_MIN_NODE_MAJOR=20
typeset -gr MANAGER_LAUNCHER_FILE="${${(%):-%x}:A}"
typeset -gr MANAGER_PROJECT_DIR="${MANAGER_LAUNCHER_FILE:h}"

manager_info() {
  print -u2 -r -- "提示：$*"
}

manager_error() {
  print -u2 -r -- "错误：$*"
}

manager_command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Always the directory holding this file, never the shell's current directory.
manager_resolve_project_dir() {
  print -r -- "$MANAGER_PROJECT_DIR"
}

manager_node_major() {
  local raw
  raw="$(node --version 2>/dev/null)" || return 1
  raw="${raw#v}"
  print -r -- "${raw%%.*}"
}

manager_require_runtime() {
  local command_name

  for command_name in node npm; do
    if manager_command_exists "$command_name"; then
      continue
    fi
    case "$command_name" in
      node)
        manager_error "未找到 Node.js。请先安装 Node.js ${MANAGER_MIN_NODE_MAJOR} 或更高版本，然后重新双击此文件。"
        ;;
      npm)
        manager_error "未找到 npm。请修复 Node.js/npm 安装后重试。"
        ;;
    esac
    return 1
  done

  local major
  major="$(manager_node_major)" || {
    manager_error "无法确认 Node.js 版本，请重新安装 Node.js ${MANAGER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  }
  if (( major < MANAGER_MIN_NODE_MAJOR )); then
    manager_error "Node.js 版本过低（当前 ${major}），需要 ${MANAGER_MIN_NODE_MAJOR} 或更高版本。"
    return 1
  fi
}

manager_ensure_dependencies() {
  local project_dir="$1"

  if [[ -d "$project_dir/node_modules" ]]; then
    return 0
  fi

  manager_info "首次运行，正在安装项目依赖，请稍候..."
  if (cd "$project_dir" && npm install); then
    return 0
  fi

  manager_error "项目依赖安装失败，请检查网络后重试。"
  return 1
}

manager_start() {
  local project_dir="$1"

  (cd "$project_dir" && npm run skill-manager)
}

manager_main() {
  local project_dir
  project_dir="$(manager_resolve_project_dir)" || return 1

  manager_require_runtime || return 1
  manager_ensure_dependencies "$project_dir" || return 1

  manager_info "Skill 管理器地址：${MANAGER_URL}"
  manager_info "关闭这个窗口或按 Control-C 即可停止。"
  manager_start "$project_dir"
}

if [[ -z "${WEIAN_MANAGER_LAUNCHER_SOURCE_ONLY:-}" ]]; then
  manager_main
  typeset -gi MANAGER_STATUS=$?
  print -r -- "Skill 管理器已停止（状态码：${MANAGER_STATUS}）。"
  print -n -r -- "按回车键关闭..."
  read -r _ 2>/dev/null
  exit $MANAGER_STATUS
fi
