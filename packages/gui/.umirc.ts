import routes from './routes';

export default {
  deadCode: {},
  npmClient: 'pnpm',
  crossorigin: {},
  presets: [require.resolve('@umijs/preset-vue')],
  polyfill: false,
  base: '/npm-package-analyzer/',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  headScripts: [{ src: './npm_package_analyze.js' }],
  links: [
    {
      rel: 'icon',
      href: 'https://cdn.staticaly.com/gh/FionaYuliang/picx-images-hosting@master/20230822/image.51ozaolyfm00.webp',
    },
  ],
  devtool: 'source-map',
  routes,
  title: '项目依赖关系分析',
};
