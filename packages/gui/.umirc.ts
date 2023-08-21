import routes from './routes'

export default {
  deadCode: {},
  npmClient: 'pnpm',
  crossorigin: {},
  presets: [require.resolve('@umijs/preset-vue')],
  polyfill: false,
  base: "/npm-package-analyzer/",
  publicPath: process.env.NODE_ENV === 'production' ? "./" : "/",
  headScripts: [
    { src: './npm_package_analyze.js' },
  ],
  devtool: "source-map",
  routes,
};
