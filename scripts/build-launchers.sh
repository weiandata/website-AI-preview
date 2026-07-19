#!/bin/zsh
# Regenerates the two double-clickable launchers in the project root.
#
# They are AppleScript apps rather than .command files because double-clicking a
# .command always spawns a Terminal window, which the administrator should never
# have to see or understand. Each app is a thin shell around launcher.sh, and it
# locates the project from its own path so the folder can be moved or renamed.

set -eu

typeset -gr ROOT="${${(%):-%x}:A:h:h}"

build_app() {
  local app_name="$1" action="$2" action_label="$3"
  local app_path="${ROOT}/${app_name}.app"
  local source_file
  source_file="$(mktemp -t weian-launcher).applescript"

  # `path to me` resolves to the .app itself; its parent is the project root.
  cat >"$source_file" <<APPLESCRIPT
on run
	set appPath to POSIX path of (path to me)
	set projectDir to do shell script "dirname " & quoted form of (text 1 thru -2 of appPath)
	set launcher to projectDir & "/tools/skill-manager/launcher.sh"
	try
		do shell script "/bin/zsh " & quoted form of launcher & " ${action}"
	on error errorMessage number errorNumber
		if errorNumber is not -128 then
			display dialog "无法${action_label} Skill 管理器：" & return & return & errorMessage buttons {"好"} default button 1 with title "Skill 管理器" with icon stop
		end if
	end try
end run
APPLESCRIPT

  rm -rf "$app_path"
  osacompile -o "$app_path" "$source_file"
  rm -f "$source_file"
  print -r -- "已生成 ${app_name}.app"
}

build_app "打开 Skill 管理器" open 打开
build_app "停止 Skill 管理器" stop 停止
