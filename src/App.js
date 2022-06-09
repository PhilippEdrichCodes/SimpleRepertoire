import React from "react"
import GenreTag from "./components/GenreTag"
import Modell from "./model/Repertoire"
import GenreModal from "./components/GenreModal"
import SortingModal from "./components/SortingModal"

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      activeGenre: null,
      showGenreModal: false,
      showSortingModal: false,
      setOpen: true,
      performableOpen: false
    }
  }

  setOpenClose () {
    this.setState({setOpen: !this.state.setOpen})
  }

  performableOpenClose () {
    this.setState({performableOpen: !this.state.performableOpen})
  }

  checkSong = (song) => {
    song.stageable = !song.stageable
    const aktion = (song.stageable) ? "aus dem Set genommen" : "ins Set aufgenommen"
    Modell.informAndSave("[App] Artikel \"" + song.name + "\" wurde " + aktion)
    this.forceUpdate()
  }

  addSong () {
    const input = document.getElementById("songInput")
    const songName = input.value.trim()
    if (songName.length > 0) {
      Modell.activeGenre.addSong(songName)
      this.forceUpdate()
    }
    input.value = ""
    input.focus()
  }

  setActiveGenre (genre) {
    Modell.activeGenre = genre
    Modell.informAndSave("[App] Genre \"" + genre.name + "\" ist nun aktiv")
    this.setState({activeGenre: Modell.activeGenre})
  }

  closeSortingModal = (order, toSort) => {
    if (toSort) {
      Modell.sort()
    }
    this.setState({showSortingModal: false})
  }

  render () {
    let setList = []
    if (this.state.setOpen) {
      for (const genre of Modell.genreList) {
        setList.push(
          <GenreTag
            key={genre.id}
            genre={genre}
            performable={false}
            active={genre === this.state.activeGenre}
            activeGenreHandler={() => this.setActiveGenre()}
            checkHandler={this.checkSong}/>
        )
      }
    }

    let performableList = []
    if (this.state.performableOpen) {
      for (const genre of Modell.genreList) {
        performableList.push(
          <GenreTag
            key={genre.id}
          genre={genre}
          performable={true}
            active={genre === this.state.activeGenre}
            activeGenreHandler={() => this.setActiveGenre()}
            checkHandler={this.checkSong}/>
        )
      }
    }

    let genreModal = ""
    if (this.state.showGenreModal) {
      genreModal = <GenreModal
        genreList={Modell.genreList}
        onDialogClose={() => this.setState({showGenreModal: false})}/>
    }

    let sortModal = ""
    if (this.state.showSortingModal) {
      sortModal = <SortingModal
        onDialogClose={this.closeSortingModal}/>
    }

    return (

      <div id="container">
        <header>
          <h1>Repertoire</h1>

          <label
            className="mdc-text-field mdc-text-field--filled mdc-text-field--with-trailing-icon mdc-text-field--no-label">
            <span className="mdc-text-field__ripple"></span>
            <input className="mdc-text-field__input"
                   type="search"
                   id="songInput"
                   placeholder="Song hinzufügen"
                   onKeyUp={e => (e.key === 'Enter') ? this.addSong() : ''}/>
            <span className="mdc-line-ripple"></span>
            <i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
               tabIndex="0"
               role="button"
               onClick={() => this.addSong()}>add_circle</i>
          </label>

        </header>

        <hr/>

        <main>
          <section>
            <h2 onClick={() => this.setOpenClose()}>Set
              <i className="material-icons">
                {this.state.setOpen ? 'expand_more' : 'expand_less'}
              </i>
            </h2>
            <dl>
              {setList}
            </dl>
          </section>
          <hr/>
          <section>
            <h2 onClick={() => this.performableOpenClose()}>Mappe
              <i className="material-icons">
                {this.state.performableOpen ? 'expand_more' : 'expand_less'}
              </i>
            </h2>
            <dl>
              {performableList}
            </dl>
          </section>
        </main>
        <hr/>

        <footer>
          <button className="mdc-button mdc-button--raised"
                  onClick={() => this.setState({showGenreModal: true})}>
            <span className="material-icons">bookmark_add</span>
            <span className="mdc-button__ripple"></span> Genre
          </button>
          <button className="mdc-button mdc-button--raised"
                  onClick={() => this.setState({showSortingModal: true})}>
            <span className="material-icons">sort</span>
            <span className="mdc-button__ripple"></span> Sort
          </button>
          <button className="mdc-button mdc-button--raised">
            <span className="material-icons">settings</span>
            <span className="mdc-button__ripple"></span> Clear
          </button>
        </footer>

        {genreModal}
        {sortModal}
      </div>
    )
  }

}

export default App
