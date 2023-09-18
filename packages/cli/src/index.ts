import * as Const from './resource/const/index.js'
import * as Type from './resource/type/index.js'
import * as RecordType from './resource/type/record.js'
import * as fs from 'fs'
import * as path from 'path'
import * as Util from './util.js'
import open from 'open'
import express from 'express'
import GetPort from 'get-port'
import minimist from 'minimist'
import chalk from 'chalk'

export async function asyncRunner() {
  const argv = minimist(process.argv.slice(2))
  const commandList = argv._
    console.log(chalk.blue('欢迎使用daily-endeavors-npm-package-analyzer'))
    console.log(
      chalk.blue(
        `执行 ${chalk.yellow(
          'npx daily-endeavors-npm-package-analyzer'
        )} 解析当前目录下的文件`
      )
    )
  // 有analyze参数
  const depth = argv['depth'] ?? 99999
  let outputUri = argv['json']
  // 校验参数
  if (outputUri === '') {
    outputUri = undefined
  }
  if (outputUri !== undefined) {
    outputUri = path.resolve(process.cwd(), outputUri)
    // 检查权限
    if (fs.existsSync(outputUri) === true) {
      // 文件存在, 检查是否是可写入的文件
      const targetFileStat = fs.statSync(outputUri)
      if (targetFileStat.isFile() === false) {
        console.error(`路径${outputUri}不是文件, 无法写入. 请检查后再试`)
      }
      // 尝试写入文件以验证权限
      try {
        fs.appendFileSync(outputUri, '')
      } catch (e) {
        console.error(`没有写入文件${outputUri}的权限, 请检查后再试`)
        return
      }
    } else {
      // 文件不存在, 尝试是否可以写入
      try {
        // 尝试写入文件
        fs.writeFileSync(outputUri, '')
      } catch (e) {
        console.error(`没有写入文件${outputUri}的权限, 请检查后再试`)
        return
      }
    }
  }
  await dispatchTask(depth, outputUri)
}

/**
 * 具体任务执行方法
 * @param depth
 * @param outputUri
 */
async function dispatchTask(depth: number = 9999, outputUri?: string) {
  // 1. 在路径下, 执行npx cli
  // ----
  // 1. 执行第一层解析, 向collect函数, 传入根路径, 由collect函数解析该路径下的package.json, 得到结果
  // 2. 执行第二层解析, 获取node_modules下的所有文件夹列表
  // 2.1 向collect函数, 传入每一个合法的文件夹路径, 得到node_modules下的数据
  // 1. 读取根路径下的package.json

  const currentDir = process.cwd()
  console.log('待读取目录 => ', currentDir)
  const allIegalRootDirList = await Util.detectLegalRootDirList(currentDir)
  if (allIegalRootDirList.length === 0) {
    console.log(`检查完毕, ${currentDir}下没有待分析的文件`)
    return
  }

  let rawPackageAnaylzeResultList: RecordType.packageAnaylzeResult[] = []
  for (let legalRootDir of allIegalRootDirList) {
    const allIegalDirList = await Util.detectCommonLegalDir(legalRootDir)

    const rootRecord = await Util.collect(legalRootDir)

    const packageAnaylzeResult: RecordType.packageAnaylzeResult = {
      rootDir: legalRootDir,
      packageList: [],
      ...rootRecord,
      // 手工初始化属性
      detectInfo: {
        circularDependency: {
          circularChainListList: [],
          hasCircularDependency: false,
        },
        muiltInstance: {
          hasMuiltInstance: false,
          uuidList: [],
        },
        dependencyInstallStatus: {
          dependencies: {},
          devDependencies: {},
        },
        dependencyBy: {
          dependencies: {},
          devDependencies: {},
        },
      },
    }

    for (let legalDir of allIegalDirList) {
      const record = await Util.collect(legalDir)
      packageAnaylzeResult.packageList.push(record)
    }
    rawPackageAnaylzeResultList.push(packageAnaylzeResult)
  }

  // 更新组件依赖关系
  await dependencyInstallChecker(rawPackageAnaylzeResultList)

  // 更新循环依赖检测
  await circularDependenceChecker(rawPackageAnaylzeResultList)

  // 移除未使用的依赖, 最大递归检测深度为5层
  // 更新包的被依赖信息
  await removeUnusedPackageAndUpdateDetectInfo(
    rawPackageAnaylzeResultList,
    99999
  )

  // 更新多实例检测结果
  await muiltInstanceChecker(rawPackageAnaylzeResultList)

  await output2File(depth, currentDir, rawPackageAnaylzeResultList, outputUri)
}

