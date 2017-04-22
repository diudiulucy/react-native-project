/**
 * Created by LucyWang on 2017/4/21.
 */
import React from 'react'
import {ListView,StyleSheet,Image,View,Text,TouchableHighlight} from 'react-native'

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'

export default class Contacts extends React.Component{
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
        this.fetchData = this.fetchData.bind(this);

    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData(){
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                var dataBlob = {
                    'sectionIDC':{title:''},
                    'sectionIDC:rowID1':{name:'老马'},
                    'sectionIDC:rowID2':{name:'老王'},
                    'sectionIDC:rowID3':{name:'老马'},
                    'sectionIDC:rowID4':{name:'老王'},

                    'sectionID1':{title:'A'},
                    'sectionID1:rowID1':{name:'老马'},
                    'sectionID1:rowID2':{name:'老王'},

                    'sectionID2':{title:'B'},
                    'sectionID2:rowID1':{name:'老张'},
                    'sectionID2:rowID2':{name:'老胡'},

                    'sectionID3':{title:'C'},
                    'sectionID3:rowID1':{name:'老张'},
                    'sectionID3:rowID2':{name:'老胡'},

                    'sectionID4':{title:'D'},
                    'sectionID4:rowID1':{name:'老张'},
                    'sectionID4:rowID2':{name:'老胡'},

                    'sectionID5':{title:'E'},
                    'sectionID5:rowID1':{name:'老张'},
                    'sectionID5:rowID2':{name:'老胡'},

                    'sectionID6':{title:'F'},
                    'sectionID6:rowID1':{name:'老张'},
                    'sectionID6:rowID2':{name:'老胡'},

                    'sectionID7':{title:'G'},
                    'sectionID7:rowID1':{name:'老张'},
                    'sectionID7:rowID2':{name:'老胡'},

                    'sectionID8':{title:'H'},
                    'sectionID8:rowID1':{name:'老张'},
                    'sectionID8:rowID2':{name:'老胡'},
                }
                var sectionIDs = ['sectionIDC','sectionID1','sectionID2','sectionID3','sectionID4','sectionID5','sectionID6','sectionID7','sectionID8'];
                var rowIDs = [['rowID1','rowID2','rowID3','rowID4'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2'],['rowID1','rowID2']];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
                })
            })
            .done();
    }
    pressItem(rowData ){
        alert(rowData.name);
    }
    renderRow(rowData,sectionID, rowID){
        return (
                <TouchableHighlight onPress={()=>{this.pressItem(rowData)}} underlayColor = "#C0C0C0">
                    <View style={styles.row}>
                        {/*<Image*/}
                            {/*source={{uri: rowData.posters.thumbnail}}*/}
                            {/*style={styles.thumbnail}*/}
                        {/*/>*/}
                        <Text style = {styles.name}>
                            {rowData.name}
                        </Text>
                    </View>
                </TouchableHighlight>
        );
    }
    renderSectionHeader(sectionData,sectionID){
        return (
            <View style = {styles.sectionHead}>
                <Text style={{marginLeft:10,color:'#A3A3A8'}}>
                    {sectionData.title}
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
        paddingTop: 30,
        backgroundColor: '#efeff4',
    },
    sectionHead:{
        backgroundColor:'#F0F0F6'
    },
    row: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        borderBottomWidth: 0.25,
        borderBottomColor:'grey',
        backgroundColor:"#ffffff"
    },
    thumbnail: {
        width: 30,
        height: 30,
    },
    name:{
        fontSize:20,
        marginLeft:10
    },
})
