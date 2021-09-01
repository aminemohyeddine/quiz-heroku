import { combineReducers } from "redux";
import { getAllQuestionsReducer } from "./allReducers/quizDataReducer";

export const rootReducer = combineReducers({ getAllQuestionsReducer });
