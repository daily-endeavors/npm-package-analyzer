#!/usr/bin/env node
import currentPkg from './package.json' assert { type: 'json' }
import * as runner from './build/index.js'
console.log(`当前运行指令: ${currentPkg.name}@${currentPkg.version}`)
console.log(``)
console.log('开始执行')
runner.asyncRunner().finally(() => {
  console.log('执行完毕')
})
