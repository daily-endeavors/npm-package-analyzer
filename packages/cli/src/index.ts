import * as Const from './resource/const'
import * as Type from './resource/type'
import * as fs from 'fs'
import * as path from 'path'


async function asyncRunner() {
    
    // const directoryPath = __dirname;
    // const fileName = 'example.txt'; // 新建文件名
    
    // const content = '这是一个示例文件的内容。'; // 文件内容
    
    // fs.writeFileSync(path.join(directoryPath, fileName), content);


    const rootPath = path.resolve(__dirname, '../../../')

    const desfile = path.join(rootPath,'./docs/项目启动前对chatgpt的咨询记录.md')

    const content = fs.readFileSync(desfile).toString()


    console.log(content);


    
}






asyncRunner()