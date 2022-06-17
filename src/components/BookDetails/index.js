import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import FooterSection from '../FooterSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetailsArray: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const bookDetails = fetchedData.book_details
      const formattedBookDetails = {
        id: bookDetails.id,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        aboutBook: bookDetails.about_book,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
        aboutAuthor: bookDetails.about_author,
      }
      this.setState({
        bookDetailsArray: formattedBookDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookDetails = () => {
    const {bookDetailsArray} = this.state
    const {
      id,
      authorName,
      coverPic,
      aboutBook,
      aboutAuthor,
      rating,
      readStatus,
      title,
    } = bookDetailsArray
    return (
      <>
        <Header />
        <div className="book-details-outer-background">
          <div className="book-details-inner-background">
            <div className="book-details-top-section">
              <img
                src={coverPic}
                alt={title}
                className="book-item-details-image"
              />
              <div>
                <h1 className="book-heading">{title}</h1>
                <p>{authorName}</p>
                <div className="rating-container">
                  <p className="avg-rating">Avg Rating</p>
                  <AiFillStar fill="yellow" className="avg-rating" />
                  <p className="avg-rating">{rating}</p>
                </div>
                <div className="rating-container">
                  <p>Status: </p>
                  <p className="reading-status">{readStatus}</p>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <h1>About Author</h1>
            <p>{aboutAuthor}</p>
            <h1>About Book</h1>
            <p>{aboutBook}</p>
          </div>
        </div>
        <FooterSection />
      </>
    )
  }

  renderBookDetailsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  renderBookDetailsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTheResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetails()
      case apiStatusConstants.failure:
        return this.renderBookDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderBookDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTheResults()}</div>
  }
}

export default BookDetails
