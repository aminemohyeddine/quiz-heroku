import React from "react";
import "./greyPage.css";
interface Props {
  isEditedClass: boolean;
  setIsEditedClass: React.Dispatch<React.SetStateAction<any>>;
}
export const GreyPage: React.FC<Props> = ({
  isEditedClass,
  setIsEditedClass,
}) => {
  return (
    <>
      {isEditedClass ? (
        <div
          onClick={() => {
            setIsEditedClass(false);
          }}
          className="greyPageContainer"
        ></div>
      ) : null}{" "}
    </>
  );
};
