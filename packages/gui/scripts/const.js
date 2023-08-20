const path = require('path');
const projectRootPath = path.resolve(__filename, '../../../..');
const guiPath = path.resolve(projectRootPath, './packages/gui');
const cliPath = path.resolve(projectRootPath, './packages/cli');
const guiOutputPath = path.resolve(guiPath, 'dist');
const cliOutputPath = path.resolve(cliPath, 'build/npm-package-analyzer');

module.exports.projectRootPath = projectRootPath;
module.exports.guiPath = guiPath;
module.exports.cliOutputPath = cliOutputPath;
module.exports.guiOutputPath = guiOutputPath;
