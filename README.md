# Data Harness

English | [中文](README.zh.md)

Data Harness is built on [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). This repository is a fork of deepseek-harness, customized with the Data Harness brand skin.

## Customizations

- **Data Harness brand skin** (`plugins/data-harness-layout-ui`): fills the native sidebar and conversation hero brand slots with the Data Harness database glyph and wordmark.
- **Settings sections** (beta): Skills, Connectors, and Template library, each with a dedicated nav icon and a beta badge.

## Run from source

### Prerequisites

- **Node.js** `^22.19.0 || >=24.0.0` (pinned via `engines`)
- **pnpm** `11.7.0` (pinned via `packageManager`)

### Install and build

```sh
git clone git@github.com:zhshenry/data-harness.git
cd data-harness
pnpm install
pnpm run build
```

`pnpm run build` prepares the repository artifacts (built `lib/` bundles and the Web shell). `pnpm dsh web` serves those built artifacts without rebuilding.

### Start the Web GUI

The quick way on Windows PowerShell:

```powershell
./dev.ps1
```

`dev.ps1` starts an isolated dev instance:

1. Sets `DSH_HOME` to the repo's `.dsh` directory for this process only (session data stays inside the repo and is never persisted globally — do not use `setx`).
2. Runs `pnpm dsh web --port 3090`.

Then open <http://127.0.0.1:3090>.

The same instance without the helper script:

```sh
# Windows PowerShell
$env:DSH_HOME = ".dsh"; pnpm dsh web --port 3090

# macOS / Linux
DSH_HOME=.dsh pnpm dsh web --port 3090
```

### Edit the brand skin

The brand skin lives at `plugins/data-harness-layout-ui/lib/client.js` (the committed built artifact). `dsh web` stat-polls that file and reloads the page on change, so edits show up after a refresh — no rebuild needed.

## Branches

| Branch | Role |
|--------|------|
| `master` | Production (default) |
| `dev` | Development |
| `dsh-upstream` | Upstream mirror |

See [upstream sync](docs/upstream-sync.md) for the sync workflow.

## Upstream

This repository tracks [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness).

## License

[MIT](LICENSE), inherited from deepseek-harness.
