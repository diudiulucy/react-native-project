import React from 'react'
import {StyleSheet,ListView,View,Text,Image,Dimensions} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import WeiXin from './pages/weixin'
import Contacts from './pages/contacts'
import Found from './pages/found'
import Me from './pages/me'
/**
 * 为了避免骚扰，我们用了一个样例数据来替代Rotten Tomatoes的API
 * 请求，这个样例数据放在React Native的Github库中。
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'
const SW = Dimensions.get('window').width;           //获取屏幕宽度
const SH = Dimensions.get('window').height;           //获取屏幕高度
const scale = Dimensions.get('window').scale;

export default class Root extends React.Component {
    constructor(props) {
        super(props);   //这一句不能省略，照抄即可
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=> row1 !== row2,
            }),
            loaded:false,
            selectedTab:'微信'
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }
    render() {
        if(!this.state.loaded){
            return this.renderLoadingView();
        }
        return this.renderHome();
    }
    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Image style={styles.loading}source={require('./img/loading.png')}></Image>
            </View>
        );
    }
    renderHome(){
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.topText}>{this.state.selectedTab}</Text>
                </View>
                <TabNavigator>
                    <TabNavigator.Item
                        title="微信"
                        selected={this.state.selectedTab === '微信'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./img/weixin.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/weixinSel.png")} />}
                        onPress={() => this.setState({ selectedTab: '微信' })}>
                        <WeiXin dataSource={this.state.dataSource}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '通讯录'}
                        title="通讯录"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./img/contacts.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/contactsSel.png")} />}
                        onPress={() => this.setState({ selectedTab: '通讯录' })}>
                        <Contacts />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '发现'}
                        title="发现"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./img/found.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/foundSel.png")} />}
                        onPress={() => this.setState({ selectedTab: '发现' })}>
                        <Found/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '我'}
                        title="我"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./img/me.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/meSel.png")} />}
                        onPress={() => this.setState({ selectedTab: '我' })}>
                        <Me/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading:{
        width:SW,
        height:SH
    },
    container: {
        flex: 1,
    },
    top:{
        backgroundColor:"#373337",
        width:SW,
        height:50,
        // alignItems:'center',
        justifyContent:'center',
    },
    topText:{
        color:"#ffffff",
        textAlign:'center',

        fontSize:18,
    },
    tabText: {
        color: "#bebebe",
        fontSize: 13
    },
    selectedTabText: {
        color: "#19ab5d",
        fontSize: 13
    },
    icon:{
      width:25,
      height:25
     }
});
