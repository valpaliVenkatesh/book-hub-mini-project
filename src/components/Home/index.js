import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import './index.css'
import FooterSection from '../FooterSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularBooksList: []}

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      popularBooksList: [],
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      const formattedPopularBooksData = books.map(each => ({
        id: each.id,
        title: each.title,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))

      this.setState({
        popularBooksList: formattedPopularBooksData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderPopularBooksListView = () => {
    const {popularBooksList} = this.state
    const settingsLarge = {
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 3,
    }
    const settingsSmall = {
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 2,
    }
    return (
      <div className="slider-containers">
        <div className="slider-container-sm">
          <Slider {...settingsSmall}>
            {popularBooksList.map(each => (
              <div>
                <Link to={`/bookDetails/${each.id}`} className="nav-link">
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="popular-book-image"
                  />
                  <h1 className="popular-book-heading">{each.title}</h1>
                  <p>{each.authorName}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="slider-container-lg">
          <Slider {...settingsLarge}>
            {popularBooksList.map(each => (
              <div>
                <Link to={`/books/${each.id}`} className="nav-link">
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="popular-book-image"
                  />
                  <h1 className="popular-book-heading">{each.title}</h1>
                  <p>{each.authorName}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  tryAgain = () => {
    this.getPrimeDeals()
  }

  renderPopularBooksListFailureView = () => (
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
        return this.renderPopularBooksListView()
      case apiStatusConstants.failure:
        return this.renderPopularBooksListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-background">
          <h1>Find your Next Favorite Books</h1>
          <p>
            You are in the right place.Tell us what titles or generes you have
            enjoyed in the past,and we
            <br /> will give you surprisingly insightful recommendations.
          </p>
          <Link to="/bookshelves" className="nav-link">
            <button
              type="button"
              className="logout-desktop-btn mobile-find-button"
            >
              Find Books
            </button>
          </Link>
          <div className="carousel-card-background">
            <div className="heading-container">
              <h1>Top Rated Books</h1>
              <Link to="/shelf" className="nav-link">
                <button
                  type="button"
                  className="logout-desktop-btn desktop-find-button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderTheResults()}
          </div>
        </div>
        <FooterSection />
      </>
    )
  }
}
export default Home
