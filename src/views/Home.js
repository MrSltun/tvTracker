/* global API_URL AUTH_HEADERS */
import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  SectionList,
  FlatList
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Swipable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'
import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import { Actions } from 'react-native-router-flux'
import ShowsStore from '../ShowsStore'

const { width: w, height: h } = Dimensions.get('window')

@observer
export default class App extends Component {
  @observable headerTabs = ['Watching', 'Watchlist', 'Completed']
  @observable selectedTabIndex = 0
  @observable isSwiping = false
  @observable leftActionActive = false
  @observable rightActionActive = false

  componentDidMount() {
    this.getWatchingList()
    this.getWatchlist()
  }

  getWatchingList() {
    fetch(`${API_URL}/sync/watched/shows?extended=noseasons`, {
      method: 'GET',
      headers: AUTH_HEADERS
    })
      .then(res => {
        console.log({ AUTH_HEADERS })
        console.log({ res })
        return res.json()
      })
      .then(resJson => {
        if (Array.isArray(resJson) && resJson.length > 0) {
          ShowsStore.watching = resJson.reduce((obj, item) => {
            obj[item.show.ids.trakt] = {
              title: item.show.title,
              ids: item.show.ids
            }
            return obj
          }, {})
        }
      })
      .then(() => {
        Object.keys(ShowsStore.watching).map(i => this.getShowProgress(i))
      })
      .catch(err => console.warn(err))
  }

  getWatchlist() {
    fetch(`${API_URL}/sync/watchlist/shows?extended=noseasons`, {
      method: 'GET',
      headers: AUTH_HEADERS
    })
      .then(res => res.json())
      .then(resJson => {
        if (Array.isArray(resJson) && resJson.length > 0) {
          ShowsStore.watchlist = resJson.reduce((obj, item) => {
            obj[item.show.ids.trakt] = {
              title: item.show.title,
              ids: item.show.ids
            }
            return obj
          }, {})
        }
      })
      .then(() => {
        Object.keys(ShowsStore.watchlist).map(i => this.getShowProgress(i, true))
      })
      .catch(err => console.warn(err))
  }

  getShowProgress(showID, watchlist = false) {
    fetch(`${API_URL}/shows/${showID}/progress/watched?hidden=false&specials=false&count_specials=false`, {
      method: 'GET',
      headers: AUTH_HEADERS
    })
      .then(res => res.json())
      .then(resJson => {
        if (watchlist) {
          ShowsStore.watchlist[showID].nextEpisode = resJson.next_episode
        } else {
          ShowsStore.watching[showID].nextEpisode = resJson.next_episode
          if (resJson.aired <= resJson.completed) {
            // todo mark as complete
          }
        }
        console.log(JSON.parse(JSON.stringify(ShowsStore.objectToArray(ShowsStore.watching))))
      })
      .catch(err => console.warn(err))
  }

