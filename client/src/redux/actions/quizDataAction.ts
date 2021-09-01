import { AllDataStructure } from "./../interfacesTypes/types";
import { dataConstants } from "./../constants/quizDataConst";
import { dataAction } from "./../interfacesTypes/types";
import { Dispatch, useState } from "react";

export const getAllData = (allData: AllDataStructure[]) => {
  let finalArray: AllDataStructure[] = [];
  function randomArrayShuffle(array: AllDataStructure[]) {
    var currentIndex: number = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    finalArray = array.slice(0, 5);
  }

  randomArrayShuffle(allData);
  return (dispatch: Dispatch<dataAction>) => {
    dispatch({
      type: dataConstants.getAllData,
      payload: finalArray,
    });
  };
};
