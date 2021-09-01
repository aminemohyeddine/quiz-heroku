import React, { useState } from "react";
import { Link } from "react-router-dom";
import javascriptImage from "../../../images/javascript_1080px.png";
import pythonImage from "../../../images/python_1080px.png";
import "./categoriesHomePage.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

interface Props {
  isCategoryInHomePage: boolean;
  setIsCategoryInHomePage: React.Dispatch<React.SetStateAction<any>>;
}
export const CategoriesHomePage: React.FC<Props> = ({
  isCategoryInHomePage,
  setIsCategoryInHomePage,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImaged] = useState([
    { image: javascriptImage, name: "javascript" },
    { image: pythonImage, name: "python" },
  ]);
  const [categories, setCategories] = useState(["python", "javascript"]);
  const nextSlide = () => {
    setCurrentImage(
      currentImage === categories.length - 1 ? 0 : currentImage + 1
    );
  };
  const prevSlide = () => {
    setCurrentImage(
      currentImage === 0 ? categories.length - 1 : currentImage - 1
    );
  };

  console.log(currentImage);

  return (
    <>
      {isCategoryInHomePage ? (
        <div className="sliderContainer">
          <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextSlide}
            />
            {images.map((category, index) => {
              return (
                <div
                  className={
                    index === currentImage ? "slide accctive" : "slide"
                  }
                  key={index}
                >
                  {index === currentImage && (
                    <img src={category.image} className="catImage" />
                  )}
                </div>
              );
            })}
          </section>
        </div>
      ) : (
        <>
          <div className="sliderContainer">
            <section className="slider">
              <FaArrowAltCircleLeft
                className="left-arrow"
                onClick={prevSlide}
              />
              <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextSlide}
              />
              {images.map((category, index) => {
                const url = "/game/" + category.name;
                console.log(url);
                return (
                  <>
                    <Link to={url}>
                      <div
                        className={
                          index === currentImage ? "slide accctive" : "slide"
                        }
                        key={index}
                      >
                        {index === currentImage && (
                          <img src={category.image} className="catImage" />
                        )}
                      </div>
                    </Link>
                  </>
                );
              })}
            </section>
          </div>
        </>
      )}
    </>
  );
};
