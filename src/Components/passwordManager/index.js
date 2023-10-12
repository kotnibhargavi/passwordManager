import './index.css'

import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import PasswordItem from '../passwordItem'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isChecked: false,
    yourPasswordsList: [],
  }

  deletePassword = id => {
    const {yourPasswordsList} = this.state
    const filteredPasswords = yourPasswordsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      yourPasswordsList: filteredPasswords,
    })
  }

  onChecked = () => {
    const {isChecked} = this.state
    console.log(isChecked)
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeWebSite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      yourPasswordsList: [...prevState.yourPasswordsList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onSearchPassword = event => {
    const searchValue = event.target.value
    const {yourPasswordsList} = this.state
    const filteredPasswords = yourPasswordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    this.setState({
      yourPasswordsList: filteredPasswords,
    })
  }

  renderAddNewPassword = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <form className="add-new-password-container">
        <h1 className="add-new-password-heading">Add New Password</h1>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
          />
          <input
            className="input-item"
            type="text"
            placeholder="Enter Website"
            value={websiteInput}
            onChange={this.onChangeWebSite}
          />
        </div>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
          />
          <input
            className="input-item"
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={this.onChangeUserName}
          />
        </div>
        <div className="input-item-container">
          <img
            className="input-item-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
          />
          <input
            className="input-item"
            type="password"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={this.onChangePassword}
          />
        </div>
        <button
          type="submit"
          className="add-button"
          onClick={this.onAddNewPassword}
        >
          Add
        </button>
      </form>
    )
  }

  render() {
    const {yourPasswordsList, isChecked} = this.state

    const passwordsLength = yourPasswordsList.length !== 0

    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="inputs-container">
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          {this.renderAddNewPassword()}
        </div>
        <div className="your-password-container">
          <div className="search-and-count-container">
            <div className="your-password-count-container">
              <h1 className="your-password-count-heading">Your Passwords</h1>
              <p className="your-password-count">{yourPasswordsList.length}</p>
            </div>
            <div className="your-password-search-container">
              <img
                className="your-password-search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="your-password-search-input"
                type="search"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              className="check-input"
              id="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label className="label-heading" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {!passwordsLength && (
            <div className="no-password-container">
              <img
                className="no-password-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
          {passwordsLength && (
            <ul className="passwords-items-container">
              {yourPasswordsList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItem={eachItem}
                  colorHexCodes={colorHexCodes}
                  isChecked={isChecked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
