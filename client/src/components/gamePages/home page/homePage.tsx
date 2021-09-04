import React, { useEffect } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import { CategoriesHomePage } from "./categoriesHomePage";
import fillYourMindImage from "../../../images/fill_imassge.png";

interface Props {
  setUserInfoToFalse: () => void;

  isCategoryInHomePage: boolean;
  setIsCategoryInHomePage: React.Dispatch<React.SetStateAction<any>>;
}
export const HomePage: React.FC<Props> = ({
  setUserInfoToFalse,
  isCategoryInHomePage,
  setIsCategoryInHomePage,
}) => {
  //mounted component
  useEffect(() => {
    setIsCategoryInHomePage(true);
  }, []);
  useEffect(() => () => setIsCategoryInHomePage(false), []);

  return (
    <div
      className="homePageContainer"
      onClick={() => {
        setUserInfoToFalse();
      }}
    >
      <div className="headerContainer">
        <div className="headerTextContainer">
          <img className="fillImageOne" src={fillYourMindImage} alt="image" />
          <img className="fillImageTwo" src={fillYourMindImage} alt="image" />
          <img className="fillImageThree" src={fillYourMindImage} alt="image" />

          <div className="headerBigText">welcome to fill your mind</div>
          <div className="headerSmallText">
            your guide to learn easily in more than +100 category
          </div>
          <Link to="/register">
            <button className="getStartedButton">GET STARTED</button>{" "}
          </Link>
        </div>
      </div>
      <div className="informationContainer">
        <div className="informationItemsContainer">
          <div className="infoTitle">what is fill your mind?</div>
          <div className="infoExplanation">
            <div className="infoFirstP">
              fill your mind is a quiz app that make you learn fast ,easily and
              more fun.
            </div>
            <p>
              we have more than 100 category you can challenge yourself and get
              more informations in each one of them , you can challenge your
              friends too
            </p>
          </div>
        </div>
      </div>
      <div className="categoriesHomePageContainer">
        <div className="categoriesTitle">
          scroll left and right to check categories :
        </div>
        <div className="imC">
          <div className="imageContainer">
            <div className="categoriesImagesSlider">
              <CategoriesHomePage
                isCategoryInHomePage={isCategoryInHomePage}
                setIsCategoryInHomePage={setIsCategoryInHomePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
