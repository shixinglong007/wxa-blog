
import Taro from '@tarojs/taro'
import * as Api from '../service/user'

let modelName = 'user'

export default {
    namespace: modelName,
    state: {
        list: [],
        map: {},
        offset: 0,
        limit: 20,
        total: 0,
        user: {}
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
        },
        user: (state, { payload }) => {
            return {
                ...state,
                user: payload
            }
        }
    },
    effects: {
        *login({ payload }, { call, put }){
            try {
                let user = yield call(Api.login)
                yield put({ type: 'user', payload: user.result.data })
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
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
                const { offset, limit } = payload
                let res = yield call(Api.select, { offset, limit })
                const { data } = res.result
                const { list, total } = data
                yield put({ type: 'list',  payload: { list, total, offset, limit } })
                Taro.hideLoading()
            } catch (error) {
                console.error(error)
                Taro.showToast({ title: '似乎与服务器断开了连接', icon: 'none' })
            }
        },
    }
}
