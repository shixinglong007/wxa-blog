const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

/*
    数据表必须手动创建
*/

const collName = 'modelName'

const callApi = async (fn) => {
    let res = {
        success: true,
        data: null,
        msg: '',
        errorCode: -1
    }
    try {
        res = await fn(res)
    } catch (error) {
        res.msg = error
        res.errorCode = 500
        res.success = false
    }
    return res
}

exports.create = async (params) => await callApi(async (res) => {
    res.data = await db.collection(collName).add({
        data: {
            ...params,
            createDate: new Date(),
            updateDate: new Date(),
            isDelete: false,
        }
    })
    return res
})

exports.del = async (params) => await callApi(async (res) => {
    const { _id } = params
    res.data = await db.collection(collName)
        .doc(_id)
        .update({
            data: {
                isDelete: true
            }
        })
    return res
})

exports.update = async (params) => await callApi(async (res) => {
    const { _id } = params
    let newObj = {...params}
    delete newObj['_id']
    res.data = await db.collection(collName)
                    .doc(_id)
                    .update({
                        data: {
                            ...newObj,
                            updateDate: new Date(),
                        }
                    })
    return res
})

// 翻页
exports.select = async (params) => await callApi(async (res) => {
    let { offset, limit } = params
    offset = isNaN(offset) ? 0 : offset
    limit = isNaN(limit) ? 0 : limit
    let condition = {
        isDelete: false
    }
    let total = await db.collection(collName)
                    .where(condition)
                    .count();
    let list = await db.collection(collName)
                    .skip(offset)
                    .limit(limit)
                    .where(condition).get();
    res.data = {
        total: total.total,
        list: list.data
    }
    return res
})
