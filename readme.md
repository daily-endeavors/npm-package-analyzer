#   npm-package-analyzer 任务拆解

[npm-package-analyzer任务分析](https://hi85012z1e8.feishu.cn/docx/YlL4dPM0wo9CN1xXLaoc5mu4nFh?from=from_copylink)

#   开发说明

默认为Linux/Mac开发环境, windows用户请先安装WSL配置为Linux开发环境

基础开发环境

| 项目   | 说明                                                                   | 安装方法                                                                        |
| :----- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| nvm    | 不限制, 用于安装node                                                   | `bash -c "$(curl -fsSL https://gitee.com/RubyKids/nvm-cn/raw/main/install.sh)"` |
| node   | 项目基础-统一为最新LTS版本v18.17.0                                     | `nvm install v18.17.0`                                                          |
| pnpm   | monorepo管理工具, 使用最新版[8.6.12](https://www.pnpm.cn/installation) | `curl -fsSL https://get.pnpm.io/install.sh \| sh -`                             |
| vscode | 统一编辑器                                                             |                                                                                 |

#   目录说明

外部目录结构参考`https://github.dev/vitejs/vite`
