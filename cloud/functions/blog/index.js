const cloud = require('wx-server-sdk')
const method = require('./method')
cloud.init()

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  let { action, params } = event;
  const openid = wxContext.OPENID
  params = params || {}
  params.openid = openid;
  switch(action) {
    case 'create': 
      return await method.create(params);
    case 'del': 
      return await method.del(params);
    case 'update': 
      return await method.update(params);
    case 'select': 
      return await method.select(params);
  }
  return 'done'
}
