/**
 * This class represents a Song
 *
 * @property {Number}  counter - used to provide unigue IDs
 * @property {Number}  id      - unique ID
 * @property {Number}  index   - position in List
 * @property {String}  name    - name of this song
 * @property {Boolean} isInSet - remembers if this song is in the setlist
 */

class Song {
  static counter = 1
  id
  name
  index
  isInSet

  constructor (name, index) {
    this.id = Song.counter++
    this.name = name
    this.index = index
    this.isInSet = false
  }
}

export default Song
