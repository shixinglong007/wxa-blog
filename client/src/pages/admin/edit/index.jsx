import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux'
import { generatorState } from '../../../utils/model'
import XlFrom from '../../../components/Form'

import './index.less'

let modelName = 'admin'

let modelFiledConf = [
  {
    key: 'banner',
    type: {
      compName: 'files',
      props: {
        label: '头图',
        maxFileCount: 9
      }
    },
    defaultValue: []
  },
  {
    key: 'admin_openid',
    type: {
      compName: 'input',
      props: {
        type: 'text',
        title: '管理员Id',
      }
    }
  },
]

@connect(state => state[modelName])
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tempObj: generatorState(modelFiledConf)
    }
  }

  config: Config = {
    navigationBarTitleText: 'Edit'
  }

  componentWillMount () {
    const { id } = this.$router.params
    const { map } = this.props
    if (map && id) {
      this.setState({ tempObj: map[id] })
    }
  }

  create = () => {
    const { tempObj } = this.state
    const { dispatch } = this.props
    dispatch({
      type: `${modelName}/create`,
      payload: tempObj
    })
  }
  del = () => {
    const { dispatch } = this.props
    const { tempObj } = this.state
    dispatch({
      type: `${modelName}/del`,
      payload: {
        _id: tempObj._id
      }
    })
  }
  update = () => {
    const { dispatch } = this.props
    const { tempObj } = this.state
    dispatch({
      type: `${modelName}/update`,
      payload: {
        ...tempObj
      }
    })
  }

  formChange = (data) => {
    this.setState({ tempObj: data })
  }
  renderForm = () => {
    const { tempObj } = this.state
    return (
      <XlFrom
        options={modelFiledConf}
        onChange={this.formChange}
        data={tempObj}
      />
    )
  }

  renderBottom() {
    const { id } = this.$router.params
    if (id) {
      return (
        <View className='btn-group' >
          <AtButton
            type='primary'
            className='btn btn-col'
            customStyle={{  width: '45vw' }}
            onClick={this.update}
          >
            修改
          </AtButton>
          <AtButton
            type='primary'
            className='btn btn-col'
            customStyle={{  width: '45vw' }}
            onClick={this.del}
          >
            删除
          </AtButton>
        </View>
      )
    }
    return (
      <AtButton type='primary' className='btn' onClick={this.create} >
        创建
      </AtButton>
    )
  }

  render () {
    return (
      <View className='page'>
        <View>
          <ScrollView className='from' scrollY >
            {this.renderForm()}
          </ScrollView>
        </View>
        {this.renderBottom()}
      </View>
    )
  }
}

