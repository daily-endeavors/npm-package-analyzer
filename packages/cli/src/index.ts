import * as Const from './resource/const'
import * as Type from './resource/type'
import * as fs from 'fs'
import * as path from 'path'


async function asyncRunner() {
    
    const directoryPath = __dirname;
    const fileName = 'example.txt'; // 新建文件名
    
    const content = '这是一个示例文件的内容。'; // 文件内容
    
    fs.writeFileSync(path.join(directoryPath, fileName), content);

    console.log('done');
}






asyncRunner()