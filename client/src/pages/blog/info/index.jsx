import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
 
@connect(state => ({ blog: state.blog }))
class BlogInfo extends Component {
    state = {
        id: ''
    }
    componentDidShow(options) {
        const { id, map } = options
        console.log('show blog info ', map[id]);
    }
    render() {
        return (
            <View>
                BlogInfo
            </View>
        )
    }
}

export default BlogInfo
