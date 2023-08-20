const shelljs = require('shelljs');
const path = require('path');
const Consts = require('./const');

console.log('启动gui构建');
shelljs.cd(Consts.guiPath);
shelljs.rm('-r', Consts.guiOutputPath);
shelljs.exec('npm run only-build-umi');
console.log('将gui构建产物复制至cli构建结果中');
shelljs.rm('-r', Consts.cliOutputPath);
shelljs.mkdir('-p', Consts.cliOutputPath);
shelljs.cp('-r', path.resolve(Consts.guiOutputPath, '*'), Consts.cliOutputPath);
console.log('构建完毕');