async function output2File(
  depth: number,
  currentDir: string,
  rawPackageAnaylzeResultList: RecordType.packageAnaylzeResult[],
  outputUri?: string
) {
  if (outputUri) {
    //输出到指定文件路径
    const directoryPath = path.resolve(outputUri, './dist/')
  }
  //输出到当前文件夹里面infodb.json
  const directoryPath = path.resolve(currentDir, './dist/')
  fs.mkdirSync(directoryPath, {
    recursive: true,
  })
  const rawFileName = 'raw_infodb.json' // 新建文件名
  const rawWriteContent = JSON.stringify(rawPackageAnaylzeResultList, null, 2) // 文件内容
  fs.writeFileSync(path.join(directoryPath, rawFileName), rawWriteContent)
  const outputFileName = 'parse_result.json' // 解析结果
  // 将installPathObj置为空对象
  // 节约文件体积
  const parseRackageAnaylzeResultList = rawPackageAnaylzeResultList.map(
    (packageAnaylzeResult) => {
      let thinPackageAnaylzeResult = {
        ...packageAnaylzeResult,
        installPathObj: {},
      }
      thinPackageAnaylzeResult.packageList =
        thinPackageAnaylzeResult.packageList.map((item) => {
          item.installPathObj = {}
          return item
        })
      return thinPackageAnaylzeResult
    }
  )
  //处理解析深度
  const new_parseRackageAnaylzeResultList: RecordType.packageAnaylzeResult[] =
    []

  if (depth > 0) {
    for (let parseRackageAnaylzeResult of parseRackageAnaylzeResultList) {
      if (parseRackageAnaylzeResult.deepLevel > depth) {
        continue
      }
      const newPackageList = []
      for (let packageitem of parseRackageAnaylzeResult.packageList) {
        if (packageitem.deepLevel > depth) {
          continue
        }
        newPackageList.push(packageitem)
      }
      parseRackageAnaylzeResult.packageList = newPackageList
      new_parseRackageAnaylzeResultList.push(parseRackageAnaylzeResult)
    }
  }

  if (outputUri) {
    const targetFile = path.join(outputUri, outputFileName)
    fs.writeFileSync(
      targetFile,
      JSON.stringify(new_parseRackageAnaylzeResultList, null, 2)
    )

    console.log(`将解析结果输出到指定目录中 => ${targetFile}`)
    return
  }

  fs.writeFileSync(
    path.join(directoryPath, outputFileName),
    JSON.stringify(new_parseRackageAnaylzeResultList, null, 2)
  )

  console.log(`将解析结果输出到项目运行目录中 => ${Const.cliRuntimeGuiDataUri}`)
  fs.writeFileSync(
    Const.cliRuntimeGuiDataUri,
    `
globalThis.npmPackageAnalyzeResultList = ${JSON.stringify(
      new_parseRackageAnaylzeResultList,
      null,
      2
    )}
  `
  )
  console.log('解析结果输出完毕, 启动本地服务')

  const legalPort = await GetPort({
    host: '127.0.0.1',
  })
  const url = `http://127.0.0.1:${legalPort}/npm-package-analyzer`
  console.log(`本地地址 => ${url}`)
  const app = express()
  console.log(
    '静态服务地址Const.cliRuntimeGuiPath => ',
    Const.cliRuntimeGuiPath
  )
  app.use('/npm-package-analyzer', express.static(Const.cliRuntimeGuiPath))
  // 以/npm-package-analyzer作为路径
  app.use('/', async (req, res) => {
    res.redirect('/npm-package-analyzer')
  })
  app.listen(legalPort, () => {
    console.log('start')
  })
  // 打开url
  open(url)
  console.log('---')
}

