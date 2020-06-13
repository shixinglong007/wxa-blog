const fs = require('fs')
const path = require('path')

const run = (modelName) => {
    
    let targetPath = `${path.resolve()}/client/src`
    let rootPath = `${path.resolve()}/generator/client/file`

    // 创建目录
    let folderNames = [
        `models`,
        `pages/${modelName}`,
        `pages/${modelName}/edit`,
        `service`,
        `utils`,
    ]
    
    let fileNames = [
        // 调用函数
        {
            fn: require('./file/models/model'),
            url: `models/${modelName}.js`
        },
        {
            fn: require('./file/service/serviceModel'),
            url: `service/${modelName}.js`
        },
        {
            fn: require('./file/utils/model'),
            url: `utils/model.js`
        },
        // 直接读取, replace 替换
        {
            sourceUrl: `pages/model/index.jsx`,
            targetUrl: `pages/${modelName}/index.jsx`,
        },
        {
            sourceUrl: `pages/model/edit/index.jsx`,
            targetUrl: `pages/${modelName}/edit/index.jsx`,
        },
        {
            sourceUrl: `pages/model/edit/index.less`,
            targetUrl: `pages/${modelName}/edit/index.less`,
        },
    ]
    // 创建目录
    for (const n of folderNames) {
        let fPath = path.resolve(targetPath, n)
        if (fs.existsSync(fPath) === false) {
            fs.mkdirSync(fPath)
        }
    }
    
    // 写入文件
    for (const item of fileNames) {
        if (item.sourceUrl) {
            let fPath = path.resolve(rootPath, item.sourceUrl);
            let targetUrl = path.resolve(targetPath, item.targetUrl);
            let fileContent = fs.readFileSync(fPath, 'utf8');
            fileContent = fileContent.replace(`'modelName'`, `'${modelName}'`);
            fileContent = fileContent.replace(`'.modelName)'`, `.${modelName})`);
            fs.writeFileSync(targetUrl, fileContent, { encoding: 'utf8' });
        } else {
            let fn = item.fn;
            let fileContent = fn(modelName);
            let targetUrl = path.resolve(targetPath, item.url);
            fs.writeFileSync(targetUrl, fileContent, { encoding: 'utf8' });
        }
    }
}

module.exports = {
    run
}
