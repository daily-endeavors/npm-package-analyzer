# daily-endeavors-npm-package-analyzer

在任意目录下执行 `npx -y daily-endeavors-npm-package-analyzer@latest analyze`, 输出目录下的 package 依赖关系

# 开发者模式

mac 下 => `npm_config_registry=https://registry.npmjs.org npx -y daily-endeavors-npm-package-analyzer@latest analyze`

# 注意

本地开发时记得将[.npmrc](../../.npmrc)的镜像地址切换为官方源, 以实时获取最新发布的 npm 包
