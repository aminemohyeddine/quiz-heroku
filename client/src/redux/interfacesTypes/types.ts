export interface questionStructure {
  answerText: string;
  isCorrect: boolean;
}

export interface userInformation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
}

export interface AllDataStructure {
  questionText: string;
  answerOptions: questionStructure[];
}

export interface AllQuestionsData {
  allQuestionsData: AllDataStructure[];
}

export type dataAction = {
  type: string;
  payload: AllDataStructure[];
};
