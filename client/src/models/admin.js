
import Taro from '@tarojs/taro'
import * as Api from '../service/admin'

let modelName = 'admin'

export default {
    namespace: modelName,
    state: {
        list: [],
        map: {},
        offset: 0,
        limit: 20,
        total: 0,
    },
    reducers: {
        list: (state, { payload }) => {
            const { offset, limit, list, total } = payload
            let map = {};
            let newList = list.map(item => {
                map[item._id] = item;
                return item._id;
            })
            return {
                ...state,
                offset,
                limit,
                total,
                list: newList,
                map
            }
        }
    },
    effects: {
        *create({ payload }, { call, put }) {
            try {
                yield call(Api.create, payload)
                yield put({ type: 'select', payload: { offset: 0, limit: 20 } })
                Taro.navigateBack()
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
        *del({ payload }, { call, put }) {
            try {
                yield call(Api.del, payload)
                yield put({ type: 'select', payload: { offset: 0, limit: 20 } })
                Taro.navigateBack()
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
        *update({ payload }, { call, put }) {
            try {
                yield call(Api.update, payload)
                yield put({ type: 'select', payload: { offset: 0, limit: 20 } })
                Taro.navigateBack()
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
        *select({ payload }, { call, put }) {
            try {
                let res = yield call(Api.select, { offset: 0, limit: 999 })
                const { data } = res.result
                const { list, total } = data
                yield put({ type: 'list',  payload: { list, total } })
                Taro.hideLoading()
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
    }
}
