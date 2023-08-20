import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'
import md5 from 'md5'

const itemMap: RecordType.itemMap = new Map()

/**
 * 收集targetPath路径下面的package.json的信息
 * @param targetPath
 * @returns
 */
export async function collect(targetPath: string) {
  const realpath = fs.realpathSync(targetPath)
  const isSymbolicLink = realpath !== targetPath

  if (isSymbolicLink) {
    // 如果是硬链接形成的路径,
    if (itemMap.has(realpath)) {
      // 若之前已经解析过, 则将硬链接内容更新到 installPathSet 内即可
      const item = itemMap.get(realpath) as RecordType.item
      item.installPathObj[targetPath] = true
      itemMap.set(realpath, item)
      return item
    } else {
      // 未解析过, 将 targetPath 更新到 installPathSet 中
      // 由于后续实际已进行该工作, 因此此处无需处理
    }
  }

  const targetFile = path.resolve(targetPath, './package.json')
  //收集基本信息
  const readContent = fs.readFileSync(targetFile).toString()
  const jsonObj = JSON.parse(readContent)
  //存放到record对象中
  let record: RecordType.item = {
    // 使用md5作为uuid, 降低资源使用量
    uuid: md5(realpath),

    packageName: jsonObj.name ?? '',
    /**
     * npm包版本
     * case1: 正常版本号
     * case2: alpha发版 1.1.0-alpha.1
     * case3: monorepo项目: workspace:*
     */
    version: jsonObj.version ?? '',
    /**
     * package.json所在路径的文件夹列表, 用于后续检测依赖关系
     */
    installPathObj: { [realpath]: true, [targetPath]: true },
    /**
     * 字符串格式的package.json所在路径
     */
    reslovePath: realpath,
    /**
     * 以根路径为0, 记录相对根路径的递归查询深度
     */
    deepLevel: 0,
    /**
     * package自身信息-直接从package.json中获取
     */
    packageInfo: {
      /**
       * 正式依赖
       */
      dependencies: jsonObj.dependencies ?? {},
      /**
       * dev依赖
       */
      devDependencies: jsonObj.devDependencies ?? {},
    },
    /**
     * 完成数据收集, 进行版本检测时生成的信息
     */
    detectInfo: {
      /**
       * 多实例检测. 若项目中存在多个同名且版本号不同的依赖, 记录在这里
       */
      muiltInstance: {
        /**
         * 是否有多实例情况
         */
        hasMuiltInstance: false,
        uuidList: [],
      },
      /**
       * 实际依赖安装情况
       * 检查到依赖记录uuid, 检查不到则记录空字符串
       * [packageName: string]: item['uuid'] | ''
       */
      dependencyInstallStatus: {
        dependencies: {},
        devDependencies: {},
      },
      "dependencyBy": {
        "dependencies": {},
        "devDependencies": {}
      }
    },
  }

  //初始化安装路径
  // const targetPath = '/Users/yang/Desktop/npm-package-analyzer/packages/homepage'
  // const rootPath = '/Users/yang/Desktop/npm-package-analyzer'
  // const c = "npm-package-analyzer/packages/homepage"

  //初始化依赖对象
  for (let packageName of Object.keys(record.packageInfo.dependencies)) {
    record.detectInfo.dependencyInstallStatus.dependencies[packageName] = ''
  }

  for (let packageName of Object.keys(record.packageInfo.devDependencies)) {
    record.detectInfo.dependencyInstallStatus.devDependencies[packageName] = ''
  }

  // 更新到总依赖表中
  itemMap.set(realpath, record)

  return record
}

/**
 * 判断路径是否合法
 * @param targetDir
 * @returns
 */
export async function isLegalDir(targetDir: string) {
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

/**
 * 一直向下探测到底, 只要有 package.json 就视为合法路径
 * @param targetDir
 * @returns
 */
export async function detectCommonLegalDir(
  targetDir: string
): Promise<string[]> {
  // 规范化路径格式
  targetDir = path.resolve(targetDir)
  let subLegalDirList: string[] = []

  const isCurrentDirLegal = await isLegalDir(targetDir)
  if (isCurrentDirLegal === true) {
    subLegalDirList.push(targetDir)
  }
  // 接着探索子文件夹
  let subNameList = fs.readdirSync(path.resolve(targetDir))
  // 过滤出所有的文件夹
  subNameList = subNameList.filter((filename) => {
    // 不考虑.开头的隐藏文件 => .pnpm 下的文件为有效依赖文件
    // if (filename.startsWith('.')) {
    //   return false
    // }
    // 只看文件夹
    if (
      fs.statSync(path.resolve(targetDir, filename)).isDirectory() === false
    ) {
      return false
    }
    return true
  })
  for (let subName of subNameList) {
    const legalList = await detectCommonLegalDir(
      path.resolve(targetDir, subName)
    )
    subLegalDirList = [...subLegalDirList, ...legalList]
  }

  return subLegalDirList
}

/**
 * 一直向下探测到底, 查找项目下所有的合法项目根路径地址(根路径, 适用于 monorepo 情况)
 * 跳过所有 node_modules 目录下的内容
 * @param targetDir
 */
export async function detectLegalRootDirList(targetDir: string) {
  // 规范化路径格式
  targetDir = path.resolve(targetDir)
  let subLegalDirList: string[] = []

  const isCurrentDirLegal = await isLegalDir(targetDir)
  if (isCurrentDirLegal === true) {
    subLegalDirList.push(targetDir)
  }

  // 接着探索子文件夹
  let subNameList = fs.readdirSync(path.resolve(targetDir))
  // 过滤出所有的文件夹
  subNameList = subNameList.filter((filename) => {
    // 不考虑.开头的隐藏文件
    if (filename.startsWith('.')) {
      return false
    }
    // 不考虑 node_modules 目录
    if (filename === 'node_modules') {
      return false
    }
    // 只看文件夹
    if (
      fs.statSync(path.resolve(targetDir, filename)).isDirectory() === false
    ) {
      return false
    }
    return true
  })
  for (let subName of subNameList) {
    const legalList = await detectLegalRootDirList(
      path.resolve(targetDir, subName)
    )
    subLegalDirList = [...subLegalDirList, ...legalList]
  }
  return subLegalDirList
}

export async function generateAllLegalDir(
  targetDir: string
): Promise<string[]> {
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
    // 处理当前路径中不含 node_modules 的文件夹
    let subNameList = fs.readdirSync(path.resolve(targetDir))
    // 过滤出所有的文件夹
    subNameList = subNameList.filter((filename) => {
      // 不考虑.开头的隐藏文件
      if (filename.startsWith('.')) {
        return false
      }
      if (
        fs.statSync(path.resolve(targetDir, filename)).isDirectory() === false
      ) {
        return false
      }
      return true
    })
    for (let subName of subNameList) {
      const subLegalDirList = await detectCommonLegalDir(
        path.resolve(targetDir, subName)
      )
      legalDirList = [...legalDirList, ...subLegalDirList]
    }

    return legalDirList
  }

  // 处理 node_modules 下的文件夹

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
