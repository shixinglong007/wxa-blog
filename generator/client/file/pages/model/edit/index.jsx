import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux'
import { generatorState } from '../../../utils/model'
import XlFrom from '../../../components/Form'

import './index.less'

let modelName = 'modelName'

let modelFiledConf = [
    {
      key: 'imgs',
      type: {
        compName: 'files',
        props: {
          label: '作品',
          maxFileCount: 9
        }
      },
      defaultValue: []
    },
    {
        key: 'name',
        type: {
            compName: 'input',
            props: {
                type: 'text',
                title: '姓名',
            }
        }
    },
    {
        key: 'age',
        type: {
            compName: 'input',
            props: {
                type: 'number',
                title: '年龄',
            }
        }
    },
    {
        key: 'gender',
        type: {
            compName: 'radio',
            props: {
                label: '性别',
                options: [
                  {label: '男', value: '1', desc: '选择性别', },
                  {label: '女', value: '0', desc: '选择性别', isDefault: true},
                ]
            }
        }
    },
    {
        key: 'hobby',
        type: {
            compName: 'checkbox',
            props: {
                label: '爱好',
                options: [
                  { value: 1, label: '看电影', isDefault: true },
                  { value: 2, label: '爬山', isDefault: true },
                  { value: 3, label: '电竞', },
                  { value: 4, label: '学习', },
                ]
            }
        }
    },
    {
      key: 'readme',
      type: {
        compName: 'textarea',
        props: {
          label: '自我介绍',
          maxLength: '500',
          placeholder:'请简单的介绍你自己'
        }
      }
    },
    {
      key: 'isSingle',
      type: {
        compName: 'switch',
        props: {
          title: '是否单身',
          checked: true
        }
      }
    }
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
          <View className='title' >
            编辑 {modelName}
          </View>
          <ScrollView className='from' scrollY >
            {this.renderForm()}
          </ScrollView>
        </View>
        {this.renderBottom()}
      </View>
    )
  }
}

