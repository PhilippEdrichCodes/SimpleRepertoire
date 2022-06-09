import React from "react"
import PropTypes from "prop-types"
import Modell from "../model/Repertoire"

/**
 * Modal tho let the user choose the sorting order
 * @component
 */

class SortingModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sortingOrder: Modell.sortingOrder
    }
  }

  /**
   * Event handler for choosing the sorting order
   * @param event - the trigger event
   */
  handleChange (event) {
    this.setState({sortingOrder: event.target.value})
  }

  render () {
    const sortKeys = Object.keys(Modell.SORTING_ORDERS)
    return (
      <div className="mdc-dialog mdc-dialog--open">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title">Wähle die Sortierung:</h2>

            <div className="mdc-dialog__content">
              <ul className="mdc-deprecated-list" onChange={e => this.handleChange(e)}>
                <li>
                  <label htmlFor="initial">
                  <input type="radio"
                         id="initial"
                         name="sorting"
                         value={sortKeys[0]}
                         defaultChecked={this.state.sortingOrder === sortKeys[0]}/>
                  {sortKeys[0]}
                  </label>
                </li>
                <hr/>
                <li>
                  <label htmlFor="up">
                  <input type="radio"
                         id="up"
                         name="sorting"
                         value={sortKeys[1]}
                         defaultChecked={this.state.sortingOrder === sortKeys[1]}/>
                  {sortKeys[1]}
                  </label>
                </li>
                <li>
                  <label htmlFor="down">
                  <input type="radio"
                         id="down"
                         name="sorting"
                         value={sortKeys[2]}
                         defaultChecked={this.state.sortingOrder === sortKeys[2]}/>
                  {sortKeys[2]}
                  </label>
                </li>
              </ul>
            </div>

            <div className="mdc-dialog__actions">
              <button type="button"
                      className="mdc-button mdc-button--raised"
                      onClick={() => this.props.onDialogClose(this.state.sortingOrder, false)}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Abbrechen</span>
              </button>
              &nbsp;
              <button type="button"
                      className="mdc-button mdc-button--raised"
                      onClick={() => this.props.onDialogClose(this.state.sortingOrder, true)}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Sortieren</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SortingModal.propTypes = {
  onDialogClose: PropTypes.func.isRequired
}

export default SortingModal
