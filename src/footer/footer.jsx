import { Link } from 'react-router-dom';
import './footer.css'

function Footer () {
  return (
    <div className="footer-container">
      <div className="footer-left-side">
        <Link to="/about">
          <span className='footer-left-side-context'>About US</span>
        </Link>

        <Link to="/services">
          <span className='footer-left-side-context'>Things to know before buying</span>
        </Link>

        <Link to="/services">
          <span className='footer-left-side-context'>Terms of Service</span>
        </Link>

        <Link to="/services">
          <span className='footer-left-side-context'>Privacy Policy</span>
        </Link>

        <Link to="/">
          <span className='footer-left-side-context'>Delivery Service Details</span>
        </Link>
        <Link to="/">
          <span className='footer-left-side-context'>Store Address</span>
        </Link>
      </div>
      <div className="footer-right-side">
      <span className='footer-right-side-context'>Email:</span>
      <span className='footer-right-side-context'>example.info@gmail.com</span>
      <span className='footer-right-side-context'>WhatsApp:</span>
      <span className='footer-right-side-context'>+852 1234 5678</span>
      </div>
    </div>
  )
}
export default Footer