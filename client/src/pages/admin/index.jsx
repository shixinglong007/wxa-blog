import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux'

import BasePage from '../../base/BasePage'

let modelName = 'admin'

@connect(state => state[modelName])
export default class Index extends BasePage {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    this.select()
  }

  select = () => {
    const { dispatch, offset, limit, totial } = this.props
    dispatch({
      type: `${modelName}/select`,
      payload: {
        offset,
        limit
      }
    })
  }

  toEdit = (id) => {
    Taro.navigateTo({
      url: `/pages/${modelName}/edit/index?id=${id}`
    })
  }
  toCreate = () => {
    Taro.navigateTo({
      url: `/pages/${modelName}/edit/index`
    })
  }
  renderList = () => {
    const { list, map } = this.props
    return (
      <AtList className='list' >
        {
          Array.isArray(list) && list.map(id => (
            <AtListItem 
              key={id}
              title={map[id].name}
              data-id={id}
              onClick={() => this.toEdit(id)} 
              arrow='right'
            />
          ))
        }
        {
          Array.isArray(list) && list.length === 0 && (
            <View className='notData' >暂无数据</View>
          )
        }
      </AtList>
    )
  }
  renderMenu = () => {
    let list = [
      {
        name: '博客管理',
        url: '/pages/blog/index'
      },
      {
        name: '菜单管理',
        url: '/pages/menu/index'
      },
    ]
    return (
      <AtList className='list' >
        {
          Array.isArray(list) && list.map(menu => (
            <AtListItem 
              key={menu.url}
              title={menu.name}
              onClick={() => this.toPage(menu.url)} 
              arrow='right'
            />
          ))
        }
      </AtList>
    )
  }
  render () {
    return (
      <View className='page'>
        <View>
          {this.renderList()}
          {this.renderMenu()}
        </View>
        <AtButton type='primary' className='btn' onClick={this.toCreate} >
          创建
        </AtButton>
      </View>
    )
  }
}

