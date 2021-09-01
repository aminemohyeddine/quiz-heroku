import "./mustLogin.css";
import { Link } from "react-router-dom";

export const MustLogin = () => {
  return (
    <div className="mustLoginContainer">
      <div className="mustLoginItems">
        <h4 className="mustLoginText">you have to login first !</h4>
        <Link to="/login">
          <div className="mustLoginText">
            click here to redirect to login page.
          </div>
        </Link>
        <Link to="/login">
          <div className="registerrText">
            you don't have an account yet? click here to redirect to register
            page.
          </div>
        </Link>
      </div>
    </div>
  );
};