// 一: muiltInstance，检测同一个 package 是否包含多个版本实例；
async function muiltInstanceChecker(
  packageAnaylzeResultList: RecordType.packageAnaylzeResult[]
) {
  // 1. 创建packageNameMap, 格式为 [packageName]: recordItemList[]
  type packageNameMap = {
    [packageName: string]: RecordType.item[]
  }

  const packageNameMap: packageNameMap = {}

  // 针对每一个根目录进行遍历
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    // 2. 遍历recordList,对每一项记录
    for (let recordObj of packageAnaylzeResult.packageList) {
      // 2.1 若packageName不存在, 则在packageNameMap中创建新记录, value为[record]
      if (packageNameMap[recordObj.packageName] === undefined) {
        // @ts-ignore
        packageNameMap[recordObj.packageName] = [recordObj]
      } else {
        // @ts-ignore
        // 2.2 若packageName已存在, 则将record添加到packageNameMap[packageName]下的列表中
        packageNameMap[recordObj.packageName].push(recordObj)
      }
    }
  }

  // 3. 遍历packageNameMap的每一个key
  for (let packageName of Object.keys(packageNameMap)) {
    let samePackageNameItemList = packageNameMap[packageName]
    // 3.1 若value只有一项, 说明没有重复项, 跳过
    if (samePackageNameItemList.length === 1) {
      continue
    }
    // 3.2 若value中有多项, 更新每一项的detectInfo.muiltInstance信息后
    // 利用js中引用数据类型的性质, 直接更新到原数据的detectInfo内
    const uuids: string[] = []
    samePackageNameItemList.forEach((sameItem) => {
      uuids.push(sameItem.uuid)
    })
    for (const samePackageNameItem of samePackageNameItemList) {
      samePackageNameItem.detectInfo.muiltInstance.hasMuiltInstance = true
      samePackageNameItem.detectInfo.muiltInstance.uuidList = uuids
    }
  }
  return packageAnaylzeResultList
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
      // 如果是项目package.json,dependencies和devDependencies都需要检查
      // 如果非项目package.json(node_modules项目), 只检查'dependencies'下的依赖

      const isProjectRootPackage = packageItem.reslovePath.includes("node_modules") === false
      const dependencyTypeList = isProjectRootPackage ? ['dependencies', 'devDependencies']  as const : ['dependencies']  as const

      for (let dependencyType of dependencyTypeList) {
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
      if(isProjectRootPackage === true){
        console.log( packageItem.packageName, "检查完毕")
        console.log("---")
      }
    }
  }
  return packageAnaylzeResultList
}

// 三: 循环依赖检测 circularDependence
// 暂时略过, 这个属于环检测算法类问题: https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-03a72/huan-jian--e36de/

