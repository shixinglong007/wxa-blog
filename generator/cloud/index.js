const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const run = (modelName) => {
  let targetPath = `${path.resolve()}/cloud/functions/${modelName}`
  let rootPath = `${path.resolve()}/generator/cloud/file`
  // 创建文件夹
  if (fs.existsSync(targetPath) === false) {
    fs.mkdirSync(targetPath)
  }

  let list = fs.readdirSync(rootPath)

  // 写入文件
  for (const fileName of list) {
    let fileContent = fs.readFileSync(path.resolve(rootPath, fileName), { encoding: 'utf-8' });
    if (fileName === 'method.js') {
      fileContent = fileContent.replace(`'modelName'`, `'${modelName}'`)
    }
    let targetUrl = path.resolve(targetPath, fileName)
    // 文件不存在，创建文件
    // 文件存在，修改文件
    fs.writeFileSync(targetUrl, fileContent)
  }
}

module.exports = {
  run
}
