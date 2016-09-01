'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  RefreshControl,
  Image,
  Text,
  Navigator
} from 'react-native';
import RequestUtils from './utils/RequestUtils';
import DailyContent from './DailyContent';
import AboutPage from './AboutPage';
import Animation from './custom-views/Animation';
import SnackBar from './custom-views/SnackBar';
import NavigationBar from 'react-native-navigationbar'


class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.pageIndex = 0;
    this.dateArray = this.props.dateArray;
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.contentDataGroup),
      dataArray: this.props.contentDataGroup,
      loadMore: false,
      isRefreshing: false,
      isError: false
    }
  }

  render() {
    let snackBar = this.state.isError
    ? (<SnackBar />)
    : null

    this.state.isError = false;

    return (
      <View style={styles.container}>
        <NavigationBar
          backHidden={false}
          barTintColor='white'
          barStyle={styles.navbar}
          title='History'
          actionName='About'
          backFunc={() =>{
            this.props.navigator.pop()
          }}

          actionFunc = {() => {
            this.props.navigator.push({
              component: AboutPage
            })
          }}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          onEndReached={this._loadmore.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReachedThreshold={29}
          RefreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._refresh.bind(this)}
              tintColor='#aaaaaa'
              title='Loading...'
              progressBackgroundColor='#aaaaaa'/>
          }/>
      </View>
    );
  }

  async _refresh () {
    if (this.state.isRefreshing) {
      return;
    }
    this.setState({isRefreshing: true})

    try {
      this.dateArray = (await RequestUtils.getDateArray()).results;
      this.pageIndex = 0;
      let contentDataGroup = await RequestUtils.getContents(this.dateArray.slice(0, 10))
      if (typeof contentDataGroup === 'undefined') {
        return
      }
      console.log(contentDataGroup)
      this.setState({
        dataArray: contentDataGroup,
        dataSource: this.state.dataSource.cloneWithRows(contentDataGroup),
        isRefreshing: false
      })
    } catch (error) {
      console.log(error);
      this.setState({
        isError: true,
        isRefreshing: false
      })
    }
  }

  async _loadmore () {
    if (this.state.loadMore) {
      return
    }

    this.setState({loadMore: true});
    console.log('===haha', this.state.loadMore);

    try {
      this.pageIndex += 10
      let pageDate = dateArray.slice(this.pageIndex, this.pageIndex + 10)

      let loadedContentGroup = await RequestUtils.getContents(pageDate);
      let newContent = [...this.state.dataArray, ...loadedContentGroup];

      this.setState({
        dataArray: newContent,
        dataSource: this.state.dataSource.cloneWithRows(newContent),
        loadMore: false
      })
    } catch (error) {
      console.log(error)
      this.setState({
        loadMore: false,
        isError: true
      })
    }
  }

  _renderFooter () {
    return (
      this.state.loadMore
      ? (<View style={styles.indicatorWrapper}>
        <Animation timingLength = {50} duration ={500} bodyColor = {'#aaaaaa'} />
      </View>)
      : null
    );
  }

 _renderItem (contentData, sectionID, highlightRow) {
   const title = contentData.results.休息视频 ? contentData.results.休息视频[0].desc : 'Gank.io'
   return (
     <TouchableHighlight onPress={() => this._skipIntoContent(contentData)}>
       <View style={styles.itemContainer}>
         <Text style={styles.date}>
           {contentData.date}
         </Text>
         <Text style={styles.title}>
           {title}
         </Text>
         <Image source={{uri: contentData.results.福利[0].url}} style={styles.thumbnail}/>
       </View>
     </TouchableHighlight>
   );
 }

 _skipIntoContent (contentData) {

   this.props.navigator.push({
     component: DailyContent,
     passProps: {contentData}
   })
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#252528'
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  thumbnail: {
    width: null,
    height: 260,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    marginRight: 35,
    marginLeft: 35,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center'
  },
  date: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center'
  },
  border: {
    borderColor: 'red',
    borderWidth: 2
  },
  indicatorWrapper: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252528'
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#aaaaaa'
  }
});

module.exports = HistoryList;
