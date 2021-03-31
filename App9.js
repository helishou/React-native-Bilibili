import React from 'react'
import { ScrollView,Image } from 'react-native'
export default function App9() {
    return (
        <ScrollView>
            {/* 普通图片设置 */}
            <Image
            source={require('./assets/001.jpg')}/>
            {/* 网络图片设置 */}
            <Image style={{margin:10,width:177,height:100}} source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg'}}/>
            {/* 图片显示模式,contain,按照正常的比例缩放到整个刚好放进来 */}
            <Image style={{margin:10,width:200,height:200,resizeMode:'contain'}}
            source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg'}}/>
            <Image style={{margin:10,width:200,height:200,resizeMode:'cover'}}
            source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg'}}/>
            <Image style={{margin:10,width:200,height:200,resizeMode:'stretch'}}
            source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg'}}/>
        </ScrollView>
    )
}