async function circularDependenceChecker(
  packageAnaylzeResultList: RecordType.packageAnaylzeResult[]
) {
  // 循环依赖查找方法
  // 本质上是在有向图中寻找所有简单回路 => https://www.cnblogs.com/zhaodongge/p/10680313.html
  // 只标记dependence中的环依赖, 暂不考虑 devDependence

  // 以包的 uuid 视为点, 包的依赖关系视为边, 整体流程为从package 构成的有向图中寻找所有环的过程
  // 整体流程为:
  // 初始化 uuid:Item 映射, 方便查找
  // 初始化 edgeSet, 记录所有遍历过的边(边只遍历一次)
  // 初始化 ringListMap, 记录遍历过程中出现的环, 以排序后的ringList作为 key, 避免重复
  // 每一个根 package 视为全新 case
  // 从根 package 的 dependence 出发, 深度优先向下查找依赖
  // 每次向下查找时, 传入待查询 uuid 以及路上的 loopStack
  // 若边已经在edgeSet中, 跳过查找, 否则就将边存入edgeSet中(确保每条边只会经过一次)
  //
  // 若新的依赖位于loopStack中, 说明出现环, 将该环加入ringListMap 中, 跳过本轮循环
  // 若新的依赖不在loopStack中, 则将 uuid 加入loopStack后, 递归进行查找
  // 循环完成后返回
  // 最终得到全部ringListMap, 注入 package 根节点中

  // 全量元素列表, 记录 uuid 和 item 的对应关系, 方便查找
  const itemMap: {
    [uuid: RecordType.item['uuid']]: RecordType.item
  } = {}
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    // @ts-ignore
    itemMap[packageAnaylzeResult['uuid']] = packageAnaylzeResult
    for (let subItem of packageAnaylzeResult.packageList) {
      itemMap[subItem['uuid']] = subItem
    }
  }

  const ConstDependencyArror = '--dependency-->' as const

  // 具体的子包依赖检测函数
  function packageCircularChecker(
    packageItem: RecordType.packageAnaylzeResult
  ) {
    const edgeSet: Set<string> = new Set()
    const ringListMap: { [key: string]: RecordType.item['uuid'][] } = {}

    function itemChecker(
      itemUuid: RecordType.item['uuid'],
      loopStack: RecordType.item['uuid'][]
    ) {
      const item = itemMap[itemUuid]
      if (item === undefined) {
        // 不需要检测不存在的依赖
        return
      }
      for (let dependencePackageName of Object.keys(
        item.detectInfo.dependencyInstallStatus.dependencies
      )) {
        const packageUuid =
          item.detectInfo.dependencyInstallStatus.dependencies[
            dependencePackageName
          ]
        const edge = `${itemUuid}${ConstDependencyArror}${packageUuid}`
        if (edgeSet.has(edge)) {
          // 不重复遍历已经经过的边
          continue
        }
        // 把边添加到已检查 Set 中
        edgeSet.add(edge)

        const ringStartPosAt = loopStack.indexOf(packageUuid)
        if (ringStartPosAt !== -1) {
          // 找到了循坏依赖
          const ringList = [...loopStack.slice(ringStartPosAt)]
          // 先解构再排序, 避免影响到 ringList 本身的顺序
          const ringListKey = [...ringList].sort().join('-')
          if (ringListMap[ringListKey] === undefined) {
            // 若循坏依赖路径未注册过, 则更新到该 package 的循环依赖列表中
            ringListMap[ringListKey] = ringList
          }
          continue
        }

        // ringStartPosAt === -1, 说明当前路径中没有循环依赖, 继续向下排查
        itemChecker(packageUuid, [...loopStack, packageUuid])
      }
      return
    }

    // 直接执行即可
    itemChecker(packageItem.uuid, [packageItem.uuid])

    // 执行完成后检查ringListMap
    if (Object.keys(ringListMap).length > 0) {
      // 匹配到循环依赖
      packageItem.detectInfo.circularDependency.hasCircularDependency = true
      packageItem.detectInfo.circularDependency.circularChainListList =
        Object.values(ringListMap)
    } else {
      // 没有匹配到
      packageItem.detectInfo.circularDependency.hasCircularDependency = false
      packageItem.detectInfo.circularDependency.circularChainListList = []
    }
    return
  }

  // 对每一个 package 进行检测
  for (let packageResult of packageAnaylzeResultList) {
    packageCircularChecker(packageResult)
  }
}

/**
 * 更新每个包所处的依赖层数 & 更新包的被依赖项(便于后续制作节点梯次展开效果)
 * 确保根package的packageList中的项均为实际dependence的依赖(移除devDependence项)
 *
 * @param packageAnaylzeResultList
 * @param maxDepth
 * @returns
 */
