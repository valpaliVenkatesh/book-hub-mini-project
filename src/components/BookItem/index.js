import {AiFillStar} from 'react-icons/ai'

import './index.css'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails
  return (
    <Link to={`/books/${id}`} className="book-item-container">
      <li className="book-details-top-section book-details-top-section1">
        <img
          src={coverPic}
          alt={title}
          className="book-item-details-image book-item-details-image1"
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
      </li>
    </Link>
  )
}

export default BookItem
