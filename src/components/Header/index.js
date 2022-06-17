import Popup from 'reactjs-popup'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

const tabs = {home: 'HOME', bookshelves: 'BOOKSHELVES'}

class Header extends Component {
  state = {activeTab: tabs.home}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  changeTabToBookshelves = () => {
    this.setState({activeTab: tabs.bookshelves})
  }

  changeTabToHome = () => {
    this.setState({activeTab: tabs.home})
  }

  render() {
    const {activeTab} = this.state
    const homeClass = activeTab === tabs.home ? 'activeTabId-class' : ''
    const bookshelvesClass =
      activeTab === tabs.bookshelves ? 'activeTabId-class' : ''
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dftf6eszf/image/upload/v1655300197/react%20mini%20project%20images/Group_7731_ik9rkz.png"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
          </Link>
          <div className="nav-item-container">
            <ul className="nav-menu">
              <Link to="/" className="nav-link">
                <li className={homeClass} onClick={this.changeTabToHome}>
                  Home
                </li>
              </Link>
              <Link to="/shelf" className="nav-link">
                <li
                  className={bookshelvesClass}
                  onClick={this.changeTabToBookshelves}
                >
                  BookShelves
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
          <div className="popup-container">
            <Popup
              modal
              trigger={<GiHamburgerMenu className="hamburger-icon" />}
            >
              {close => (
                <>
                  <div className="popup-items">
                    <ul className="nav-menu">
                      <Link to="/" className="nav-link">
                        <li
                          className={homeClass}
                          onClick={this.changeTabToHome}
                        >
                          Home
                        </li>
                      </Link>
                      <Link to="/shelf" className="nav-link">
                        <li
                          className={bookshelvesClass}
                          onClick={this.changeTabToBookshelves}
                        >
                          BookShelves
                        </li>
                      </Link>
                    </ul>
                    <button
                      type="button"
                      className="logout-desktop-btn"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className="trigger-cancel-button"
                      onClick={() => close()}
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
