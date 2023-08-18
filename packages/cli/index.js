#!/usr/bin/env node
const currentPkg = require('./package.json')
console.log(`当前运行指令: ${currentPkg.name}@${currentPkg.version}`)
console.log(``)
const runner = require('./build/src/index')
console.log('开始执行')
runner.asyncRunner().finally(() => {
  console.log('执行完毕')
})
