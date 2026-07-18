# Local Website Test Launcher Design

Date: 2026-07-18

## Purpose

Add a macOS Finder-friendly launcher named `测试网站.command` to the project root. A user can double-click it to start the local WEIAN DATA website, open the site in the default browser, and keep the terminal visible for logs.

## User Flow

1. The user double-clicks `测试网站.command` in Finder.
2. The launcher changes to the project directory, regardless of the current shell directory.
3. It verifies that Node.js and npm are available.
4. If project dependencies are missing, it runs `npm install` and stops with a clear Chinese error message if installation fails.
5. It selects the first available port from 3000 through 3010.
6. It starts the Next.js development server on that port.
7. It waits until the local website responds, then opens the URL in the default macOS browser.
8. The terminal remains open and displays server logs. Pressing Control+C stops the development server and exits the launcher.

## Launch Contract

- Platform: macOS.
- Entry point: the executable project-root file `测试网站.command`.
- Runtime command: the existing npm development command, with the selected port passed to Next.js.
- Browser behavior: use the macOS `open` command only after the server is ready.
- Terminal behavior: run the server in the foreground from the user's perspective and retain visible logs.

## Dependency Handling

- Check `node` and `npm` before attempting to start the site.
- Treat a missing `node_modules` directory as dependencies not yet installed.
- Run `npm install` only when dependencies are missing.
- Do not silently install Node.js or change global system configuration.

## Port Selection

- Test ports 3000 through 3010 in ascending order.
- Select the first port that is not listening locally.
- If all candidate ports are occupied, print a Chinese explanation and exit without starting another process.

## Process Lifecycle

- Start one development server process.
- Register cleanup handling before starting the server.
- On Control+C, termination, or launcher exit, stop the server process started by this launcher.
- Do not stop unrelated processes that already use local ports.
- If the development server exits before becoming ready, report the failure and return a nonzero exit status.

## Readiness and Errors

- Poll the selected local URL for a bounded period rather than opening the browser immediately.
- Open the browser once the server accepts an HTTP connection.
- If readiness times out, stop the launched server and display a Chinese troubleshooting message.
- Use concise Chinese status and error messages for Node.js, npm, dependency installation, port availability, server startup, and shutdown.

## Verification

- Validate shell syntax before running behavioral tests.
- Test command and error branches with stubbed commands so verification does not require opening a real browser.
- Verify missing Node.js and npm handling.
- Verify dependency installation is requested only when needed.
- Verify port fallback when port 3000 is occupied.
- Verify the browser opens only after readiness succeeds.
- Verify cleanup stops the child server.
- Perform a final manual smoke test by launching the script and loading the site locally.

## Non-Goals

- No background daemon or separate stop script.
- No production build or production server workflow.
- No Windows or Linux launcher.
- No graphical application bundle.
- No automatic changes to project source code, environment files, or global software installations.
