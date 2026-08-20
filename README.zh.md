# Data Harness

[English](README.md) | 中文

Data Harness 是基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 构建的产品。本仓库是 deepseek-harness 的 fork，定制了 Data Harness 品牌皮肤。

## 定制内容

- **Data Harness 品牌皮肤**（`plugins/data-harness-layout-ui`）：用 Data Harness 数据库图标和字样填充原生侧边栏与会话首屏的品牌槽位。
- **设置栏目**（beta）：技能、连接器、模板库，各自配了专属导航图标和 beta 徽章。

## 从源码运行

```sh
git clone git@github.com:zhshenry/data-harness.git
cd data-harness
pnpm install
pnpm run build
pnpm dsh web
```

`pnpm run build` 会准备仓库产物。`pnpm dsh web` 会直接使用这些已构建产物，不会重新构建。

## 分支结构

| 分支 | 角色 |
|------|------|
| `master` | 生产（默认） |
| `dev` | 开发 |
| `dsh-upstream` | 上游镜像 |

同步流程见 [上游同步](docs/upstream-sync.md)。

## 上游

本仓库跟踪 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。

## 许可证

[MIT](LICENSE)，继承自 deepseek-harness。
