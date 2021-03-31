import React ,{useState,useEffect} from 'react'
import { ActivityIndicator,ScrollView,Image,StyleSheet, Button } from 'react-native'
export default function App10() {
    const [animating, setAnimating] = useState(true)
    const closeActivityIndicator = () =>{
        setAnimating(!animating)
    }
    useEffect(() => {
        closeActivityIndicator()
        return () => {
            // cleanup
            // closeActivityIndicator()
            closeActivityIndicator()
        }
    }, [])
    return (
        <ScrollView>
            <ActivityIndicator animating={animating} color='#bc2b78' size='large' style={styles.activityIndicator}/>
            <Button onPress={closeActivityIndicator} title='切换显示Loading'></Button>
            <Image style={{margin:10,width:200,height:200,resizeMode:'stretch'}}
            source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg'}}/>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    activityIndicator:{
        height:80,
    },
    container:{
        flex:1,
        marginTop:70,
    }
})