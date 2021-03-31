import {Dimensions} from 'react-native'

//58app只有竖屏模式,所以可以只获取次width
const devicesWidthDp=Dimensions.get('window').width
//ui默认给土750
const uiWidthPx = 750

function pxSize(uiElementPx){
    return uiElementPx*devicesWidthDp/uiWidthPx
}

export default pxSize