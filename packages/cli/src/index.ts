import * as Const from './resource/const'
import * as Type from './resource/type'
import * as RecordType from './resource/type/record'
import * as fs from 'fs'
import * as path from 'path'

async function asyncRunner() {
  console.log(Const.rootPath)
  let a: RecordType.item = {
    /**
     * npm包唯一id
     */
    uuid: 212313,
    /**
     * npm包名
     */
    packageName: 'string',
    /**
     * npm包版本
     * case1: 正常版本号
     * case2: alpha发版 1.1.0-alpha.1
     * case3: monorepo项目: workspace:*
     */
    version: `string`,
    /**
     * package.json所在路径的文件夹列表, 用于后续检测依赖关系
     */
    installDirList: [],
    /**
     * 字符串格式的package.json所在路径
     */
    installPath: 'string',
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
      dependencies: {},
      /**
       * dev依赖
       */
      devDependencies: {},
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
        hasMuiltInstance: true,
        uuidList: [],
      },
      /**
       * 循环依赖检测. 若依赖中形成环路, 则记录环路上的所有信息
       */
      circularDependency: {
        /**
         * 是否有循环依赖情况
         */
        hasCircularDependency: true,
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
       */
      dependencyInstallStatus: {},
    },
  }
  //   const rootPath = path.resolve(__dirname, '../../../')
  //   const desfile = path.join(rootPath, './packages/gui/package.json')
  //   const readContent = fs.readFileSync(desfile).toString()
  //   const jsonObj = JSON.parse(readContent)

  //   const directoryPath = path.join(__dirname, '../dist/')
  //   const fileName = 'example.json' // 新建文件名
  //   const writeContent = JSON.stringify({ name: jsonObj.name }, null, 2) // 文件内容
  //   fs.writeFileSync(path.join(directoryPath, fileName), writeContent)

  console.log('done')
}

asyncRunner()
