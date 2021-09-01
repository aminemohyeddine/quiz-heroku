import axios from "axios";
import React, { useEffect, useState } from "react";
import { MustLogin } from "../../authPages/mustLogin";
import { ImageSlider } from "./imageSlider";
import { Loading } from "../loading page/Loading";
import "./profilePage.css";
import { CategoriesHomePage } from "../home page/categoriesHomePage";

interface profilePageProps {
  setUserInfoToFalse: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
  isCategoryInHomePage: boolean;
  setIsCategoryInHomePage: React.Dispatch<React.SetStateAction<any>>;
}

export const ProfilePage: React.FC<profilePageProps> = ({
  setUserInfoToFalse,
  isCategoryInHomePage,
  setIsCategoryInHomePage,
  setIsAuthenticated,
}) => {
  useEffect(() => {
    console.log(isCategoryInHomePage);
  }, []);
  //getting the current User Data

  const [totalGames, setTotalGames] = useState<number>(0);
  const [lastGameDate, setLastGameDate] = useState<string>("");
  const [firstGameHour, setFirstGameHour] = useState<string>("");
  const [lastGameHour, setLastGameHour] = useState<string>("");
  const [firstGameDate, setFirstGameDate] = useState<string>("");
  const [neverPlayedCategory, setNeverPlayedCategory] = useState<string>("");
  const [mostPlayedCategory, setMostPlayedCategory] = useState<string>("");
  const [percentageOfRightAnswers, setPercentageOfRightAnswers] =
    useState<number>(0);

  const localStorageIsAuthenticated: string | null = JSON.parse(
    localStorage.getItem("isAuthenticated") || "{}"
  );

  const localStorageAdminIsAuthenticated: string | null = JSON.parse(
    localStorage.getItem("adminAuth") || "{}"
  );

  const [name, setName] = useState("");
  const [isUser, setIsUser] = useState(false);

  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );

  const getUserData = async () => {
    let percentage = 0;
    let pythonTimes = 0;
    let javascriptTimes = 0;

    const data: any = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });

    if (typeof data.data === "object") {
      let firstPlayTime = data.data.firstGame.substring(11, 19);
      setFirstGameHour(firstPlayTime);

      let lastPlayTime = data.data.lastGame.substring(11, 19);
      setLastGameHour(lastPlayTime);

      let firstPlayDate = data.data.firstGame.substring(0, 10);
      setFirstGameDate(firstPlayDate);

      let lastPlayDate = data.data.lastGame.substring(0, 10);
      setLastGameDate(lastPlayDate);

      data.data.allGames.forEach((a: any) => {
        if (a.categoryPlayed === "javascript") {
          javascriptTimes = javascriptTimes + 1;
        } else if (a.categoryPlayed === "python") {
          pythonTimes = pythonTimes + 1;
        }
        percentage = percentage + a.percOfGame;
        if (pythonTimes >= javascriptTimes) {
          setMostPlayedCategory("Python");
        } else {
          setMostPlayedCategory("JavaScript");
        }

        if (javascriptTimes === 0) {
          setNeverPlayedCategory("JavaScript");
        } else if (pythonTimes === 0) {
          setNeverPlayedCategory("Python");
        }
      });
      let realPercentage = percentage / data.data.allGames.length;
      let finalPercentage = parseInt(realPercentage.toFixed(2));
      setPercentageOfRightAnswers(finalPercentage);

      setTotalGames(data.data.allGames.length);
      setIsUser(true);
      setName(data.data.firstName);
    } else {
      localStorage.setItem("isAuthenticated", "false");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [isCategory, setIsCategory] = useState(true);
  return (
    <>
      {localStorageIsAuthenticated ? (
        <>
          <div
            className="profilePageContainer"
            onClick={() => {
              setUserInfoToFalse();
            }}
          >
            {name === undefined || name === "" ? (
              <Loading />
            ) : (
              <>
                {" "}
                <h1
                  className="welcomeMessage"
                  onClick={() => {
                    setUserInfoToFalse();
                  }}
                >
                  welcome {name} to fill your mind!
                </h1>
                <div className="dataNewsContainer">
                  <div className="dataButtonsContainer">
                    <div className="dataContainer">
                      <div className="dataItem gamesNumber">
                        you have played : {totalGames} game
                      </div>
                      <div className="dataItem profilePercentage">
                        percentage of correct values :{" "}
                        {percentageOfRightAnswers}%
                      </div>
                      <div className="dataItem mostPlayedCategoryMessage">
                        most played category is &nbsp;
                        <span className="mostPlayedCategoryName">
                          {mostPlayedCategory}
                        </span>
                      </div>
                      <div className="dataItem neverPlayedCategoryMessage">
                        you can try{" "}
                        <span className="neverPlayedCategoryName">
                          {neverPlayedCategory}
                        </span>{" "}
                        questions for the first time{" "}
                      </div>
                      <div className="dataItem firstGame">
                        your first game was in &nbsp;{firstGameDate} at{" "}
                        {firstGameHour}
                      </div>
                      <div className="dataItem lastGame">
                        your last game was in &nbsp;{lastGameDate} at{" "}
                        {lastGameHour}
                      </div>
                    </div>
                    <div className="categoriesMostPlayedContainer">
                      <div className="buttonsContainer">
                        {isCategory ? (
                          <>
                            <div
                              className="categoriesButton active"
                              onClick={() => {
                                setIsCategory(true);
                              }}
                            >
                              Categories
                            </div>
                            <div
                              className="mostPlayedButton"
                              onClick={() => {
                                setIsCategory(false);
                              }}
                            >
                              Other Games
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="categoriesButton"
                              onClick={() => {
                                setIsCategory(true);
                                setUserInfoToFalse();
                              }}
                            >
                              Categories
                            </div>
                            <div
                              className="mostPlayedButton active"
                              onClick={() => {
                                setIsCategory(false);
                              }}
                            >
                              Other Games
                            </div>
                          </>
                        )}
                      </div>
                      {isCategory ? (
                        <>
                          <div
                            className="contentContainer"
                            onClick={() => {
                              setUserInfoToFalse();
                            }}
                          >
                            <div className="imageContainer">
                              <CategoriesHomePage
                                isCategoryInHomePage={isCategoryInHomePage}
                                setIsCategoryInHomePage={
                                  setIsCategoryInHomePage
                                }
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="contentContainer"
                          onClick={() => {
                            setUserInfoToFalse();
                          }}
                        >
                          soon...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="news">News :</div>
                </div>{" "}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <MustLogin />
        </>
      )}
    </>
  );
};
