/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import ProgressBar from 'react-native-progress/Bar'
import { Actions } from 'react-native-router-flux'

export default class ShowDetail extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#414141' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 48,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: '#fff7',
            borderBottomWidth: 0.5
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Feather name="chevron-left" style={{ fontSize: 18, marginHorizontal: 18, color: '#FFF' }} />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16 }}>Title</Text>
          </View>
          <TouchableOpacity>
            <Feather name="share" style={{ fontSize: 18, marginHorizontal: 18, color: '#FFF' }} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingTop: 4 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 80, height: 120, borderWidth: 0.5, borderColor: '#FAFAFA', marginHorizontal: 20 }}
              source={require('../images/poster.jpg')}
            />
            <View style={{ flex: 1 }}>
              {/* <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#654' }}>
                <Text>Rating</Text>
              </View>
            </View> */}
              <View style={{ marginTop: 10, marginRight: 16 }}>
                <ScrollView
                  overScrollMode="never"
                  contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', padding: 0, margin: 0 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  {[0, 1, 2, 3, 4, 5, 6].map(item => (
                    <TouchableOpacity
                      key={item}
                      hitSlop={{ top: 2, bottom: 2, left: 4, right: 4 }}
                      style={{ marginHorizontal: 4, marginVertical: 2, paddingHorizontal: 2 }}>
                      <Text style={{ fontSize: 12, color: item === 0 ? '#fff' : '#888' }}>
                        {item === 0 ? 'Series' : `Season ${item}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ flex: 1, marginRight: 16 }}>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#fff', marginVertical: 12 }}>
                  Watched<Text style={{ fontSize: 13 }}> (100%)</Text>
                </Text>
                <ProgressBar height={10} borderWidth={0} borderRadius={80} color="red" progress={250 / 250} width={null} />
                <View style={{ marginTop: 3, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <View
                    style={{
                      minWidth: '8%',
                      width: `${(250 / 250 + 0.03) * 100}%`,
                      maxWidth: '87%',
                      alignItems: 'flex-end'
                    }}>
                    <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>180</Text>
                  </View>
                  <Text style={{ fontSize: 12, color: '#fff' }}>/ 250 </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 8 }}>
            <View style={{ paddingHorizontal: 20, backgroundColor: '#ccc2' }}>
              <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>SHOW INFO</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 8 }}>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                STATUS: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                NETWORK: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                PREMIERED: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                LANGUAGE: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                COUNTRY: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                RUNTIME: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                GENRE: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>
                CERTIFICATION: <Text style={{ color: '#FFF' }}> something</Text>
              </Text>
              <Text style={{ color: '#ccc', fontSize: 12 }}>DESCRIPTION:</Text>
              <Text style={{ color: '#FFF', fontSize: 12 }}> something something something</Text>
              {/* <Text>
              {`
Status
Network
Premiered
Language
Country
Runtime
Genra
Certification
Description
`}
            </Text> */}
            </View>
          </View>
          <View>
            <View style={{ paddingHorizontal: 20, backgroundColor: '#ccc2' }}>
              <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>EPISODES</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 8 }}>
              <View style={{ height: 225, width: '100%', marginVertical: 10 }}>
                <ImageBackground source={require('../images/episode.jpg')} style={{ width: '100%', height: 225 }}>
                  <View
                    style={{
                      backgroundColor: '#000a',
                      flexDirection: 'row',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}>
                    <Text style={{ flex: 1, color: '#FFF', marginHorizontal: 12, marginVertical: 12 }}>Episode Title</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: false ? 'transparent' : 'purple',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 6
                      }}>
                      <Feather name="check" style={{ fontSize: 32, color: false ? 'purple' : '#fff' }} />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View>
            <View style={{ paddingHorizontal: 20, backgroundColor: '#ccc2' }}>
              <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>CAST</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                marginHorizontal: 10,
                marginTop: 8
              }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
                <View
                  key={item}
                  style={{ flexDirection: 'row', width: '43%', height: 120, marginHorizontal: 10, marginVertical: 5 }}>
                  <Image
                    source={require('../images/castHeadshot.jpg')}
                    style={{ width: 80, height: '100%', resizeMode: 'contain' }}
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#494949'
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap', fontWeight: 'bold' }}>Famous Actor</Text>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>as some charactar</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
