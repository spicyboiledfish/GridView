/**
 * Created by ruiwang on 2017/6/27.
 */

'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
const StatusBarManager = require('NativeModules').StatusBarManager;
var deviceHeight = Platform.OS == "ios" ? Dimensions.get('window').height : Dimensions.get('window').height - StatusBarManager.HEIGHT;
var faceWidth = deviceWidth *0.24;
var paddingWidth = ((deviceWidth)-faceWidth*3)/6;
const styles = StyleSheet.create({
    container: {
        paddingTop:21,
        width: deviceWidth,
        height: deviceHeight,
        flexDirection:'row',
        backgroundColor: '#fff',    //解决点击左滑的时候页面闪屏的问题，如果改成transparent就是重现报错
        alignItems:'flex-start',
        flexWrap:'wrap'
    },
    viewStyle:{
        alignItems:'center',
        paddingHorizontal:paddingWidth,
    },
    outerViewStyle:{
        width:deviceWidth,
        justifyContent:'flex-start'
    },
    textStyle: {
        fontSize: 12,
        color: '#999',
        marginVertical:10
    },
    faceWidth:{
        width:deviceWidth*0.24,
        height:deviceWidth*0.2,
    },
    bigImage:{
        width:deviceWidth*0.38,
        height:deviceWidth*0.35
    }
});

export default class extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            imageList:[
                {imgUrl: require('./image/far.png'), textDesc:'太远',bigOr:0},
                {imgUrl: require('./image/close.png'), textDesc:'太近',bigOr:0},
                {imgUrl: require('./image/dark.png'), textDesc:'太暗',bigOr:0},
                {imgUrl: require('./image/badBg.png'), textDesc:'背景复杂凌乱',bigOr:0},
                {imgUrl: require('./image/dim.png'), textDesc:'对焦模糊',bigOr:0},
                {imgUrl: require('./image/reflect.png'), textDesc:'反光',bigOr:0},
                {imgUrl: require('./image/right.png'), textDesc:'正确姿势',bigOr:1},
            ] || this.props.imageList,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            imageList: props.imageList
        })
    }

    generateDetailItems(){
        var arr=[];
        var badge = this.state.imageList;
        if(badge){
            for (var i = 0;i<badge.length;i++){
                if(badge[i].bigOr==0){
                    arr.push(
                        <View style={styles.viewStyle}>
                            <Image source={badge[i].imgUrl} style={styles.faceWidth} resizeMode={Image.resizeMode.contain} />
                            <Text style={styles.textStyle}>{badge[i].textDesc}</Text>
                        </View>
                    );
                }else{
                    arr.push(
                        <View style={styles.outerViewStyle}>
                            <View style={styles.viewStyle}>
                                <Image source={badge[badge.length-1].imgUrl} style={styles.bigImage} resizeMode={Image.resizeMode.contain} />
                                <Text style={styles.textStyle}>{badge[badge.length-1].textDesc}</Text>
                            </View>
                        </View>
                    );
                }

            }
            return arr;
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {this.generateDetailItems()}
            </View>
        )
    }
};