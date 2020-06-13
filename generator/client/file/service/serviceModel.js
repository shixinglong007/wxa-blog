const run = (modelName) => {
let str = `
import Taro from '@tarojs/taro'

let fnName = '${modelName}'

export const create = async (params) => {
    return await Taro.cloud.callFunction({
        name: fnName,
        data: {
            action: 'create',
            params
        }
    })
}

export const del = async (params) => {
    return await Taro.cloud.callFunction({
        name: fnName,
        data: {
            action: 'del',
            params
        }
    })
}

export const update = async (params) => {
    return await Taro.cloud.callFunction({
        name: fnName,
        data: {
            action: 'update',
            params
        }
    })
}

export const select = async (params) => {
    return await Taro.cloud.callFunction({
        name: fnName,
        data: {
            action: 'select',
            params
        }
    })
}
`
    return str
}


module.exports = run
