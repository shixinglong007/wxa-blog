
import Taro from '@tarojs/taro'

let fnName = 'user'

export const login = async (params) => {
    return await Taro.cloud.callFunction({
        name: fnName,
        data: {
            action: 'login',
            params
        }
    })
}

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