async function removeUnusedPackageAndUpdateDetectInfo(
  packageAnaylzeResultList: RecordType.packageAnaylzeResult[],
  maxDepth: number = 99999
) {
  // 首先初始化出所有的包列表
  const packageMap: Map<RecordType.item['uuid'], RecordType.item> = new Map()
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    for (let packageItem of packageAnaylzeResult.packageList) {
      packageMap.set(packageItem.uuid, packageItem)
    }
  }

  /**
   * 从根节点出发, 获取所有的uuid类型以及其依赖深度, 递归层数不超过maxDepth
   * @param rootUuid
   * @param usageUuidMap
   * @param currentDepth
   * @returns
   */
  function getUsageUuid(
    rootUuid: RecordType.item['uuid'],
    usageUuidMap: Map<RecordType.item['uuid'], number> = new Map(),
    currentDepth = 1
  ) {
    const rootPackageItem = packageMap.get(rootUuid)
    if(rootPackageItem === undefined){
      return usageUuidMap
    }
    // 如果是项目package.json,dependencies和devDependencies都需要检查
    // 如果非项目package.json(node_modules项目), 只检查'dependencies'下的依赖
    const isProjectRootPackage = rootPackageItem.reslovePath.includes("node_modules") === false
    const dependencyTypeList = isProjectRootPackage ? ['dependencies', 'devDependencies']  as const : ['dependencies']  as const

    let dependenciesPackageUuidList: RecordType.item['uuid'][] = []
    for(let dependencyType of dependencyTypeList){
      let uuidList =  Object.values(rootPackageItem.detectInfo.dependencyInstallStatus[dependencyType])
      dependenciesPackageUuidList = dependenciesPackageUuidList.concat(uuidList)
    }
    // 去重
    dependenciesPackageUuidList = [...new Set(dependenciesPackageUuidList).values()]


    for (let dependenciesPackageUuid of dependenciesPackageUuidList) {
      if (dependenciesPackageUuid === '') {
        continue
      }
      const dependenciesPackageItem = packageMap.get(dependenciesPackageUuid)
      if (dependenciesPackageItem !== undefined) {
        // 更新包的被依赖信息
        dependenciesPackageItem.detectInfo.dependencyBy.dependencies[
          rootPackageItem.uuid
        ] = rootPackageItem.packageName
      }

      if (usageUuidMap.has(dependenciesPackageUuid)) {
        // 已经检查过, 无需再次检查
        continue
      }
      // 添加到依赖项中
      usageUuidMap.set(dependenciesPackageUuid, currentDepth)
      // 限制最大搜索深度
      if (currentDepth < maxDepth) {
        // 操作的始终是同一个usageUuidSet, 因此无需获取子节点返回值
        getUsageUuid(dependenciesPackageUuid, usageUuidMap, currentDepth + 1)
      }
    }
    return usageUuidMap
  }

  // 然后针对每一个包, 生成新packageList
  for (let packageAnaylzeResult of packageAnaylzeResultList) {
    const rootPackage = packageAnaylzeResult.packageList[0]
    let usageUuidMap = new Map()
    usageUuidMap.set(rootPackage.uuid, 0)
    usageUuidMap = getUsageUuid(rootPackage.uuid, usageUuidMap, 1)
    // 剔除根节点
    usageUuidMap.delete(rootPackage.uuid)

    const usagePackageList: RecordType.packageAnaylzeResult['packageList'] = [
      rootPackage,
    ]
    for (let usageUuid of usageUuidMap.keys()) {
      const usageItem = packageMap.get(usageUuid)
      if (usageItem !== undefined) {
        // 更新依赖深度
        usageItem.deepLevel = usageUuidMap.get(usageUuid)!
        usagePackageList.push(usageItem)
      }
    }
    packageAnaylzeResult.packageList = usagePackageList
  }
  return
}

if (process.argv?.[1]?.includes('packages/cli/src/index.ts')) {
  // 本地启动
  asyncRunner()
}
