#!/usr/bin/env node
const runner = require('./build/src/index')
console.log('开始执行')
runner.asyncRunner().finally(() => {
  console.log('执行完毕')
})