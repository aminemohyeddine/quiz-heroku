import React from "react";
import "./leftBar.css";
import { Link } from "react-router-dom";

interface Props {
  logOutHandler: () => void;

  localStorageIsAuthenticated: boolean | null;
  localStorageAdminIsAuthenticated: boolean | null;
  isEditedClass: boolean;
  setIsEditedClass: React.Dispatch<React.SetStateAction<any>>;
}
export const LeftBar: React.FC<Props> = ({
  logOutHandler,
  localStorageIsAuthenticated,
  localStorageAdminIsAuthenticated,
  isEditedClass,
  setIsEditedClass,
}) => {
  return (
    <>
      {isEditedClass &&
      !localStorageIsAuthenticated &&
      !localStorageAdminIsAuthenticated ? (
        <div className="sideBarContainer">
          <div className="sideBarInfos">
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar login"
              to="/login"
            >
              <p>Login</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar register"
              to="/register"
            >
              <p>Register</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar contact"
              to="/contact"
            >
              <p>Contact</p>
            </Link>
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar aabout"
              to="/about"
            >
              <p>About</p>
            </Link>
          </div>
        </div>
      ) : localStorageAdminIsAuthenticated && isEditedClass ? (
        <div className="sideBarContainer">
          <div className="sideBarInfos">
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar rules"
              to="/changepassword"
            >
              <p>change password</p>
            </Link>
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar rules"
              to="/categoriespage"
            >
              <p>add questions</p>
            </Link>
            <Link
              onClick={() => {
                logOutHandler();
                setIsEditedClass(false);
              }}
              className="sideBar login"
              to="/login"
            >
              <p>logout</p>
            </Link>
          </div>
        </div>
      ) : localStorageIsAuthenticated && isEditedClass ? (
        <div className="sideBarContainer">
          <div className="sideBarInfos">
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar rules"
              to="/profile"
            >
              <p>profile</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar login"
              to="/changepassword"
            >
              <p>change password</p>
            </Link>
            <Link
              onClick={() => {
                setIsEditedClass(false);
                logOutHandler();
              }}
              className="sideBar login"
              to="/login"
            >
              <p>logout</p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};
