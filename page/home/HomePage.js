import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'

import {Carousel} from '@ant-design/react-native'
//导入自定义的列表组件
import ListViewCom from '../com/ListViewCom'
export default function HomePage(props) {
    const navigationOptions = {
        tabBarLabel:'首页',
        tabBarIcon:({focused})=>{
            if(focused){
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/home1.png')}></Image>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/img/home0.png')}></Image>
            )
        }
    }
    return (
        <View>
            <Carousel
            style={style.wrapper}
            selectedIndex={2}
            autoplay
            infinite>
                <View style={[styles.containerHorizontal,{backgroundColor:'red'}]}>
                </View>
                <View style={[styles.containerHorizontal,{backgroundColor:'blue'}]}>
                </View>
                <View style={[styles.containerHorizontal,{backgroundColor:'green'}]}>
                </View>
            </Carousel>
            <ListViewCom navigation={props.navigation}></ListViewCom>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBarIcon:{
        width:21,
        height:21
    },
    wrapper:{
        backgroundColor:'#fff'
    },
    containerHorizontal:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
        height:200
    },
    containerHorizontal:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
        height:150
    },
    text:{
        color:'#fff',
        fontSize:36
    },
})
