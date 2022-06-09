/**
 * This class represents a Song
 *
 * @property {Number}  counter - used to provide unigue IDs
 * @property {Number}  id      - unique ID
 * @property {Number}  index   - position in List
 * @property {String}  name    - name of this song
 * @property {Boolean} gekauft - remembers if this song is in the setlist
 */

class Song {
  static counter = 1

  constructor (name, index) {
    this.id = Song.counter++
    this.name = name
    this.index = index
    this.inSet = false
  }
}

export default Song
