import Taro from '@tarojs/taro'
import { create } from 'dva-core'
import CreateLoading from 'dva-loading'

let app;
let store;
let dispatch;

const createApp = opt => {
    opt.onError = err => {
        console.error(err);
        Taro.hideLoading();
        Taro.showToast({ title: '似乎与服务断开了连接', icon: 'none' })
    }
    app = create(app);
    app.use(CreateLoading())

    if (!global.registered) {
        opt.models.forEach(model => {
            app.model(model)
        })
    }

    global.registered = true

    app.start();
    store = app._store;
    app.getStore = () => store;
    dispatch = store.dispatch;
    app.dispatch = dispatch;
    return app;
}

export default {
    createApp,
    getDispatch() {
        return app.dispatch
    }
}
