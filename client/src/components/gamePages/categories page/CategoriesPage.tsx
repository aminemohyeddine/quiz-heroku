import React, { useEffect, useState } from "react";
import "./CategoriesPage.css";
import { Link } from "react-router-dom";
import javascriptImage from "../../../images/javascript.png";
import pythonImage from "../../../images/python.png";

interface Props {
  setUserInfoToFalse: () => void;
}

export const CategoriesPage: React.FC<Props> = ({ setUserInfoToFalse }) => {
  const adminIsAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("adminAuth") || "{}"
  );
  const isAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("isAuthenticated") || "{}"
  );
  const [categories, setCategories] = useState([
    { categoryName: "Javascript", categorieImage: javascriptImage },
    { categoryName: "Python", categorieImage: pythonImage },
  ]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <div
            onClick={() => {
              setUserInfoToFalse();
            }}
            className="container"
          >
            <h1 className="categoriesTitle">Click on a category and play!</h1>
            <div className="categoriesContainer">
              {categories.map((c) => {
                const categoryUrl = "/game/" + c.categoryName;
                return (
                  <Link className="categoryLink" to={categoryUrl}>
                    <div className="categoryContainer">
                      <div className="categoryName">
                        <h4 className="categoryName">
                          {c.categoryName} Category
                        </h4>
                      </div>
                      <div className="categoryImage">
                        <img className="image" src={c.categorieImage} alt="" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
      {adminIsAuthenticated ? (
        <>
          <div
            className="container"
            onClick={() => {
              setUserInfoToFalse();
            }}
          >
            <div className="titleContainer">
              <h1 className="categoriesTittle">
                Click on a category and add questions!
              </h1>
            </div>
            <div className="categoriesContainer">
              {categories.map((c) => {
                const categoryUrl = "/dev/addquestion/" + c.categoryName;
                return (
                  <Link className="categoryLink" to={categoryUrl}>
                    <div className="categoryContainer">
                      <div className="categoryName">
                        <h4 className="categoryName">
                          {c.categoryName} Category
                        </h4>
                      </div>
                      <div className="categoryImage">
                        <img className="image" src={c.categorieImage} alt="" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
