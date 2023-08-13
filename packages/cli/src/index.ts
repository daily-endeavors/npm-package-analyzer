import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'
import * as Util from './util'
import { dir } from 'console'
import { syncBuiltinESMExports } from 'module'
import { GridItem } from 'vant'

async function asyncRunner() {
  // 1. 在路径下, 执行npx cli
  // ----
  // 1. 执行第一层解析, 向collect函数, 传入根路径, 由collect函数解析该路径下的package.json, 得到结果
  // 2. 执行第二层解析, 获取node_modules下的所有文件夹列表
  // 2.1 向collect函数, 传入每一个合法的文件夹路径, 得到node_modules下的数据
  // 1. 读取根路径下的package.json
  const targetDir = '/Users/yang/Desktop/npm-package-analyzer/'

  const allIegalDirList = await Util.generateAllLegalDir(targetDir)
  const recordList: RecordType.item[] = []

  for (let legalDir of allIegalDirList) {
    const record = await Util.collect(legalDir)
    recordList.push(record)
  }

  //输出到最终文件里面infodb.json
  const directoryPath = path.resolve(
    '/Users/yang/Desktop/npm-package-analyzer/packages/cli',
    './dist/'
  )
  const fileName = 'infodb.json' // 新建文件名
  const writeContent = JSON.stringify(recordList, null, 2) // 文件内容
  fs.writeFileSync(path.join(directoryPath, fileName), writeContent)

  console.log('done')
}

asyncRunner()
