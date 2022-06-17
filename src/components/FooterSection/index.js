import './index.css'
import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

const FooterSection = () => (
  <footer className="footer-background">
    <div className="footer-icons-container">
      <AiFillGoogleCircle className="footer-icon" />
      <AiFillTwitterCircle className="footer-icon" />
      <AiFillInstagram className="footer-icon" />
      <AiFillYoutube className="footer-icon" />
    </div>
    <p className="contact-us">Contact Us</p>
  </footer>
)

export default FooterSection
