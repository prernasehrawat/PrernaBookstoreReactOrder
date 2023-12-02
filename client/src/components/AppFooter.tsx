import '../assets/css/AppFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";


function AppFooter(){
return(
  <footer className="footer" style={{backgroundColor:"rgba(69, 150, 83, 100%)"}}>
    <section className="footer">
        <i className="fa fa-copyright" style={{position:"relative",right:"-95px", top:"1px", }}>
        </i>
        <a  className="Copyrights">Copyright 2023, Inc. | All rights reserved.</a>
        <Link to="/">Terms</Link>
      <Link to="/">Privacy</Link>
      <Link to="/">About</Link>
        <Link to="/">Contact Oasis</Link>
    </section>
    <section className="social-media">
        <Link to="/" ><FontAwesomeIcon icon={faFacebookF} style={{color: "#ffffff"}}/></Link>
      <Link to="/"><FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff"}} /></Link>
        <Link to="/" ><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff"}} /></Link>
    </section>
  </footer>
)
}
export default AppFooter;



