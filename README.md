# Data Harness

English | [中文](README.zh.md)

Data Harness is built on [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). This repository is a fork of deepseek-harness, customized with the Data Harness brand skin.

## Customizations

- **Data Harness brand skin** (`plugins/data-harness-layout-ui`): fills the native sidebar and conversation hero brand slots with the Data Harness database glyph and wordmark.
- **Settings sections** (beta): Skills, Connectors, and Template library, each with a dedicated nav icon and a beta badge.

## Run from source

```sh
git clone git@github.com:zhshenry/data-harness.git
cd data-harness
pnpm install
pnpm run build
pnpm dsh web
```

`pnpm run build` prepares the repository artifacts. `pnpm dsh web` uses those built artifacts without rebuilding.

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
