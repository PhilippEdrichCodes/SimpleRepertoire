import React from "react"
import PropTypes from "prop-types"
import Modell from "../model/Repertoire"

/**
 * This component allows to edit a genre and implements the JSX to do this in the App
 * @component
 *
 * @property {Genre} genre - the genre to edit
 * @property {Function} deleteHandler - event-handler for deleting a genre
 */
class GenreEditTag extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      newName: this.props.genre.name
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
   * @param {Genre} genre - the genre to rename
   * @param {Event.KEYUP} event - the triggering event
   */
  renameGenre (genre, event) {
    if (event && event.key !== "Enter") return
    Modell.renameGenre(genre.name, this.state.newName)
    this.state({isEditing: false})
  }

  render () {
    const genre = this.props.genre

    //allows viewing and deleting an genre
    const viewTemplate = (
      <dt>
        <span>
          {genre.name}
        </span>
        <i className="material-icons"
           onClick={() => this.setState({isEditing: true})}>
          drive_file_rename_outline</i>
        <i className="material-icons"
           onClick={this.props.deleteHandler}>delete</i>
      </dt>
    )

    // makes editing possible
    const editTemplate = (
      <dt>
        <input type="search"
               value={this.state.newName}
               autoFocus={true}
               onChange={event => this.handleChange(event)}
               onKeyUp={event => this.renameGenre(genre, event)}/>
        <i className="material-icons"
           onClick={() => this.setState({isEditing: false})}>cancel </i>
        <i className="material-icons"
           onClick={event => this.renameGenre(genre, event)}>check_circle </i>
      </dt>
    )

    return (
      this.state.isEditing
      ? editTemplate
        : viewTemplate
    )
  }
}

GenreEditTag.propTypes = {
  genre: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default GenreEditTag
