# npm-package-analyzer

[项目说明](./docs/项目说明.md)

[任务拆解](./docs/任务拆解.md)

[cli-gui 数据交换格式定义文件](./docs/demo.d.ts)

# 项目运行

在任意目录下执行 `npx -y daily-endeavors-npm-package-analyzer@latest analyze`, 输出目录下的 package 依赖关系

# 开发说明

默认为 Linux/Mac 开发环境, windows 用户请先安装 WSL 配置为 Linux 开发环境

基础开发环境

| 项目   | 说明                                                                    | 安装方法                                                                        |
| :----- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| nvm    | 不限制, 用于安装 node                                                   | `bash -c "$(curl -fsSL https://gitee.com/RubyKids/nvm-cn/raw/main/install.sh)"` |
| node   | 项目基础-统一为最新 LTS 版本 v18.17.0                                   | `nvm install v18.17.0`                                                          |
| pnpm   | monorepo 管理工具, 使用最新版[8.6.12](https://www.pnpm.cn/installation) | `curl -fsSL https://get.pnpm.io/install.sh \| sh -`                             |
| vscode | 统一编辑器                                                              |                                                                                 |

## 启动命令

| 命令           | 说明                |
| :------------- | :------------------ |
| gui:dev        | 分析结果:开发模式   |
| gui:build      | 分析结果:构建       |
| homepage:dev   | 项目主页:开发模式   |
| homepage:build | 项目主页:构建       |
| cli:dev        | 命令行工具:开发模式 |

## commit 信息规范

| 关键字 | 功能          |
| ------ | ------------- |
| feat   | 添加新功能    |
| format | 调整代码格式  |
| fix    | 修复错误      |
| doc    | 修订文档/注释 |

# 目录说明

外部目录结构参考`https://github.dev/vitejs/vite`

- packages
  - gui
    - 展示 json 分析结果
    - 待完善
  - cli
    - 生成 json 分析结果
    - 待完善
  - homepage
    - 团队主页地址, push 到 main 分支后自动构建并发布到
      - https://daily-endeavors.github.io/
      - https://daily-endeavors.github.io/npm-package-analyzer
