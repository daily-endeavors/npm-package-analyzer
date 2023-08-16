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
  const targetDir = '/Users/yang/Desktop/npm-package-analyzer/'
  const allIegalRootDirList = await Util.detectLegalRootDirList(targetDir)
  const packageAnaylzeResultList: RecordType.packageAnaylzeResult[] = []
  for (let legalRootDir of allIegalRootDirList) {
    const allIegalDirList = await Util.detectCommonLegalDir(legalRootDir)

    const rootRecord = await Util.collect(legalRootDir)

    const packageAnaylzeResult: RecordType.packageAnaylzeResult = {
      rootDir: legalRootDir,
      packageList: [],
      ...rootRecord,
    }

    for (let legalDir of allIegalDirList) {
      const record = await Util.collect(legalDir)
      packageAnaylzeResult.packageList.push(record)
    }
    packageAnaylzeResultList.push(packageAnaylzeResult)
  }

  // const newRecordList = await muiltInstanceChecker(recordList)
  await dependencyInstallChecker(packageAnaylzeResultList)
  //输出到最终文件里面infodb.json
  const directoryPath = path.resolve(
    '/Users/yang/Desktop/npm-package-analyzer/packages/cli',
    './dist/'
  )
  const fileName = 'infodb.json' // 新建文件名
  const writeContent = JSON.stringify(packageAnaylzeResultList, null, 2) // 文件内容
  fs.writeFileSync(path.join(directoryPath, fileName), writeContent)

  console.log('done')
}

// 一: muiltInstance，检测同一个 package 是否包含多个版本实例；
async function muiltInstanceChecker(
  recordList: RecordType.packageAnaylzeResult[]
) {
  // 1. 创建packageNameMap, 格式为 [packageName]: recordItemList[]

  type packageNameMap = {
    [packageName: string]: RecordType.item[]
  }

  const packageNameMap: packageNameMap = {}

  // 2. 遍历recordList,对每一项记录
  for (let recordObj of recordList) {
    // 2.1 若packageName不存在, 则在packageNameMap中创建新记录, value为[record]
    if (packageNameMap[recordObj.packageName] === undefined) {
      packageNameMap[recordObj.packageName] = [recordObj]
    } else {
      // 2.2 若packageName已存在, 则将record添加到packageNameMap[packageName]下的列表中
      packageNameMap[recordObj.packageName].push(recordObj)
    }
  }

  const newRecordList: RecordType.item[] = []
  // 3. 遍历packageNameMap的每一个key
  for (let packageName of Object.keys(packageNameMap)) {
    let samePackageNameItemList = packageNameMap[packageName]
    // 3.1 若value只有一项, 直接添加到新记录列表
    if (samePackageNameItemList.length === 1) {
      // 将只有一个记录项的值添加到新记录列表
      newRecordList.push(samePackageNameItemList[0])
      continue
    }
    // 3.2 若value中有多项, 更新每一项的detectInfo.muiltInstance信息后, 再将数据更新到新记录列表中

    const uuids: string[] = []
    samePackageNameItemList.forEach((sameItem) => {
      uuids.push(sameItem.uuid)
    })
    for (const samePackageNameItem of samePackageNameItemList) {
      samePackageNameItem.detectInfo.muiltInstance.hasMuiltInstance = true
      samePackageNameItem.detectInfo.muiltInstance.uuidList = uuids
      newRecordList.push(samePackageNameItem)
    }
  }

  return newRecordList
}
// detectInfo解析步骤
// 分三轮, 分别计算

//
// 二: 依赖关系 dependencyInstallStatus

// async function dependencyInstallStatus(params: type) {}
// 关键点是明确npm的包查找规则:
// 按照 官方文档 描述：如果传递给 require() 的模块标识符不是 core 模块，并且不是以 '/'、'../' 或 './' 开头，则 Node.js 从当前模块的目录开始，并添加 /node_modules，并尝试从中加载模块。如果在那里找不到它，则它移动到父目录，依此类推，直到到达文件系统的根目录。
// https://juejin.cn/post/7235274652728213565
//
// 由于包查找规则只会从当前package.json所在目录的node_modules下查找, 然后逐级向上查找node_modules, 所以首先需要构建npm包的目录层级关系
// 0. 构建目录层级关系
// 创建对象 FS = {}
// 循环recordList, 对于每一个record, 读取其installDirList列表
// 按installDirList顺序创建对象, 例如如果值为 "npm-package-analyzer",  "@eslint-community/eslint-utils", 则实际构建出的数据为
// {
//   "npm-package-analyzer": {
//      "@eslint-community/eslint-utils": uuid
//   }
// }
// 而@eslint-community/eslint-utils的依赖项, 只能先查"npm-package-analyzer->@eslint-community/eslint-utils"下的项, 再查"npm-package-analyzer"下的项. 查到返回版本uuid, 未查到返回空字符串""
// 1.  添加依赖查找方法, 根据FS依赖树对象, 和指定的依赖包名, 以及指定的installDirList, 查找依赖项对应的uuid, 未查找到返回""
// 2.  遍历recordList, 针对每一个record中dependencyInstallStatus的值, 调用1中的方法查找依赖项uuid, 更新对象数据后添加到新纪录列表中
// 3.  将新记录列表写入文件

async function dependencyInstallChecker(
  packageAnaylzeResultList: RecordType.packageAnaylzeResult[]
) {
  // 依赖查找方法
  // 从当前实际所在目录所在的 node_modules 目录 + 包名开始查找, 一直向上, 看能否找到对应的版本

  // 初始化所有包的安装地址
  const packageMapByInstallPath: Map<string, RecordType.item> = new Map()
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    for (let packageItem of packageAnaylzeResult.packageList) {
      for (let installPath of Object.keys(packageItem.installPathObj)) {
        packageMapByInstallPath.set(installPath, packageItem)
      }
    }
  }

  // 开始遍历查找每个包的依赖
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    for (let packageItem of packageAnaylzeResult.packageList) {
      const realReslovePath = packageItem.reslovePath
      // 按'dependencies', 'devDependencies'顺序查找
      for (let dependencyType of ['dependencies', 'devDependencies'] as const) {
        for (let dependencyName of Object.keys(
          packageItem.detectInfo.dependencyInstallStatus[dependencyType]
        )) {
          const checkPathItemList = realReslovePath.split('/')
          let hasFindDependency = false
          while (checkPathItemList.length > 0 && hasFindDependency === false) {
            const checkPath = path.resolve(
              checkPathItemList.join('/'),
              'node_modules',
              dependencyName
            )
            const dependencyItem = packageMapByInstallPath.get(checkPath)
            if (dependencyItem !== undefined) {
              // 找到了依赖, 更新到记录里
              packageItem.detectInfo.dependencyInstallStatus[dependencyType][
                dependencyItem.packageName
              ] = dependencyItem.uuid
              // 更新依赖结果, 流程完毕
              hasFindDependency = true
            } else {
              // 向上一级
              checkPathItemList.pop()
            }
          }
        }
      }
    }
  }
  return packageAnaylzeResultList
}

// 三: 循环依赖检测 circularDependency
// 暂时略过, 这个属于环检测算法类问题: https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/huan-jian--e36de/

asyncRunner()
