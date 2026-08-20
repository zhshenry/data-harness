# 上游同步流程

Data Harness 是 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 的 fork。本文档记录从上游同步更新到本仓库的固定流程。

## 分支模型

| 分支 | 角色 |
|------|------|
| `dsh-upstream` | 上游镜像（只从 `upstream/master` 单向 fast-forward） |
| `dev` | 开发 / 集成分支 |
| `master` | 生产分支（从 `dev` 以 `--no-ff` 晋升，默认分支） |

## 一次性配置

```sh
git remote add upstream git@github.com:deepseek-ai/deepseek-harness.git
```

## 同步流程

```sh
# ① 拉取上游
git fetch upstream

# ② 更新镜像分支（永远 fast-forward）
git checkout dsh-upstream
git merge --ff-only upstream/master
git push origin dsh-upstream

# ③ 先合入开发分支
git checkout dev
git merge dsh-upstream
git push origin dev

# ④ 开发稳定后，晋升到生产（保留 merge commit + 打 tag）
git checkout master
git merge --no-ff dev
git push origin master
git tag data-harness-vX.Y.Z
git push origin data-harness-vX.Y.Z
```

## 规则

- `dsh-upstream` 必须永远 fast-forward（`--ff-only`）。一旦报错，说明镜像被污染了。
- `master` 晋升用 `--no-ff`，每个生产版本保留一个 merge commit 边界。
- 永远不要直接提交到 `master`；日常开发都在 `dev`（或从 `dev` 开出的 feature 分支）。
- 每个生产版本都打 tag。
