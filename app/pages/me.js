/**
 * Created by LucyWang on 2017/4/22.
 */
import React from 'react'
import {ListView,StyleSheet,Image,View,Text,TouchableHighlight} from 'react-native'
import MeData from '../doc/me.json'

export default class Me extends React.Component{
    constructor(props){
        super(props)
        //要绑定其上下文否则点击事件无效
        // this.renderItem = this.renderItem.bind(this);
        this.state = {
            dataSource:new ListView.DataSource({
                getSectionData:(dataBlob,sectionID)=>{return dataBlob[sectionID]},
                getRowData:(dataBlob,sectionID,rowID)=>{return dataBlob[sectionID +":"+rowID]},
                rowHasChanged:(row1,row2)=> row1 !== row2,
                sectionHeaderHasChanged:(r1,r2)=>r1 !== r2
            })
        }
        this.loadListViewDataFormJson = this.loadListViewDataFormJson.bind(this);

    }
    componentDidMount() {
        this.loadListViewDataFormJson();
    }
    loadListViewDataFormJson(){
        //获取数据
        var jsonData = MeData.data;

        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];

        for(let i = 0;i < jsonData.length; i++){
            sectionIDs.push(i);
            dataBlob[i] = jsonData[i].title;

            rowIDs[i] = [];
            var contacts=jsonData[i].mys;
            for(let j = 0;j<contacts.length;j++){
                rowIDs[i].push(j);
                dataBlob[i+':'+j] = contacts[j];
            }
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        })

    }
    pressItem(rowData ){
        alert(rowData.name);
    }
    renderRow(rowData,sectionID, rowID){
        return (
            <TouchableHighlight onPress={()=>{this.pressItem(rowData)}} underlayColor = "#C0C0C0">
                <View style={styles.row}>
                    <Image
                        source={{uri:rowData.icon}}
                        style={styles.icon}
                    />
                    <Text style = {styles.name}>
                        {rowData.name}
                    </Text>
                    <View style={styles.rightContainer}>
                        <Image
                            source={require('../img/icon_arrow.png')}
                            style={styles.arrow}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    renderSectionHeader(sectionData,sectionID){
        return (
            <View style = {styles.sectionHead}>
                <Text style={{marginLeft:10,color:'#A3A3A8'}}>
                    {sectionData}
                </Text>
            </View>
        )
    }
    render(){
        return (
            // renderRow={this.renderRow.bind(this)也可以此种方法来绑定
            <ListView
                style={styles.listView}
                stickyHeaderIndices={[1]}
                stickySectionHeadersEnabled={true}
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow.bind(this)}
                renderSectionHeader = {this.renderSectionHeader.bind(this)}
            >
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#efeff4',
    },
    sectionHead:{
        backgroundColor:'#F0F0F6'
    },
    row: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        borderTopWidth: 0.25,
        borderTopColor:'grey',
        backgroundColor:"#ffffff"
    },
    rightContainer:{
        flex:1,
        alignItems:'flex-end'
    },
    icon: {
        width: 30,
        height: 30,
    },
    arrow:{
        width:30,
        height:30,
    },
    name:{
        fontSize:15,
        color:"#000000",
        marginLeft:10
    },
})
