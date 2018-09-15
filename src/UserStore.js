import { AsyncStorage } from 'react-native'
import { observable } from 'mobx'

class UserStore {
  @observable accessToken = ''
  @observable refreshToken = ''
  @observable tokenExpiryDate = '' // todo date-fns to calculate time left for access token

  async saveAccessToken(data) {
    this.accessToken = data.access_token
    this.refreshToken = data.refresh_token
    this.tokenExpiryDate = data.created_at + data.expires_in // todo calculate time
    try {
      await AsyncStorage.setItem(
        '@TvTracker:token',
        JSON.stringify({
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
          tokenExpiryDate: this.tokenExpiryDate
        })
      )
    } catch (err) {
      // Error saving data
      console.log(err)
    }
  }

  async loadAccessToken() {
    try {
      const data = await AsyncStorage.getItem('@TvTracker:token')
      if (data) {
        const tokens = JSON.parse(data)
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.tokenExpiryDate = tokens.tokenExpiryDate
      }
    } catch (err) {
      // Error getting data
      console.log(err)
    }
  }
}

export default new UserStore()
