import { AsyncStorage } from 'react-native'
import { observable, action } from 'mobx'

// todo convert to object of objects
// todo function to convert to array of objects
class ShowsStore {
  @observable watching = {}
  @observable watchlist = {}
  @observable
  archived = {
    // todo list of ids with value of true
  }

  @action
  setWatching(list) {
    // todo sort archived

    this.watching = list
  }

  objectToArray = object => Object.keys(object).map(i => object[i])

  @action
  setWatchlist(list) {
    this.watchlist = list
  }

  async saveShowsData() {
    try {
      await AsyncStorage.setItem('@TvTracker:watching', JSON.stringify(this.watching))
      await AsyncStorage.setItem('@TvTracker:watchlist', JSON.stringify(this.watchlist))
      await AsyncStorage.setItem('@TvTracker:archived', JSON.stringify(this.archived))
    } catch (err) {
      // Error saving data
      console.log(err)
    }
  }

  async loadShowsData() {
    try {
      const watchingData = await AsyncStorage.getItem('@TvTracker:watching')
      if (watchingData) this.watching = JSON.parse(watchingData)

      const watchlistData = await AsyncStorage.getItem('@TvTracker:watchlist')
      if (watchlistData) this.watchlist = JSON.parse(watchlistData)

      const archivedData = await AsyncStorage.getItem('@TvTracker:archived')
      if (archivedData) this.archived = JSON.parse(archivedData)
    } catch (err) {
      // Error getting data
      console.log(err)
    }
  }
}

export default new ShowsStore()
