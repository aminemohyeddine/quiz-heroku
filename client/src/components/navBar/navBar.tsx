import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import { Loading } from "../gamePages/loading page/Loading";

interface Props {
  localStorageAdminIsAuthenticated: boolean | null;
  localStorageIsAuthenticated: boolean | null;
  getUserData: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
  adminIsAuthenticated: boolean;
  setAdminIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
  isMobile: boolean;
  isEditedClass: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<any>>;
  setIsEditedClass: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  name: string;
  showUserInfo: boolean;
  setShowUserInfo: React.Dispatch<React.SetStateAction<any>>;
  logOutHandler: () => void;
}

export const NavBar: React.FC<Props> = ({
  localStorageAdminIsAuthenticated,
  localStorageIsAuthenticated,
  showUserInfo,
  setShowUserInfo,
  setIsAuthenticated,
  setAdminIsAuthenticated,
  logOutHandler,
  isLoading,
  isMobile,
  isEditedClass,
  setIsEditedClass,
}) => {
  const storageName: string | null = localStorage.getItem("name") || "{}";

  return (
    <>
      {isMobile ? (
        <div className="navBar">
          <div className="logo">Fill Your Mind </div>

          <div className="navBarInfosMobile">
            <div
              onClick={() => {
                setIsEditedClass(!isEditedClass);
              }}
              className={`${isEditedClass ? "menuBtnOpen" : "menuBtn"}`}
            >
              <div className="menu-btn_burger"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {localStorageAdminIsAuthenticated ? (
                <>
                  <div className="navBar">
                    <Link to="/" className="logo">
                      Dev Mode
                    </Link>
                    <div className="navBarInfos">
                      <Link className="navInfo login" to="/categoriespage">
                        <p>add a question</p>
                      </Link>
                      <div
                        className="navInfo register"
                        onClick={() => {
                          setShowUserInfo(!showUserInfo);
                        }}
                      >
                        <p>
                          {storageName}{" "}
                          <i className="fas fa-long-arrow-alt-down arrow"></i>
                        </p>
                      </div>
                      {showUserInfo ? (
                        <>
                          <div className="userBellowDiv">
                            <div className="userBellowDivItems">
                              <Link
                                to="/changepassword"
                                className="bellowItem changePassword"
                              >
                                change password
                              </Link>
                              <Link
                                to="/login"
                                onClick={() => {
                                  setShowUserInfo(!showUserInfo);
                                  logOutHandler();
                                  setAdminIsAuthenticated(false);
                                  setIsAuthenticated(false);
                                }}
                                className="bellowItem changePassword"
                              >
                                logout
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}
              {!localStorageIsAuthenticated ? (
                false
              ) : (
                <>
                  <div className="navBar">
                    <Link to="/" className="logo">
                      Fill Your Mind
                    </Link>
                    <div className="navBarInfos">
                      <div
                        className="navInfo register"
                        onClick={() => {
                          setShowUserInfo(!showUserInfo);
                        }}
                      >
                        <p>
                          {storageName}{" "}
                          <i className="fas fa-long-arrow-alt-down arrow"></i>
                        </p>
                      </div>
                    </div>
                    {showUserInfo ? (
                      <>
                        <div className="userBellowDiv">
                          <div className="userBellowDivItems">
                            <Link to="/profile" className="bellowItem profile">
                              profile
                            </Link>
                            <Link
                              to="/changepassword"
                              className="bellowItem changePassword"
                            >
                              change password
                            </Link>
                            <Link
                              to="/login"
                              onClick={() => {
                                logOutHandler();
                                setShowUserInfo(!showUserInfo);
                                setAdminIsAuthenticated(false);
                                setIsAuthenticated(false);
                              }}
                              className="bellowItem changePassword"
                            >
                              logout
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
              {!localStorageIsAuthenticated &&
              !localStorageAdminIsAuthenticated ? (
                <div className="navBar">
                  <Link to="/" className="logo">
                    Fill Your Mind
                  </Link>
                  <div className="navBarInfos">
                    <Link className="navInfo login" to="/login">
                      <p>Login</p>
                    </Link>

                    <Link className="navInfo register" to="/register">
                      <p>Register</p>
                    </Link>

                    <Link className="about" to="/about">
                      <p>About</p>
                    </Link>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
