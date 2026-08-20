# Data Harness

[English](README.md) | 中文

Data Harness 是基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 构建的产品。本仓库是 deepseek-harness 的 fork，定制了 Data Harness 品牌皮肤。

## 定制内容

- **Data Harness 品牌皮肤**（`plugins/data-harness-layout-ui`）：用 Data Harness 数据库图标和字样填充原生侧边栏与会话首屏的品牌槽位。
- **设置栏目**（beta）：技能、连接器、模板库，各自配了专属导航图标和 beta 徽章。

## 从源码运行

### 环境要求

- **Node.js** `^22.19.0 || >=24.0.0`（通过 `engines` 固定）
- **pnpm** `11.7.0`（通过 `packageManager` 固定）

### 安装与构建

```sh
git clone git@github.com:zhshenry/data-harness.git
cd data-harness
pnpm install
pnpm run build
```

`pnpm run build` 会准备仓库产物（已构建的 `lib/` 包和 Web 前端壳）。`pnpm dsh web` 直接使用这些已构建产物，不会重新构建。

### 启动 Web 界面

Windows PowerShell 下最省事：

```powershell
./dev.ps1
```

`dev.ps1` 会启动一个隔离的开发实例：

1. 仅对当前进程把 `DSH_HOME` 设为仓库内的 `.dsh` 目录（会话数据留在仓库内，不会写入全局；不要用 `setx` 持久化）。
2. 执行 `pnpm dsh web --port 3090`。

然后打开 <http://127.0.0.1:3090>。

不用辅助脚本的等价命令：

```sh
# Windows PowerShell
$env:DSH_HOME = ".dsh"; pnpm dsh web --port 3090

# macOS / Linux
DSH_HOME=.dsh pnpm dsh web --port 3090
```

### 修改品牌皮肤

品牌皮肤位于 `plugins/data-harness-layout-ui/lib/client.js`（已提交的构建产物）。`dsh web` 会轮询该文件并在变更时刷新页面，所以修改后刷新浏览器即可生效，无需重新构建。

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
