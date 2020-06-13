import Taro, { Component } from '@tarojs/taro'

export default class BasePage extends Component {
  toPage = (url) => {
    Taro.navigateTo({
      url
    })
  }
}
