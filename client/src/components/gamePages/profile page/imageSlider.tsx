import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import javascriptImage from "../../../images/javascript.png";
import pythonImage from "../../../images/python.png";
import "./imageSlider.css";

export const ImageSlider = () => {
  const [urlImage, setUrlImage] = useState<string>("");
  const [images, setImages] = useState([javascriptImage, pythonImage]);
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    if (currentImage + 2 > images.length) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };
  const previousImage = () => {
    if (currentImage <= 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };
  const link = `game/${urlImage}`;

  useEffect(() => {
    if (currentImage === 0) {
      setUrlImage("javascript");
      console.log(urlImage);
    } else {
      setUrlImage("python");
      console.log(urlImage);
    }
  }, [currentImage]);

  return (
    <>
      <div className="imageContainer">
        <i
          className="fas fa-arrow-circle-left previousButton"
          onClick={() => {
            nextImage();
          }}
        ></i>
        <Link to={link}>
          <img
            className="imgCat"
            src={images[currentImage]}
            alt="category image"
          />
        </Link>
        <i
          className="fas fa-arrow-circle-right nextButton"
          onClick={() => {
            previousImage();
          }}
        ></i>
        <div className="circleToImageContainer">
          {images.map((image) => {
            return (
              <div
                className={`circleToImage ${
                  images.indexOf(image) === currentImage ? "active" : ""
                } `}
                onClick={() => {
                  setCurrentImage(images.indexOf(image));
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};
