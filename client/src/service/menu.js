
import Taro from '@tarojs/taro'

let fnName = 'menu'

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
