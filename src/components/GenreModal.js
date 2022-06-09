import PropTypes from "prop-types"
import React from "react"
import Modell from "../model/Repertoire"
import GenreEditTag from "./GenreEditTag"

class GenreModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      genreList: this.props.genrelist
    }
  }

  addGenre () {
    let input = document.getElementById("input")
    let genreName = input.value.trim()
    if (genreName.length > 0) {
      Modell.addGenre(genreName)
      this.setState({genreList: Modell.genreList})
    }
    input.value = ""
    input.focus()
  }

  deleteGenre (name) {
    Modell.deleteGenre(name)
    this.setState({genreList: Modell.genreList})
  }

  loadDemo () {
    let pop = Modell.addGenre("Pop")
    pop.addSong("Only You (Vincent Clarke)")
    let disco = Modell.addGenre("Disco")
    disco.addSong("Super Trooper")
    let latin = Modell.addGenre("Latin")
    latin.addSong("El Condor Pasa")
    let sambalele = latin.addSong("Sambalele")
    sambalele.stageable = true
    let parodie = Modell.addGenre("Parodie")
    parodie.addSong("Skandal im Hexenwald (Otto)")
    parodie.addSong("Hoch auf dem gelben Wagen (EAV)")
    parodie.addSong("Im Vollrausch zu Berge (EAV)")
    parodie.addSong("Major Hänsel (Otto)")
    let schlager = Modell.addGenre("Schlager")
    let griechischerWein = schlager.addSong("Griechischer Wein")
    griechischerWein.stageable = true
  }

  render () {
    const genreList = []
    for (const genre of this.state.genreList) {
      genreList.push(
        <GenreEditTag
          key={genre.id}
          genre={genre}
          deleteHandler={() => this.deleteGenre(genre.name)}/>
      )
    }

    return (
      <div className="mdc-dialog mdc-dialog--open popup">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface"
               role="alertdialog"
               aria-modal="true"
               aria-labelledby="my-dialog-title"
               aria-describedby="my-dialog-content">
            <h2 className="mdc-dialog__title"
                id="my-dialog-title">
              Genres bearbeiten
            </h2>

            <div className="mdc-dialog__content"
                 id="my-dialog-content">
              <label
                className="mdc-text-field mdc-text-field--filled mdc-text-field--with-trailing-icon mdc-text-field--no-label">
                <span className="mdc-text-field__ripple"></span>
                <input className="mdc-text-field__input"
                       type="search"
                       id="input"
                       placeholder="Genre hinzufügen"
                       autoComplete="false"
                       onKeyUp={e => (e.key === "Enter") ? this.addGenre() : ""}/>
                <span className="mdc-line-ripple"></span>
                <i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
                   tabIndex="0"
                   role="button"
                   onClick={() => this.addGenre()}>add_circle</i>
              </label>

              <dl className="mdc-deprecated-list">
                {genreList}
              </dl>
            </div>
            <div className="mdc-dialog__actions">
              <button type="button"
                      className="mdc-button mdc-dialog__button"
                      onClick={() => this.demoDatenLaden()}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Demo</span>
              </button>
              <button type="button"
                      className="mdc-button mdc-dialog__button"
                      onClick={this.props.onDialogClose}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Schließen</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mdc-dialog__scrim"></div>
      </div>)
  }
}

GenreModal.propTypes = {
  genreList: PropTypes.array.isRequired,
  onDialogClose: PropTypes.func.isRequired
}

export default
