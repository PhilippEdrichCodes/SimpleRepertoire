import React from "react"
import PropTypes from "prop-types"
import Modell from "../model/Repertoire"
import SongTag from "./SongTag"

/**
 * This component represents a genre and implements the JSX to show it in the App
 *
 * @component entry (dt in dl in section) ToDo: ausformulieren
 *
 * @property {Genre} genre - the genre to display
 * @property {boolean} active - sets this genre as `activeGenre` in the {@link App}
 * @property {boolean} performable - toggles in which section the songs are displayed
 * @property {Function} activeGenreHandler - handler to set this genre as `activeGenre` in the {@link App}
 * @property {Function} checkHandler - controls in which list the songs displayed
 */
class GenreTag extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  /**
   * After the component did mount completely, the state is loaded form {@link localStorage}
   */
  componentDidMount () {
    let open = localStorage.getItem("genre-" + this.props.genre.id)
    open = (open === null) ? true : JSON.parse(open)
    this.setState({open: open})
  }

  /**
   * Allows deleting a song
   * Uses {@link Genre.deleteSong}
   * Requires confirmation by a popup
   * @param name
   */
  deleteSong (name) {
    if (window.confirm("Wollen Sie diesen Eintrag wirklich löschen?!")) {
      this.props.genre.deleteSong(name)
      Modell.informAndSave("[Gruppe] Artikel " + name + " wurde gelöscht")
    }
    this.props.activeGenreHandler(this.props.genre)

    this.forceUpdate()
  }

  openClose () {
    this.setState({open: !this.state.open})
  }

  render () {
    const genre = this.props.genre

    let genreHeader = (
      <dt className={this.props.active ? "active" : "inactive"}
          onClick={() => this.props.activeGenreHandler(genre)}>
        <span>
          {genre.name}
        </span>
        <i className="material-icons"
           onClick={() => this.openClose()}>
          {this.state.open ? "expand_more" : "expand_less"}
        </i>
      </dt>
    )

    let songArray = []
    if (this.state.open) {
      for (const song of genre.songList) {
        if (song.stageable === this.props.stageable) {
          songArray.push(
            <SongTag lied={song}
                     genre={genre}
                     checkHandler={this.props.checkHandler}
                     deleteHandler={() => this.deleteSong()}
            />
          )
        }
      }
    }

    return (
      <React.Fragment>
        {genreHeader}
        {songArray}
      </React.Fragment>
    )
  }
}

GenreTag.propTypes = {
  genre: PropTypes.object.isRequired,
  active: PropTypes.bool,
  activeGenreHandler: PropTypes.func.isRequired,
  checkHandler: PropTypes.func.isRequired,
  performable: PropTypes.bool.isRequired,
}

export default GenreTag
