# Local Website Test Launcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an executable macOS launcher that starts the local WEIAN DATA development site, opens it when ready, and stops it cleanly on Control+C.

**Architecture:** Keep the user-facing entry point in one root-level zsh script, with small functions for dependency checks, port selection, readiness polling, browser launch, and cleanup. Source that script in a standalone zsh test harness through a source-only environment guard so automated tests can replace external commands without opening a browser or starting Next.js.

**Tech Stack:** zsh, standard macOS commands (`lsof`, `curl`, `open`), npm, Next.js, a dependency-free zsh test harness.

## Global Constraints

- Platform: macOS.
- Entry point: the executable project-root file `测试网站.command`.
- Use the existing `npm run dev` command and pass the selected port to Next.js.
- Search ports 3000 through 3010 in ascending order.
- Open the default browser only after the server accepts an HTTP connection.
- Keep development logs visible and use Control+C to stop the server.
- Run `npm install` only when `node_modules` is missing.
- Use concise Chinese status and error messages.
- Do not add a daemon, stop script, production workflow, GUI bundle, or global software installation.

---

## File Structure

- Create `测试网站.command`: Finder-friendly executable launcher and all runtime lifecycle functions.
- Create `tests/test-website-launcher.zsh`: dependency-free behavioral tests that source the launcher and replace external effects inside subshells.

### Task 1: Finder-Friendly Local Website Launcher

**Files:**
- Create: `测试网站.command`
- Test: `tests/test-website-launcher.zsh`

**Interfaces:**
- Consumes: the existing package script `dev: next dev` from `package.json`.
- Produces: `require_runtime()`, `ensure_dependencies(project_dir)`, `select_available_port(start, end)`, `wait_until_ready(url, attempts)`, `open_site_when_ready(url, attempts)`, `stop_server()`, and `main()` in `测试网站.command`.
- Produces: an executable Finder entry point that returns status 0 after a normal server shutdown and nonzero on setup or startup failure.

- [x] **Step 1: Write the failing behavioral test**

Create `tests/test-website-launcher.zsh` with this complete content:

```zsh
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
```

- [x] **Step 2: Run the behavioral test to verify it fails**

Run:

```bash
zsh tests/test-website-launcher.zsh
```

Expected: FAIL before the test summary because `测试网站.command` does not exist.

- [x] **Step 3: Implement the minimal launcher**

Create `测试网站.command` with this complete content:

```zsh
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
```

- [x] **Step 4: Make the Finder launcher executable**

Run:

```bash
chmod +x 测试网站.command
```

Expected: `stat -f '%Sp' 测试网站.command` prints a mode containing `x`, such as `-rwxr-xr-x`.

- [x] **Step 5: Validate zsh syntax**

Run:

```bash
zsh -n 测试网站.command tests/test-website-launcher.zsh
```

Expected: exit status 0 with no output.

- [x] **Step 6: Run the launcher behavioral tests**

Run:

```bash
zsh tests/test-website-launcher.zsh
```

Expected: exit status 0 and final output `测试结果：11 通过，0 失败`.

- [x] **Step 7: Run the existing project verification**

Run:

```bash
npm test && npm run lint && npm run typecheck && npm run build
```

Expected: all Vitest tests pass, ESLint exits 0, TypeScript exits 0, and Next.js reports a successful production build.

- [x] **Step 8: Perform the manual Finder-equivalent smoke test**

Run from a terminal to preserve the same executable entry point:

```bash
./测试网站.command
```

Expected: the launcher selects an available port between 3000 and 3010, starts Next.js, waits for an HTTP response, opens the default browser to the local site, keeps logs visible, and stops the launched server after Control+C. Confirm the selected port no longer has a listener after shutdown with `lsof -nP -iTCP:<selected-port> -sTCP:LISTEN`.

- [x] **Step 9: Commit the launcher and tests**

```bash
git add 测试网站.command tests/test-website-launcher.zsh
git commit -m "feat: add local website test launcher"
```

Expected: one commit containing only the executable launcher and its behavioral test.
