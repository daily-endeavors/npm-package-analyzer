import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'
import * as Util from './util'
import { dir } from 'console'
import { syncBuiltinESMExports } from 'module'

async function asyncRunner() {
  // 1. 在路径下, 执行npx cli
  // ----
  // 1. 执行第一层解析, 向collect函数, 传入根路径, 由collect函数解析该路径下的package.json, 得到结果
  // 2. 执行第二层解析, 获取node_modules下的所有文件夹列表
  // 2.1 向collect函数, 传入每一个合法的文件夹路径, 得到node_modules下的数据
  // 1. 读取根路径下的package.json
  const targetDir = '/Users/yang/Desktop/npm-package-analyzer/'

  const checkresult = await generateAllLegalDir(targetDir)
  console.log(checkresult)
}
/**
 * 判断路径是否合法
 * @param targetDir
 * @returns
 */
async function isLegalDir(targetDir: string) {
  const filepath = path.resolve(targetDir, 'package.json')
  if (!fs.existsSync(filepath)) {
    return false
  }

  const readContent = fs.readFileSync(filepath).toString()
  try {
    const jsonObj = JSON.parse(readContent)
    if (jsonObj.name === undefined || jsonObj.version === undefined) {
      return false
    }
  } catch (error) {
    return false
  }

  return true
}

async function generateAllLegalDir(targetDir: string): Promise<string[]> {
  // 收集所有合法的目录, 汇总成列表
  let legalDirList: string[] = []

  const checkresult = await isLegalDir(targetDir)
  if (checkresult === false) {
    return []
  }
  // targetDir验证通过
  legalDirList.push(targetDir)

  // 验证node_modules

  // 1.  检查node_modules文件夹是否存在 => 不存在返回legalDirList
  const check1 = fs.existsSync(path.resolve(targetDir, 'node_modules'))
  if (check1 === false) {
    return legalDirList
  }

  // 2.  获取node_modules下的所有子文件夹列表subDirnameList
  const raw_DirnameList = fs.readdirSync(
    path.resolve(targetDir, 'node_modules')
  )

  // 4.  若目录以@开头, 需要接着向下搜集一层
  let clearDirnamelist: string[] = []

  for (let subdirname of raw_DirnameList) {
    if (subdirname.startsWith('.')) {
      continue
    }
    if (subdirname.startsWith('@')) {
      const child_dirnameList = fs.readdirSync(
        path.resolve(targetDir, 'node_modules', subdirname)
      )
      // 5.  合成所有子目录列表
      child_dirnameList.forEach((child_dirname) => {
        clearDirnamelist.push(path.join(subdirname, child_dirname))
      })
      continue
    }
    clearDirnamelist.push(subdirname)
  }

  // 6.  针对每一个子目录, 调用generateAllLegalDir方法, 将返回值收集到legalDirList内
  for (let subDirName of clearDirnamelist) {
    let subLegalDirList = await generateAllLegalDir(
      path.resolve(targetDir, 'node_modules', subDirName)
    )
    legalDirList = [...legalDirList, ...subLegalDirList]
  }

  return legalDirList
}

asyncRunner()
