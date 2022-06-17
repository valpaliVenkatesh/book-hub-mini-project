import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import BookItem from '../BookItem'
import BookTypeSideBar from '../BookTypeSideBar'
import './index.css'
import FooterSection from '../FooterSection'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksList: [],
    shelfName: bookshelvesList[0].value,
    searchInput: '',
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {shelfName, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelfName}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {books} = fetchedData
      const formattedBooksData = books.map(each => ({
        id: each.id,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      this.setState({
        booksList: formattedBooksData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchResults = () => {
    this.getBookDetails()
  }

  renderBooksListView = () => {
    const {booksList, searchInput} = this.state

    if (booksList.length !== 0) {
      return (
        <ul className="books-list-container">
          {booksList.map(each => (
            <BookItem bookDetails={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-books">
        <img
          src="https://res.cloudinary.com/dftf6eszf/image/upload/v1655463114/react%20mini%20project%20images/Asset_1_1_cnnppr.png"
          alt="books not found"
        />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getPrimeDeals()
  }

  renderBooksListFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dftf6eszf/image/upload/v1655460144/react%20mini%20project%20images/Group_7522_nuiqfw.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p>Something went wrong,Please try again</p>
      <button
        className="logout-desktop-btn"
        type="button"
        onClick={this.tryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderTheResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksListView()
      case apiStatusConstants.failure:
        return this.renderBooksListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeTheBookShelf = value => {
    this.setState({shelfName: value}, this.getBookDetails)
  }

  render() {
    const {searchInput, shelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="bookshelves-background">
          <ul className="books-shelf-list-container books-shelf-list-container1">
            {bookshelvesList.map(each => (
              <BookTypeSideBar
                key={each.id}
                changeTheBookShelf={this.changeTheBookShelf}
                bookshelfDetails={each}
                shelfName={shelfName}
              />
            ))}
          </ul>
          <div className="bookshelves-right-part">
            <div className="heading-container">
              <h1 className="all-books-heading">All Books</h1>
              <div className="input-element-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input-box"
                  value={searchInput}
                  onChange={this.onChangeInput}
                />
                <button type="button" onClick={this.searchResults}>
                  <AiOutlineSearch />
                </button>
              </div>
            </div>
            {this.renderTheResults()}
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default BookShelves
