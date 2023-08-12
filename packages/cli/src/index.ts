import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'

async function asyncRunner() {
  // 1. 在路径下, 执行npx cli
  // ----
  // 1. 执行第一层解析, 向collect函数, 传入根路径, 由collect函数解析该路径下的package.json, 得到结果
  // 2. 执行第二层解析, 获取node_modules下的所有文件夹列表
  // 2.1 向collect函数, 传入每一个合法的文件夹路径, 得到node_modules下的数据
  // 1. 读取根路径下的package.json
  const targetDir =
    '/Users/yang/Desktop/npm-package-analyzer/node_modules/@types/eslint-scope'
  const parseResult = await collect(targetDir)
  console.log('parseResult => ', parseResult)
}

let counter = 0
function getUuid() {
  counter++
  return `${counter}`
}

async function collect(targetPath: string) {
  //   const rootPath = path.resolve(__dirname, '../../../')
  //   const desfile = path.join(rootPath, './packages/gui/package.json')
  //   const readContent = fs.readFileSync(desfile).toString()
  //   const jsonObj = JSON.parse(readContent)

  //   const directoryPath = path.resolve(__dirname, '../dist/')
  //   const fileName = 'example.json' // 新建文件名
  //   const writeContent = JSON.stringify({ name: jsonObj.name }, null, 2) // 文件内容
  //   fs.writeFileSync(path.join(directoryPath, fileName), writeContent)

  //读取指定目录下的package.json
  // const targetDir = '/Users/yang/Desktop/npm-package-analyzer/packages/homepage'
  // const rootPath = '/Users/yang/Desktop/npm-package-analyzer'
  // installPatj = npm-package-analyzer/packages/homepage
  // installList = [npm-package-analyzer, packages, homepage]
  const rootPath = Const.rootPath

  const targetFile = path.resolve(targetPath, './package.json')
  //收集基本信息
  const readContent = fs.readFileSync(targetFile).toString()
  const jsonObj = JSON.parse(readContent)
  //存放到record对象中
  let record: RecordType.item = {
    uuid: getUuid(),

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
    installDirList: [],
    /**
     * 字符串格式的package.json所在路径
     */
    installPath: '',
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
       * 循环依赖检测. 若依赖中形成环路, 则记录环路上的所有信息
       */
      circularDependency: {
        /**
         * 是否有循环依赖情况
         */
        hasCircularDependency: false,
        /**
         * 记录循环链路上的所有项目uuid
         */
        circularChainList: [],
        /**
         * 标记循环依赖链路的颜色
         */
        color: `rgb(255,255,255)`,
      },
      /**
       * 实际依赖安装情况
       * 检查到依赖记录uuid, 检查不到则记录空字符串
       * [packageName: string]: item['uuid'] | ''
       */
      dependencyInstallStatus: {},
    },
  }

  //初始化安装路径
  // const targetPath = '/Users/yang/Desktop/npm-package-analyzer/packages/homepage'
  // const rootPath = '/Users/yang/Desktop/npm-package-analyzer'
  // const c = "npm-package-analyzer/packages/homepage"

  const basename = path.basename(rootPath)
  const relative = path.relative(rootPath, targetPath)
  record.installPath = path.join(basename, relative)
  record.installDirList = record.installPath.split(path.sep)
  // 额外考虑包名中带分隔符的情况
  if (record.packageName.includes('/')) {
    // 根package.json中带/的情况不需要处理
    if (record.installDirList.length > 1) {
      // 扔掉最后两层
      record.installDirList.pop()
      record.installDirList.pop()
      // 再把packageName装进去
      record.installDirList.push(record.packageName)
    }
  }
  record.deepLevel = record.installDirList.length

  //初始化依赖对象
  for (let packageName of Object.keys(record.packageInfo.dependencies)) {
    record.detectInfo.dependencyInstallStatus[packageName] = ''
  }

  for (let packageName of Object.keys(record.packageInfo.devDependencies)) {
    record.detectInfo.dependencyInstallStatus[packageName] = ''
  }

  //输出到最终文件里面infodb.json
  const directoryPath = path.resolve(
    '/Users/yang/Desktop/npm-package-analyzer/packages/cli',
    './dist/'
  )
  const fileName = 'infodb.json' // 新建文件名
  const writeContent = JSON.stringify(record, null, 2) // 文件内容
  fs.writeFileSync(path.join(directoryPath, fileName), writeContent)

  console.log('done')
}

asyncRunner()
