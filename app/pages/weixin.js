import React from 'react'
import {ListView,StyleSheet,Image,View,Text} from 'react-native'
import Swipeout from 'react-native-swipeout'

var swipoutBtns = [
    {
        text:'标为未读',
        backgroundColor:"#c7c7cc",
        color:"#ffffff"
    },
    {
        text:'删除',
        backgroundColor:"#ff3a30",
        color:"#ffffff"
    }
]
export default class weixin extends React.Component{
    constructor(props){
        super(props)
    }
    renderItem(movie){
        return (
            <Swipeout right={swipoutBtns}>
                <View style={styles.container}>
                    <Image
                        source={{uri: movie.posters.thumbnail}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style = {styles.rightContainer}>
                            Swipe me left
                        </Text>
                    </View>
                </View>
            </Swipeout>

        );
    }
    render(){
        return (
            <ListView dataSource = {this.props.dataSource} renderRow = {this.renderItem} style={styles.listView}>
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
    },
    thumbnail:{
        width: 53,
        height: 81,
    },
    listView:{
        backgroundColor: '#F5FCFF',
    },
    rightContainer:{
        flex:1,
        // backgroundColor:'#ff0000'
    },
    title:{
        fontSize:20,
        marginBottom:8,
        textAlign:'center'
    },
    year:{
        textAlign:'center'
    },
    thumbnail: {
        width: 53,
        height: 53,
    },
    listView: {
        paddingTop: 30,
        backgroundColor: '#efeff4',
    },
})