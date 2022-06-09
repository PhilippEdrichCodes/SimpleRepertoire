import Genre from "./Genre"

/**
 * This class controls the model of this app.
 *
 * @property {Genre} activeGenre - remembers the active Genre
 * @property {Genre[]} genreList - container for the genres
 * @property {boolean} printMessage - toggles if messages are printed or not
 * @property {Object} SORTING_ORDERS - maps the defined sorting methods to selectable names
 * @property {String} sortingOrder - the name of the currently chosen sorting order
 * @property {String} STORAGE_KEY - the key for the LocalStorage
 */
class Repertoire {
  activeGenre
  genreList
  printMessage
  SORTING_ORDERS
  sortingOrder
  STORAGE_KEY

  constructor () {
    this.activeGenre = null
    this.genreList = []
    this.printMessage = false
    this.SORTING_ORDERS = {
      "wie angelegt": this.sortIndex,
      "Aufsteigend": this.sortUp,
      "Absteigend": this.sortDown
    }
    this.sortingOrder = Object.keys(this.SORTING_ORDERS)[0]
    this.STORAGE_KEY = "repertoireData"
  }

  /**
   * Prints the given message in console.
   * If this message is no warning,
   * the actual state is saved to LocalStorage
   *
   * @param {String} message - the message to print
   * @param {boolean} isWarning - toggles output stream. If true, message is sent to {@link console.log}, to {@link console.debug} otherwise
   */
  informAndSave (message, isWarning = false) {
    if (this.printMessage) {
      if (isWarning) {
        console.log(message)
      } else {
        console.debug(message)
        this.save()
      }
    }

  }

  /**
   * Looks for a genre by its name and returns it as an Object of the type {@link Genre}
   * @param {String} toSearch - name of the genre to look for
   * @param {boolean} printMessage - toggles if a message is wanted
   * @returns {Genre | null} - returns the found genre, null otherwise
   */
  findGenre (toSearch, printMessage = false) {
    for (const genre of this.genreList) {
      if (genre.name === toSearch) {
        return genre
      }
    }
    // nothing found, print message
    if (printMessage) {
      this.informAndSave("[App] Genre \"" + toSearch + "\" nicht gefunden", true)
    }
    return null
  }

  /**
   * Adds a new Genre to {@link this.genreList}
   * Uses {@link Repertoire.findGenre} to check for possible duplicate beforehand
   * @param {String} name - name of the genre to create and add
   * @returns {Genre} - newGenre - the newly created and added genre
   */
  addGenre (name) {
    let existingGenre = this.findGenre(name)
    if (!existingGenre) {
      let newGenre = new Genre(name, this.genreList.length)
      this.genreList.push(newGenre)
      this.informAndSave("[App] Genre \"" + name + "\" hinzugefügt")
      return newGenre
    } else {
      this.informAndSave("[App] Genre \"" + name + "\" existiert schon", true)
    }
  }

  /**
   * Deletes a genre
   * Uses {@link Repertoire.findGenre} to find it by its name
   * @param {String} name - name of the genre to delete
   */
  deleteGenre (name) {
    let toDelete = this.findGenre(name)
    if (toDelete) {
      let index = this.genreList.indexOf(toDelete)
      this.genreList.splice(index, 1)
      this.rearrangeIndex()
      this.informAndSave("[App] Genre \"" + name + "\" entfernt")
    } else {
      this.informAndSave("[App] Genre \"" + name + "\" konnte NICHT entfernt werden!", true)
    }
  }

  /**
   * Looks for genre by its name and renames it.
   * Uses {@link Genre.findSong} to look for the song
   * @param {String} currentName - the name to look for
   * @param {String} wantedName - the future name of the song
   */
  renameGenre (currentName, wantedName) {
    let existingGenre = this.findGenre(currentName)
    if (existingGenre) {
      existingGenre.name = wantedName
      Modell.informAndSave("[App] Genre \"" + currentName + "\" umbenannt in \"" + wantedName + "\".")
    } else {
      Modell.informAndSave("[App] Genre " + currentName + " konnte NICHT umbenannt werden.", true)
    }
  }

  /**
   * Keeps index consistent.
   * Sets {@link Genre.index} to its current index in {@link this.genreList}
   */
  rearrangeIndex () {
    for (let i = 0; i < this.genreList.length; i++) {
      this.genreList[i].index = i
    }
  }

  /**
   * Stores the state of the Modell in {@link localStorage}
   * @param {Object} data - the data in the app
   */
  save (data=null) {
    const json = {
      genreList: this.genreList,
      activeGenre: this.activeGenre?.name
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
  }

  /**
   * Loads the state of the Modell from {@link localStorage}
   * @returns {boolean} - success - true if successfully loaded, false otherwise
   */
  load () {
    const data = localStorage.getItem(this.STORAGE_KEY)
    if (data) {
      this.initialise(JSON.parse(data))
      this.informAndSave("[App] Daten aus dem LocalStorage geladen")
      return true
    }
    return false
  }

  initialise (jsonData) {
    this.genreList = []
    for (const genre of jsonData.genreList) {
      let newGenre = this.addGenre(genre.name)
      for (const song of genre.songList) {
        newGenre.addSongObject(song)
      }
    }
    if (jsonData.activeGenre) {
      this.activeGenre = this.findGenre(jsonData.activeGenre)
    }
  }

  sort (order) {
    this.sortingOrder = order
    const sortMethod = this.SORTING_ORDERS[order]
    // sort the genres first
    this.genreList.sort(sortMethod)

    //sort the songs in their genres second
    for (const genre of this.genreList) {
      genre.songList.sort(sortMethod)
    }
    this.informAndSave("[App] \"" + order + "\" sortiert")
  }

  /**
   * Sorts elements upwards according to their initial index
   * @param {Genre | Song} a - first element
   * @param {Genre | Song} b - second element
   * @returns {number} - if smaller -1, if equal 0, if bigger +1
   */
  sortIndex (a, b) {
    return a.index < b.index ? -1 : (a.index > b.index ? 1 : 0)
  }

  /**
   * Sorts elements upwards according to their name
   * @param {Genre | Song} a - first element
   * @param {Genre | Song} b - second element
   * @returns {number} - if smaller -1, if equal 0, if bigger +1
   */
  sortUp (a, b) {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
  }

  /**
   * Sorts elements downwards according to their name
   * @param {Genre | Song} a - first element
   * @param {Genre | Song} b - second element
   * @returns {number} - if smaller -1, if equal 0, if bigger +1
   */
  sortDown (a, b) {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return nameA < nameB ? 1 : (nameA > nameB ? -1 : 0)
  }
}

const Modell = new Repertoire()

export default Modell
