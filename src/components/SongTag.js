import React from "react"
import PropTypes from "prop-types"


/**
 * This component represents a song and implements the JSX to show it in the App
 *
 * @component entry in the list (dd in dl in section) ToDo: ausformulieren
 * @property {Song} lied - the song this tag is for
 * @property {Genre} genre - the genre this song belongs to
 * @property {Function} checkHandler - event-handler for checking and unchecking, passed by GenreTag from App
 * @property {Function} deleteHandler - event-handler for deleting
 */
class SongTag extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // toggles edit mode
      isEditing: false,
      // remembers newName while editing
      newName: this.props.song.name
    }
  }

  /**
   * Responds to change in the input form and stores the new value in {@link this.state.newName}
   * @param {Event.CHANGE} event - event triggered by a change in the input form
   */
  handleChange (event) {
    this.setState({newName: event.target.value})
  }

  /**
   * Renames a song according to user input
   * @param song
   * @param event
   */
  renameSong (song, event) {
    if (event && event.key !== "Enter") return
    song.name = this.state.newName
    this.state({isEditing: false})
  }

  render () {

    const song = this.props.song
    let songName = song.name
    if (song.isInSet) {
      songName = <em>{song.name}</em>
    }

    //put song in set-list and out of it
    const viewTemplate = (
      <dd>
        <label>
          <input type="checkbox"
                 checked={song.isInSet}
                 onChange={() => this.props.checkHandler(song)}/>
          {songName}
        </label>
        {!song.isInSet ?
          <i className="material-icons"
             onClick={() => this.setState({isEditing: true})}>
            edit
          </i>
          : ""
        }
        <i className="material-icons"
           onClick={this.props.deleteHandler}>delete</i>
      </dd>
    )

    // makes editing possible
    let editTemplate = (
      <dd>
        <input type="search" value={this.state.newName} autoFocus={true}
               onChange={event => this.handleChange(event)}
               onKeyUp={event => this.renameSong(song, event)}/>
        <i className="material-icons"
           onClick={() => this.setState({isEditing: false})}>cancel </i>
        <i className="material-icons"
           onClick={() => this.renameSong(song)}>check_circle </i>
      </dd>
    )

    return (
      this.state.isEditing
        ? editTemplate
        : viewTemplate
    )
  }
}

SongTag.propTypes = {
  lied: PropTypes.object.isRequired,
  genre: PropTypes.object.isRequired,
  checkHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
}

export default SongTag
