import React from 'react'
import {ListView,StyleSheet,Image,View,Text,TouchableHighlight} from 'react-native'
import Swipeout from 'react-native-swipeout'

var swipoutBtns = [
    {
        text:'标为未读',
        backgroundColor:"#c7c7cc",
        color:"#ffffff",
        onPress:function () {
            alert('flag')
        }
    },
    {
        text:'删除',
        backgroundColor:"#ff3a30",
        color:"#ffffff",
        onPress:function () {
            alert('delete');
        }
    }
]
export default class weixin extends React.Component{
    constructor(props){
        super(props)
        //要绑定其上下文否则点击事件无效
        // this.renderItem = this.renderItem.bind(this);
    }
    pressItem(rowData, row,IDsectionID ){
        alert(rowData.title);
    }
    renderItem(rowData,sectionID, rowID){
        return (
            <Swipeout right={swipoutBtns} backgroundColor="#ffffff">
                <TouchableHighlight onPress={()=>{this.pressItem(rowData,rowID)}} underlayColor = "#C0C0C0">
                    <View style={styles.row}>
                        <Image
                            source={{uri: rowData.posters.thumbnail}}
                            style={styles.thumbnail}
                        />
                        <View style={styles.centerContainer}>
                            <Text style = {styles.name}>
                                {rowData.mpaa_rating}
                            </Text>
                            <Text style = {styles.content}>
                                {rowData.id}
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style = {styles.time}>
                                {rowData.year}
                            </Text>
                            <Image
                                source={{uri: rowData.posters.thumbnail}}
                                style={styles.bell}
                            />
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }
    render(){
        return (
            // renderRow={this.renderRow.bind(this)也可以此种方法来绑定
            <ListView dataSource = {this.props.dataSource} renderRow = {this.renderItem.bind(this)} style={styles.listView}>
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        paddingTop: 30,
        backgroundColor: '#efeff4',
    },
    row: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        padding:8
    },
    thumbnail: {
        width: 45,
        height: 45,
    },
    centerContainer:{
        flex:1,
        marginLeft:5
    },
    rightContainer:{
        flex:1,
        alignItems:'flex-end',
        marginRight:5
    },
    name:{
        fontSize:20,
    },
    bell:{
        width:10,
        height:10,
        marginTop:10,
    }
})