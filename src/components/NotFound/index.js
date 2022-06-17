import './index.css'

const NotFound = props => {
  const {history} = props
  const goToHomPage = () => {
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dftf6eszf/image/upload/v1655463124/react%20mini%20project%20images/Group_7484_cicyrh.png"
        alt="not-found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p>
        We are sorry,the page you are requested could not be found,
        <br />
        Please go back to the home page
      </p>
      <button
        type="button"
        onClick={goToHomPage}
        className="logout-desktop-btn"
      >
        Retry
      </button>
    </div>
  )
}

export default NotFound
