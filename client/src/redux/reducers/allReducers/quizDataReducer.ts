import { AllDataStructure } from "../../interfacesTypes/types";
import { dataConstants } from "../../constants/quizDataConst";
import { dataAction } from "../../interfacesTypes/types";

export const getAllQuestionsReducer = (state = [], action: dataAction) => {
  switch (action.type) {
    case dataConstants.getAllData:
      return { ...state, allQuestionsData: action.payload };
    default:
      return state;
  }
};
