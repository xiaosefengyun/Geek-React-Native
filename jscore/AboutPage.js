'use strict'
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import WebViewPage from './WebViewPage';
import NavigationBar from 'react-native-navigationbar';

class AboutPage extends Component {
  render () {
    let content = (
      <View style={styles.contentContainer}>
        <Text style={{lineHeight: 18}}>
          每天一张精选妹纸图，一个精选小视频(视频源地址播放，因为视频来源包含各大平台。。。不好统一播放器)，一篇程序猿精选干货。
        </Text>
        <Text style={styles.contentText}>
          数据内容来源于代码家的
          <Text style={{textDecorationLine: 'underline'}}
            onPress={() => {
              this.props.navigator.push({
                component: WebViewPage,
                title: 'Gank.io',
                url: 'http://gank.io'
              })
            }}
            >
            http://gank.io
          </Text>
          ,PoberWong 完成react-native的开发,非常感谢Veaer的设计和指点
        </Text>
        <Text style={styles.contentText}>
          My Github:
          <Text style={{textDecorationLine: 'underline'}}
            onPress={()=> {
              this.props.navigator.push({
                component: WebViewPage,
                title: 'PoberWong',
                url: 'http://github.com/Bob1993'
              })
            }}
            >http://github.com/Bob1993
          </Text>
        </Text>
        <Text style={styles.contentText}>
          Organization: 北京杰迅云动力科技有限公司
        </Text>
        <Text style={styles.contentText}>
          本项目属于公司开源项目,使用纯react-native开发，如果你觉得这对你学习react-native有很大帮助,我不介意适量打赏喔~欢迎来访问我的GitHub。。。
        </Text>
        <Text style={styles.contentText}>
          支付宝: 18300602600
        </Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={require('./images/gank_launcher.png')} style = {styles.imgLauncher}/>
          <Text style = {styles.versionText}>
            干 客
          </Text>
          <Text style={styles.versionText}>
            v1.0.0
          </Text>
          <Text style= {styles.aboutText}>
            关于开发者
          </Text>
        </ScrollView>
        <NavigationBar
          backTintColor= 'white'
          title='测试开发'
          barOpacity={0.8}
          barStyle={styles.navbar}
          backFunc={()=> {
            this.props.navigator.pop()
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252528'
  },
  navbar: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  imgLauncher: {
    alignSelf: 'center',
    marginTop: 114,
    width: 90,
    height: 90
  },
  contentContainer: {
    backgroundColor: 'white',
    margin: 8,
    padding: 15,
    borderRadius: 4
  },
  contentText: {
    marginTop: 13,
    lineHeight: 18
  },
  CONTENTtEXT: {
    marginTop: 13,
    lineHeight: 18
  },
  versionText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 13
  },
  aboutText: {
    fontSize: 15,
    marginTop: 30,
    marginBottom: 5,
    marginLeft: 8,
    color: '#434243'
  }
});

module.exports = AboutPage;
