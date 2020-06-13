import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

import './index.less'

@connect(state => state)
export default class Index extends BasePage {

  toAdmin = () => {
    this.toPage(`/pages/admin/index`)
  }

  renderAdmin = () => {
    return (
      <View className='toAdmin' >
        <AtButton
          className='btn'
          data-url='admin'
          type='primary'
          onClick={this.toAdmin}
        >
          管理员入口
        </AtButton>
      </View>
    )
  }

  render () {
    const { user, admin } = this.props
    return (
      <View className='page'>
        {
          user.user && user.user.isAdmin && this.renderAdmin()
        }
      </View>
    )
  }
}