  renderShowSwipeable = ({ item }) => {
    const { title, nextEpisode } = item
    return (
      <Swipable
        onSwipeStart={() => {
          this.isSwiping = true
        }}
        onSwipeRelease={() => {
          this.isSwiping = false
        }}
        onLeftActionActivate={() => {
          this.leftActionActive = true
        }}
        onLeftActionDeactivate={() => {
          this.leftActionActive = false
        }}
        // onLeftActionRelease
        leftContent={
          <View
            style={{
              flex: 1,
              backgroundColor: this.leftActionActive ? '#000' : 'purple',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <View style={{ paddingHorizontal: 40 }}>
              <FontAwesome color={this.leftActionActive ? 'purple' : '#fff'} name="check" size={34} />

              {/* <Text style={{ color: '#fff', backgroundColor: this.state.leftStuff ? 'blue' : 'red' }}>
            Pull to activate
          </Text> */}
            </View>
          </View>
        }
        onRightActionActivate={() => {
          this.rightActionActive = true
        }}
        onRightActionDeactivate={() => {
          this.rightActionActive = false
        }}
        // onRightActionRelease
        rightContent={
          <View
            style={{
              flex: 1,
              backgroundColor: this.rightActionActive ? '#000' : 'red',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
            <View style={{ paddingHorizontal: 40 }}>
              <FontAwesome color={this.rightActionActive ? 'red' : '#fff'} name="archive" size={34} />
              {/* <Text style={{ color: '#fff', backgroundColor: this.state.rightStuff ? 'orange' : 'green' }}>
            Pull to activate check
          </Text> */}
            </View>
          </View>
        }>
        <TouchableOpacity onPress={() => Actions.showDetails()} activeOpacity={0.8}>
          <ImageBackground
            source={require('../images/package.jpg')}
            style={{ width: null, height: h / 4 }}
            imageStyle={{ resizeMode: 'cover' }}>
            <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', '#0008']}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 0,
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 }}>{title}</Text>
                  {!nextEpisode ? null : (
                    <Text style={{ color: '#fff', fontSize: 14, marginHorizontal: 5 }}>
                      {`${nextEpisode.number}x${nextEpisode.season} ${nextEpisode.title}`}
                    </Text>
                  )}
                </View>
                <View style={{ backgroundColor: 'transparent', marginHorizontal: 10 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 12,
                      marginVertical: 2,
                      backgroundColor: 'green',
                      paddingHorizontal: 4,
                      paddingVertical: 1
                    }}>
                    <SimpleLineIcons name="clock" style={{ fontSize: 10, color: '#fff', marginHorizontal: 4 }} />
                    {' 16 hours'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center', backgroundColor: 'crimson' }}>
                    1 behind
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Swipable>
    )
  }

  render() {
    const data = ShowsStore.objectToArray(ShowsStore.watching)
    return (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#3d3d3d' }}>
        <View
          style={{
            height: Math.min(h / 4, 175),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffc300'
          }}>
          <FontAwesome
            name="search"
            style={{ color: '#000', position: 'absolute', top: 0, right: 0, margin: 10, fontSize: 18 }}
          />
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Welcome to TvTracker</Text>
        </View>
        <View style={{ paddingVertical: 5, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.headerTabs.map((item, i) => {
            const selected = this.selectedTabIndex === i
            return (
              <TouchableOpacity
                onPress={() => {
                  this.selectedTabIndex = i
                }}
                key={item}
                style={{
                  margin: 3,
                  paddingHorizontal: 16,
                  paddingVertical: 2
                }}>
                <Text style={{ color: selected ? '#fff' : '#444', fontWeight: 'bold', fontSize: 15 }}>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <ScrollView scrollEnabled={!this.isSwiping}>
          {/* {[1, 2, 3].map(item => (
            <Swipable
              // onRef={item => (this.swipy = item)}
              onSwipeStart={() => this.setState({ isSwiping: true })}
              onSwipeRelease={() => this.setState({ isSwiping: false })}
              key={item}
              onLeftActionActivate={() => this.setState({ leftStuff: true })}
              onLeftActionDeactivate={() => this.setState({ leftStuff: false })}
              // onLeftActionRelease={() => {
              //   this.swipy.recenter()
              //   console.log(this.swipy)
              // }}
              leftButtons={[
                <View style={{ alignSelf: 'flex-end', width: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', backgroundColor: this.state.leftStuff ? 'blue' : 'red' }}>
                    Pull to activate
                  </Text>
                </View>
              ]}
              rightButtons={rightButtons}>
              <ImageBackground
                source={require('../images/package.jpg')}
                style={{ width: null, height: h / 4 }}
                imageStyle={{ resizeMode: 'cover' }}>
                <View>
                  <Text style={{ color: '#fff' }}>text</Text>
                </View>
              </ImageBackground>
            </Swipable>
          ))} */}

          <Text style={{ paddingVertical: 5, color: '#aaa', fontSize: 18, paddingHorizontal: 5 }}>Airing</Text>
          <FlatList
            // style={{
            //   height: 350,
            //   width: '100%'
            // }}
            data={data}
            renderItem={this.renderShowSwipeable}
            keyExtractor={item => item.ids.trakt.toString()}
          />

          <Text style={{ paddingVertical: 5, color: '#aaa', fontSize: 18, paddingHorizontal: 5 }}>Finished Airing</Text>
          <Swipable
            onSwipeStart={() => {
              this.isSwiping = true
            }}
            onSwipeRelease={() => {
              this.isSwiping = false
            }}
            onLeftActionActivate={() => {
              this.leftActionActive = true
            }}
            onLeftActionDeactivate={() => {
              this.leftActionActive = false
            }}
            // onLeftActionRelease
            leftContent={
              <View
                style={{
                  flex: 1,
                  backgroundColor: this.leftActionActive ? '#000' : 'purple',
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}>
                <View style={{ paddingHorizontal: 40 }}>
                  <FontAwesome color={this.leftActionActive ? 'purple' : '#fff'} name="check" size={34} />

                  {/* <Text style={{ color: '#fff', backgroundColor: this.state.leftStuff ? 'blue' : 'red' }}>
                  Pull to activate
                </Text> */}
                </View>
              </View>
            }
            onRightActionActivate={() => {
              this.rightActionActive = true
            }}
            onRightActionDeactivate={() => {
              this.rightActionActive = false
            }}
            // onRightActionRelease
            rightContent={
              <View
                style={{
                  flex: 1,
                  backgroundColor: this.rightActionActive ? '#000' : 'red',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <View style={{ paddingHorizontal: 40 }}>
                  <FontAwesome color={this.rightActionActive ? 'red' : '#fff'} name="archive" size={34} />
                  {/* <Text style={{ color: '#fff', backgroundColor: this.state.rightStuff ? 'orange' : 'green' }}>
                  Pull to activate check
                </Text> */}
                </View>
              </View>
            }>
            <ImageBackground
              source={require('../images/package.jpg')}
              style={{ width: null, height: h / 4 }}
              imageStyle={{ resizeMode: 'cover' }}>
              <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', '#0008']}>
                <View
                  style={{ position: 'absolute', bottom: 8, left: 0, right: 0, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 }}>Elementary</Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,

                        marginHorizontal: 5
                      }}>
                      1x1 Pilot
                    </Text>
                  </View>
                  <View style={{ backgroundColor: 'transparent', marginHorizontal: 10, alignSelf: 'flex-end' }}>
                    {/* <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 12,
                        margin: 2,
                        backgroundColor: 'green',
                        paddingHorizontal: 4,
                        paddingVertical: 1
                      }}>
                      <SimpleLineIcons name="clock" style={{ fontSize: 10, color: '#fff', marginHorizontal: 4 }} />
                      {' 16 hours'}
                    </Text> */}
                    <Text
                      style={{
                        paddingHorizontal: 8,
                        fontSize: 12,
                        color: '#fff',
                        textAlign: 'center',
                        backgroundColor: 'crimson'
                      }}>
                      7 left
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Swipable>
        </ScrollView>
      </View>
    )
  }
}

{
  /*
  
        <SectionList
          scrollEnabled={!this.state.isSwiping}
          renderItem={({ item }) => (
            <Swipable
              onSwipeStart={() => this.setState({ isSwiping: true })}
              onSwipeRelease={() => this.setState({ isSwiping: false })}
              onLeftActionActivate={() => this.setState({ leftStuff: true })}
              onLeftActionDeactivate={() => this.setState({ leftStuff: false })}
              // onLeftActionRelease
              leftContent={
                <View style={{ flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <View style={{ paddingHorizontal: 40 }}>
                    <FontAwesome color="#fff" name="check" size={34} />

                    {/* <Text style={{ color: '#fff', backgroundColor: this.state.leftStuff ? 'blue' : 'red' }}>
                  Pull to activate
                </Text> * /}
                </View>
                </View>
              }
              onRightActionActivate={() => this.setState({ rightStuff: true })}
              onRightActionDeactivate={() => this.setState({ rightStuff: false })}
              // onRightActionRelease
              rightContent={
                <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <View style={{ paddingHorizontal: 40 }}>
                    <FontAwesome color="#fff" name="archive" size={34} />
                    {/* <Text style={{ color: '#fff', backgroundColor: this.state.rightStuff ? 'orange' : 'green' }}>
                  Pull to activate check
                </Text> * /}
                  </View>
                </View>
              }>
              <ImageBackground
                source={require('../images/package.jpg')}
                style={{ width: null, height: h / 4 }}
                imageStyle={{ resizeMode: 'cover' }}>
                <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', '#0008']}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      left: 0,
                      right: 0,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 }}>
                        Elementary
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14, marginHorizontal: 5 }}>1x1 Pilot</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', marginHorizontal: 10, alignSelf: 'flex-end' }}>
                      {/* <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 12,
                        margin: 2,
                        backgroundColor: 'green',
                        paddingHorizontal: 4,
                        paddingVertical: 1
                      }}>
                      <SimpleLineIcons name="clock" style={{ fontSize: 10, color: '#fff', marginHorizontal: 4 }} />
                      {' 16 hours'}
                    </Text> * /}
                      <Text
                        style={{
                          paddingHorizontal: 8,
                          fontSize: 12,
                          color: '#fff',
                          textAlign: 'center',
                          backgroundColor: 'crimson'
                        }}>
                        7 left
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Swipable>
          )}
          renderSectionHeader={({ section }) => (
            <Text
              style={{ paddingVertical: 5, color: '#aaa', fontSize: 18, paddingHorizontal: 5, backgroundColor: '#3d3d3d' }}>
              {section.title}
            </Text>
          )}
          sections={[
            // homogeneous rendering between sections
            { data: [{ value: '...', key: 0 }], title: 'Airing' },
            { data: [{ value: '...', key: 0 }], title: 'Finished Airing' },
            { data: [{ value: '...', key: 0 }], title: 'Just a test' }
          ]}
        />
        */
}

{
  /*
            <Swipable
            onSwipeStart={() => {
              this.isSwiping = true
            }}
            onSwipeRelease={() => {
              this.isSwiping = false
            }}
            onLeftActionActivate={() => {
              this.leftActionActive = true
            }}
            onLeftActionDeactivate={() => {
              this.leftActionActive = false
            }}
            // onLeftActionRelease
            leftContent={
              <View
                style={{
                  flex: 1,
                  backgroundColor: this.leftActionActive ? '#000' : 'purple',
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}>
                <View style={{ paddingHorizontal: 40 }}>
                  <FontAwesome color={this.leftActionActive ? 'purple' : '#fff'} name="check" size={34} />

                  {/* <Text style={{ color: '#fff', backgroundColor: this.state.leftStuff ? 'blue' : 'red' }}>
                  Pull to activate
                </Text> * /}
                </View>
              </View>
            }
            onRightActionActivate={() => {
              this.rightActionActive = true
            }}
            onRightActionDeactivate={() => {
              this.rightActionActive = false
            }}
            // onRightActionRelease
            rightContent={
              <View
                style={{
                  flex: 1,
                  backgroundColor: this.rightActionActive ? '#000' : 'red',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <View style={{ paddingHorizontal: 40 }}>
                  <FontAwesome color={this.rightActionActive ? 'red' : '#fff'} name="archive" size={34} />
                  {/* <Text style={{ color: '#fff', backgroundColor: this.state.rightStuff ? 'orange' : 'green' }}>
                  Pull to activate check
                </Text> * /}
                </View>
              </View>
            }>
            <TouchableOpacity onPress={() => Actions.showDetails()} activeOpacity={0.8}>
              <ImageBackground
                source={require('../images/package.jpg')}
                style={{ width: null, height: h / 4 }}
                imageStyle={{ resizeMode: 'cover' }}>
                <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', '#0008']}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      left: 0,
                      right: 0,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 }}>
                        Elementary
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14, marginHorizontal: 5 }}>1x1 Pilot</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', marginHorizontal: 10 }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontSize: 12,
                          marginVertical: 2,
                          backgroundColor: 'green',
                          paddingHorizontal: 4,
                          paddingVertical: 1
                        }}>
                        <SimpleLineIcons name="clock" style={{ fontSize: 10, color: '#fff', marginHorizontal: 4 }} />
                        {' 16 hours'}
                      </Text>
                      <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center', backgroundColor: 'crimson' }}>
                        1 behind
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </Swipable>
  */
}
