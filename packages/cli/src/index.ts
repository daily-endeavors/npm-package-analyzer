import * as Const from './resource/const'
import * as Type from './resource/type'
import * as fs from 'fs'
import * as path from 'path'


async function asyncRunner() {
    
    const rootPath = path.resolve(__dirname, '../../../')
    const desfile = path.join(rootPath,'./packages/gui/package.json')
    const readContent = fs.readFileSync(desfile).toString()
    const jsonObj = JSON.parse(readContent)


    const directoryPath = path.join(__dirname,'../dist/');
    const fileName = 'example.json'; // 新建文件名
    const writeContent = JSON.stringify({name:jsonObj.name},null,2); // 文件内容
    fs.writeFileSync(path.join(directoryPath, fileName), writeContent);

    console.log('done');


    
}






asyncRunner()