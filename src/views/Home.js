/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SegmentedControlIOS,
  ScrollView,
  TouchableHighlight,
  SectionList
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Swipable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'

const { width: w, height: h } = Dimensions.get('window')
const leftContent = <Text>Pull to activate</Text>

const rightButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>,
  <TouchableHighlight>
    <Text>Button 2</Text>
  </TouchableHighlight>
]

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSegmentIndex: 0,
      isSwiping: false
    }
  }

  render() {
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
        <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
          <SegmentedControlIOS
            hitSlop={{ top: 5, bottom: 5 }}
            style={{ backgroundColor: 'transparent' }}
            tintColor="firebrick"
            values={['Watching', 'Watchlist', 'Archive']}
            selectedIndex={this.state.selectedSegmentIndex}
            onChange={event => {
              this.setState({ selectedSegmentIndex: event.nativeEvent.selectedSegmentIndex })
            }}
          />
        </View>
        <ScrollView scrollEnabled={!this.state.isSwiping}>
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
                </Text> */}
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
          </Swipable>

          <Text style={{ paddingVertical: 5, color: '#aaa', fontSize: 18, paddingHorizontal: 5 }}>Finished Airing</Text>
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
                </Text> */}
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
                </Text> */}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
