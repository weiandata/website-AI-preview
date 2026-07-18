#!/bin/zsh

set -u

typeset -gr PROJECT_ROOT="${0:A:h:h}"
typeset -gr LAUNCHER_PATH="$PROJECT_ROOT/测试网站.command"
typeset -gi PASSED=0
typeset -gi FAILED=0

if [[ ! -f "$LAUNCHER_PATH" ]]; then
  print -u2 -r -- "启动器不存在：$LAUNCHER_PATH"
  exit 1
fi

export WEIAN_LAUNCHER_SOURCE_ONLY=1
source "$LAUNCHER_PATH"
unset WEIAN_LAUNCHER_SOURCE_ONLY

expect_contains() {
  local actual="$1"
  local expected="$2"

  if [[ "$actual" != *"$expected"* ]]; then
    print -u2 -r -- "期望输出包含：$expected"
    print -u2 -r -- "实际输出：$actual"
    return 1
  fi
}

run_test() {
  local name="$1"
  shift

  if "$@"; then
    (( PASSED += 1 ))
    print -r -- "通过：$name"
  else
    (( FAILED += 1 ))
    print -u2 -r -- "失败：$name"
  fi
}

test_missing_node() (
  command_exists() {
    [[ "$1" != "node" ]]
  }

  local output
  output="$(require_runtime 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "Node.js"
)

test_missing_npm() (
  command_exists() {
    [[ "$1" != "npm" ]]
  }

  local output
  output="$(require_runtime 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "npm"
)

test_project_dir_is_launcher_location() (
  local actual
  actual="$(resolve_project_dir)" || return 1

  [[ "$actual" == "$PROJECT_ROOT" ]]
)

test_install_only_when_dependencies_are_missing() (
  local temp_dir
  temp_dir="$(mktemp -d)" || return 1
  trap 'command rm -r -- "$temp_dir"' EXIT

  npm() {
    print -r -- "install" >> "$temp_dir/npm.log"
    return 0
  }

  command mkdir "$temp_dir/node_modules" || return 1
  ensure_dependencies "$temp_dir" || return 1
  [[ ! -e "$temp_dir/npm.log" ]] || return 1

  command rmdir "$temp_dir/node_modules" || return 1
  ensure_dependencies "$temp_dir" || return 1
  [[ "$(command wc -l < "$temp_dir/npm.log" | command tr -d ' ')" == "1" ]]
)

test_dependency_install_failure_is_reported() (
  local temp_dir
  temp_dir="$(mktemp -d)" || return 1
  trap 'command rm -r -- "$temp_dir"' EXIT

  npm() {
    return 1
  }

  local output
  output="$(ensure_dependencies "$temp_dir" 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "项目依赖安装失败"
)

test_port_falls_back_from_3000_to_3001() (
  port_is_busy() {
    [[ "$1" == "3000" ]]
  }

  [[ "$(select_available_port 3000 3010)" == "3001" ]]
)

test_all_ports_busy_returns_an_error() (
  port_is_busy() {
    return 0
  }

  local output
  output="$(select_available_port 3000 3010 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "3000 到 3010"
)

test_readiness_retries_until_success() (
  typeset -gi readiness_checks=0
  SERVER_PID=4321

  url_is_ready() {
    (( readiness_checks += 1 ))
    (( readiness_checks >= 2 ))
  }

  process_is_running() {
    return 0
  }

  sleep() {
    return 0
  }

  wait_until_ready "http://127.0.0.1:3000" 3 || return 1
  (( readiness_checks == 2 ))
)

test_server_exit_before_readiness_is_reported() (
  SERVER_PID=4321

  url_is_ready() {
    return 1
  }

  process_is_running() {
    return 1
  }

  local output
  output="$(wait_until_ready "http://127.0.0.1:3000" 3 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "启动完成前已退出"
)

test_readiness_timeout_is_reported() (
  SERVER_PID=4321

  url_is_ready() {
    return 1
  }

  process_is_running() {
    return 0
  }

  sleep() {
    return 0
  }

  local output
  output="$(wait_until_ready "http://127.0.0.1:3000" 2 2>&1)"
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  expect_contains "$output" "等待网站启动超时"
)

test_browser_opens_only_after_readiness() (
  typeset -ga events=()

  wait_until_ready() {
    events+=("ready")
    return 0
  }

  open_browser() {
    events+=("open")
    return 0
  }

  open_site_when_ready "http://127.0.0.1:3000" 3 || return 1
  [[ "${(j:,:)events}" == "ready,open" ]] || return 1

  events=()
  wait_until_ready() {
    events+=("not-ready")
    return 1
  }

  open_site_when_ready "http://127.0.0.1:3000" 3 >/dev/null 2>&1
  local exit_status=$?

  (( exit_status != 0 )) || return 1
  [[ "${(j:,:)events}" == "not-ready" ]]
)

test_cleanup_stops_only_the_started_server() (
  typeset -g killed_arguments=""
  SERVER_PID=4242
  SERVER_WAS_STARTED=1

  process_is_running() {
    return 0
  }

  kill() {
    killed_arguments="$*"
    return 0
  }

  wait() {
    return 0
  }

  stop_server >/dev/null 2>&1 || return 1
  [[ "$killed_arguments" == "-TERM -- 4242" ]] || return 1
  [[ -z "$SERVER_PID" ]] || return 1
  (( SERVER_WAS_STARTED == 0 ))
)

run_test "缺少 Node.js 时给出中文提示" test_missing_node
run_test "缺少 npm 时给出中文提示" test_missing_npm
run_test "从任意目录启动时定位到项目目录" test_project_dir_is_launcher_location
run_test "只在依赖缺失时安装" test_install_only_when_dependencies_are_missing
run_test "依赖安装失败时报告错误" test_dependency_install_failure_is_reported
run_test "3000 占用时选择 3001" test_port_falls_back_from_3000_to_3001
run_test "端口全部占用时退出" test_all_ports_busy_returns_an_error
run_test "等待网站就绪后继续" test_readiness_retries_until_success
run_test "服务提前退出时报告失败" test_server_exit_before_readiness_is_reported
run_test "网站启动超时时报告失败" test_readiness_timeout_is_reported
run_test "网站就绪后才打开浏览器" test_browser_opens_only_after_readiness
run_test "退出时停止启动器创建的服务" test_cleanup_stops_only_the_started_server

print -r -- ""
print -r -- "测试结果：$PASSED 通过，$FAILED 失败"

(( FAILED == 0 ))
