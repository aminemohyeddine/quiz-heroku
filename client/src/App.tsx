import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { QuestionsPage } from "./components/gamePages/game page/questionsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/gamePages/home page/homePage";
import { SignUp } from "./components/authPages/Register";
import { ResetPasswordPage } from "./components/authPages/resetPasswordPage";
import { LoginPage } from "./components/authPages/loginPage";
import { NavBar } from "./components/navBar/navBar";
import { GreyPage } from "./components/navBar/greyPage";
import { LeftBar } from "./components/navBar/leftBar";
import { Footer } from "./components/navBar/footer";
import { ProfilePage } from "./components/gamePages/profile page/profilePage";
import { CategoriesPage } from "./components/gamePages/categories page/CategoriesPage";
import { AddQuestion } from "./components/devPages/addQuestion";
import { ChangePassword } from "./components/authPages/changePassword";
import { About } from "./components/gamePages/about page/about";
import { ContactPage } from "./components/gamePages/contact page/contactPage";
require("dotenv").config();

function App() {
  const [isCategoryInHomePage, setIsCategoryInHomePage] = useState(false);
  const [name, setName] = useState<string>("");
  const [stillAuthorized, setStillAuthorized] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isEditedClass, setIsEditedClass] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //navbar
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const setUserInfoToFalse = () => {
    setShowUserInfo(false);
  };

  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );
  const localStorageIsAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("isAuthenticated") || "{}"
  );

  const localStorageAdminIsAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("adminAuth") || "{}"
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminIsAuthenticated, setAdminIsAuthenticated] =
    useState<boolean>(false);

  const getAdminData = async () => {
    const admin = await axios.post("http://localhost:3001/posts/admin", {
      token: JWT_TOKEN,
    });
    if (admin.data == "String") {
      setAdminIsAuthenticated(false);
      localStorage.setItem("adminAuth", "false");
    } else if (typeof admin.data === "object") {
      setAdminIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    }
  };
  const getUserData = async () => {
    const data = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });

    if (data.data == "String") {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", "false");
      getAdminData();
    } else if (typeof data.data === "object") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      return null;
    }
  };

  const logOutHandler = () => {
    localStorage.setItem("userToken", "");
    setIsAuthenticated(false);
    setAdminIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("adminAuth", "false");
    localStorage.setItem("name", "");
  };

  const getAuthFromLocalS = () => {
    const value = JSON.parse(localStorage.getItem("isAuthenticated") || "{}");
    setIsAuthenticated(value);
  };

  const updateDimensions = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsEditedClass(false);
    }
  };
  window.addEventListener("resize", updateDimensions);

  const checkTheToken = async () => {
    try {
      const tokenResponse = await axios.post("http://localhost:3001/posts", {
        token: JWT_TOKEN,
      });
    } catch (e) {
      setIsAuthenticated(false);
      setAdminIsAuthenticated(false);
      localStorage.setItem("adminAuth", "false");
      localStorage.setItem("isAuthenticated", "false");
    }
  };

  useEffect(() => {
    checkTheToken();
    getAuthFromLocalS();
    getUserData();
  }, []);

  useEffect(() => {
    setInterval(() => {
      checkTheToken();
    }, 600000);
  }, []);
  useEffect(() => {
    updateDimensions();
    console.log(process.env.REACT_APP_API_KEY);
  });

  return (
    <>
      <Router>
        <NavBar
          localStorageAdminIsAuthenticated={localStorageAdminIsAuthenticated}
          localStorageIsAuthenticated={localStorageIsAuthenticated}
          showUserInfo={showUserInfo}
          setShowUserInfo={setShowUserInfo}
          name={name}
          getUserData={() => getUserData()}
          logOutHandler={logOutHandler}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
          adminIsAuthenticated={adminIsAuthenticated}
          setAdminIsAuthenticated={setAdminIsAuthenticated}
        />
        <GreyPage
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
        />
        <LeftBar
          logOutHandler={logOutHandler}
          localStorageIsAuthenticated={localStorageIsAuthenticated}
          localStorageAdminIsAuthenticated={localStorageAdminIsAuthenticated}
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
        />
        {/* //SignUp */}
        <Switch>
          {/* Login and register Pages change password /changepassword */}
          <Route exact path="/register">
            <SignUp
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
            />
          </Route>
          <Route exact path="/changepassword">
            <ChangePassword
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
            />
          </Route>
          <Route exact path="/login">
            <LoginPage
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
              localStorageAdminIsAuthenticated={
                localStorageAdminIsAuthenticated
              }
              name={name}
              setName={setName}
              adminIsAuthenticated={adminIsAuthenticated}
              setAdminIsAuthenticated={setAdminIsAuthenticated}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          </Route>
          {/* game and profile Pages */}
          <Route exact path="/game/:questionsfield">
            <QuestionsPage
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
              isAuthenticated={localStorageIsAuthenticated}
            />
          </Route>
          <Route exact path="/profile">
            <ProfilePage
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
              isCategoryInHomePage={isCategoryInHomePage}
              setIsCategoryInHomePage={setIsCategoryInHomePage}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          </Route>

          <Route exact path="/reset">
            <ResetPasswordPage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <ContactPage />
          </Route>
          <Route exact path="/categoriespage">
            <CategoriesPage setUserInfoToFalse={setUserInfoToFalse} />
          </Route>
          <Route exact path="/">
            <HomePage
              setUserInfoToFalse={() => {
                setUserInfoToFalse();
              }}
              isCategoryInHomePage={isCategoryInHomePage}
              setIsCategoryInHomePage={setIsCategoryInHomePage}
            />
          </Route>
          {/* dev routes */}
          <Route exact path="/dev/addQuestion/:questionsfield">
            <AddQuestion
              setUserInfoToFalse={setUserInfoToFalse}
              adminIsAuthenticated={adminIsAuthenticated}
              setAdminIsAuthenticated={setAdminIsAuthenticated}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
