import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'
import * as Util from './util'

async function asyncRunner() {
  // 1. 在路径下, 执行npx cli
  // ----
  // 1. 执行第一层解析, 向collect函数, 传入根路径, 由collect函数解析该路径下的package.json, 得到结果
  // 2. 执行第二层解析, 获取node_modules下的所有文件夹列表
  // 2.1 向collect函数, 传入每一个合法的文件夹路径, 得到node_modules下的数据
  // 1. 读取根路径下的package.json
  const targetDir =
    '/Users/yang/Desktop/npm-package-analyzer/node_modules/@types'

    const checkresult = await isLegalDir(targetDir)
    console.log(checkresult)
    
    
}

/**
 * 判断路径是否合法
 * @param targetDir 
 * @returns 
 */
async function isLegalDir(targetDir:string){
  const filepath = path.resolve(targetDir,'package.json')
  if(!fs.existsSync(filepath)){
    return false
  }
  
  const readContent = fs.readFileSync(filepath).toString()
  try {
    const jsonObj = JSON.parse(readContent)
    if(jsonObj.name === undefined || jsonObj.version === undefined){
      return false
    }
  } catch (error) {
    return false
  }

  return true

}


asyncRunner()
