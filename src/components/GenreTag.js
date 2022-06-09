import PropTypes from "prop-types"
import React from "react"
import Modell from "../model/Repertoire"
import SongTag from "./SongTag"

class GenreTag extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  deleteSong (name) {
    this.props.genre.deleteSong(name)
    this.props.activeGenreHandler(this.props.genre)
    Modell.informAndSave("[Gruppe] Artikel " + name + " wurde gelöscht")
    this.forceUpdate()
  }

  openClose() {
    this.setState({open: !this.state.open})
  }

  render() {
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
        if (song.isInSet === this.props.isInSet) {
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
  aktiv: PropTypes.bool,
  aktivesGenreHandler: PropTypes.func.isRequired,
  checkHandler: PropTypes.func.isRequired,
  geprobt: PropTypes.bool.isRequired,
  genre: PropTypes.object.isRequired,
}
