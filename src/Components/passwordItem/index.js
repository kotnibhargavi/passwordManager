import './index.css'

const PasswordItem = props => {
  const {passwordItem, colorHexCodes, isChecked, deletePassword} = props
  const {id, website, username, password} = passwordItem

  const initialLetter = website[0].toUpperCase()

  const randomIndex = Math.ceil(Math.random() * colorHexCodes.length - 1)

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item-container">
      <div className="details-container">
        <p
          className="initial-text"
          style={{backgroundColor: `${colorHexCodes[randomIndex]}`}}
        >
          {initialLetter}
        </p>
        <div className="detail-container">
          <p className="website-name">{website}</p>
          <p className="username">{username}</p>
          {!isChecked && (
            <img
              className="stars-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
          {isChecked && <p className="password">{password}</p>}
        </div>
      </div>
      <button
        data-testid="delete"
        type="button"
        className="delete-button"
        onClick={onDeletePassword}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
