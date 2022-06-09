import Modell from "./Repertoire"
import Song from "./Song"

/**
 * This Class represents a genre, grouping songs together
 *
 * @property {Number}    counter      - provides unique IDs
 * @property {Number}    id           - unique ID
 * @property {Number}    index        - position in the List
 * @property {String}    name         - name of this genre
 * @property {Song[]} songList - list of songs in this genre
 */
class Genre {
  static counter = 1
  id
  name
  index
  songList = []

  constructor (name, index) {
    this.id = Genre.counter++
    this.name = name
    this.index = index
    this.songList = []
  }

  /**
   * Looks for a song by its name
   *
   * @param {String} toSearch - name of the song to find
   * @param {boolean} printMessage - switch for printing message, false by default
   * @returns {Song | null} song - the song if found, else null
   */
  findSong (toSearch, printMessage = false) {
    for (const song of this.songList) {
      if (song.name === toSearch) {
        return song
      }
    }
    if (printMessage) {
      Modell.informAndSave("[" + this.name + "] Lied " + toSearch + " nicht gefunden", true)
    }
    return null
  }

  /**
   * Adds a song to the songlist and returns it
   * @param {String} name - the name of the new song
   * @returns {Song} newSong - the new created song
   */
  addSong (name) {
    let existingSong = this.findSong(name, false)
    if (!existingSong) {
      let newSong = new Song(name, this.songList.length)
      this.songList.push(newSong)
      Modell.informAndSave("[" + this.name + "] Lied " + name + " hinzugefügt.")
      return newSong
    } else {
      Modell.informAndSave("[" + this.name + "] Lied " + name + " existiert schon.")
    }
  }

  /**
   * Creates a new song from a read JSON-Object.
   * Uses {@link addSong}
   * Used by {@link Modell.initialise}
   * @param {object} song - the given JSON-Object
   */
  addSongObject (song) {
    let newSong = this.addSong(song.name)
    // copies all properties from song to newSong
    Object.assign(newSong, song)
  }

  /**
   * Removes a Song from {@link this.songList}
   * @param {String} name - name of the song to be deleted
   */
  deleteSong (name) {
    let toDelete = this.findSong(name)
    if (toDelete) {
      const index = this.songList.indexOf(toDelete)
      this.songList.splice(index, 1)
      this.rearrangeIndex()
      Modell.informAndSave("[" + this.name + "] Lied " + name + " gelöscht.")
    } else {
      Modell.informAndSave("[" + this.name + "] Lied " + name + " konnte NICHT gelöscht werden.", true)
    }
  }

  /**
   * Keeps index consistent.
   * Sets {@link Song.index} to its current index in {@link this.songlist}2
   */
  rearrangeIndex() {
    for (let i =0; i<this.songList.length; i++) {
      this.songList[i].index = i
    }
  }

  /**
   * Looks for song by its name and renames it.
   * Uses {@link Genre.findSong} to look for the song
   * @param {String} currentName - the name to look for
   * @param {String} wantedName - the future name of the song
   */
  renameSong(currentName, wantedName){
    let existingSong = this.findSong(currentName)
    if (existingSong) {
      existingSong.name = wantedName
      Modell.informAndSave("[" + this.name + "] Lied \"" + currentName + "\" umbenannt in \"" + wantedName + "\".")
    } else {
      Modell.informAndSave("[" + this.name + "] Lied " + currentName + " konnte NICHT umbenannt werden.", true)
    }
  }
}

export default Genre
