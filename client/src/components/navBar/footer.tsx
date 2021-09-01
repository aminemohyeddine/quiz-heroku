import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="footerElement">
          <Link to="#">
            <div className="element faQ">FAQ</div>
          </Link>
          <Link to="#">
            <div className="element contactUs">CONTACT US</div>
          </Link>
          <Link to="#">
            <div className="element terms">TERMS OF SERVICE</div>
          </Link>
        </div>
        <div className="pagesCopyright">
          <div className="socialMediaIcons">
            <div className="icon facebook">
              <a href="https://www.facebook.com/amine.mohyeddine/">
                <i className="fab fa-facebook-square"></i>
              </a>
            </div>
            <div className="icon twitter">
              <a href="https://www.facebook.com/amine.mohyeddine/">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="icon instagram">
              <a href="https://www.facebook.com/amine.mohyeddine/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="copyright">
            © 2021, <Link to="/">FOCUSED & DETERMINED .</Link>
          </div>
          <div className="emptyDiv"></div>
        </div>
      </div>
    </>
  );
};
