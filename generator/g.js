
const program = require('commander');
const { version } = require('../package.json')

const cloudFn = require('./cloud')
const clientFn = require('./client')


program.version(version)
  .option('-r, --refresh', '更换单词列表: 重新从服务端拉去单词')
  .option('-d, --pineapple', '开始练习: 抄一遍,默写5遍')
  .option('-l, --words', '打印单词列表')
  .parse(process.argv);

  const [ modelName ] = program.args 

// 生成 云函数
cloudFn.run(modelName)
clientFn.run(modelName)

