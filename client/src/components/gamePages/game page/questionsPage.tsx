import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import "./questionsPage.css";
import { AllDataStructure } from "../../../redux/interfacesTypes/types";
import { getAllData } from "../../../redux/actions/quizDataAction";
import axios from "axios";
import { MustLogin } from "../../authPages/mustLogin";
import { Loading } from "../loading page/Loading";

interface Props {
  isAuthenticated: boolean | null;
  setUserInfoToFalse: () => void;
}

export const QuestionsPage: React.FC<Props> = ({
  isAuthenticated,
  setUserInfoToFalse,
}) => {
  //states
  const [answerIsShown, setAnswerIsShown] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(30);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(1);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AllDataStructure[]>([]);
  const [dataBackEnd, setDataBackEnd] = useState<AllDataStructure[]>([]);
  const [firstGame, setFirstGame] = useState<boolean>(false);

  const dispatch = useDispatch();

  let { questionsfield }: any = useParams();

  const getDataFromBackEnd = async () => {
    const allData = await axios.get(
      `http://localhost:3001/question/get/${questionsfield}`
    );
    setDataBackEnd(allData.data);
  };

  //redux
  const stateData: any = useSelector(
    (state: RootState) => state.getAllQuestionsReducer
  );
  const reduxData: AllDataStructure[] = stateData.allQuestionsData;

  // shuffleData

  //getting the current User Data
  const [name, setName] = useState("");
  const [isUser, setIsUser] = useState(false);
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );

  const getUserData = async () => {
    const data = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });
    if (!data.data.firstGame) {
      setFirstGame(true);
    } else {
      setFirstGame(false);
    }
    setName(data.data.firstName);
  };
  //end of getting data

  const getData = () => {
    setLoading(true);
    setData(reduxData);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllData(dataBackEnd));
    }
  }, [dataBackEnd]);

  useEffect(() => {
    getDataFromBackEnd();
  }, []);

  useEffect(() => {
    getData();
  }, [reduxData]);

  useEffect(() => {
    getUserData();
  }, [name]);

  //first game function
  const firstGameHandler = async () => {
    const scoref = score - 1;
    const percentage = (scoref * 100) / data.length;
    const percentageWithTwoDigit = percentage.toFixed(2);
    const dataa = await axios.post("http://localhost:3001/gamedata/firstgame", {
      firstName: name,
      gameScore: scoref,
      totalOfQuestions: data.length,
      percOfGame: percentageWithTwoDigit,
      categoryPlayed: questionsfield,
    });
  };

  const gameHandler = async () => {
    const scoref = score - 1;
    const percentage = (scoref * 100) / data.length;
    const percentageWithTwoDigit = percentage.toFixed(2);
    const dataa = await axios.post("http://localhost:3001/gamedata/addgame", {
      firstName: name,
      gameScore: scoref,
      totalOfQuestions: data.length,
      percOfGame: percentageWithTwoDigit,
      categoryPlayed: questionsfield,
    });
  };
  useEffect(() => {
    if (firstGame) {
      firstGameHandler();
    } else {
      gameHandler();
    }
  }, [showScore]);

  const hideRightAnswer = () => {
    setTimeout(() => {
      setAnswerIsShown(false);
    }, 3000);
  };

  const timeCompleted = () => {
    setAnswerIsShown(true);
    hideRightAnswer();
    setTimeout(() => {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(0);
        setShowScore(true);
      }
      setSeconds(30);
    }, 3000);
  };

  const answerHandler = (isCorrect: boolean) => {
    return (event: React.MouseEvent) => {
      isCorrect ? setScore(score + 1) : setScore(score);
      setAnswerIsShown(true);
      hideRightAnswer();

      setTimeout(() => {
        if (currentQuestion < data.length - 1)
          setCurrentQuestion(currentQuestion + 1);
        else {
          setCurrentQuestion(0);
          setShowScore(true);
        }
        setSeconds(30);
      }, 3000);
    };
  };

  //timer
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => window.clearTimeout(timeoutID);
  }, [seconds]);

  //timeOut of question
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSeconds(30);
      timeCompleted();
    }, 30000);
    return () => window.clearTimeout(timeoutID);
  }, [currentQuestion]);

  //time total
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setTotalTime(totalTime + 1);
    }, 30000);
    return () => window.clearTimeout(timeoutID);
  }, [totalTime]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          {loading ? (
            <div
              onClick={() => {
                setUserInfoToFalse();
              }}
            >
              loading ...
            </div>
          ) : (
            <div
              onClick={() => {
                setUserInfoToFalse();
              }}
            >
              {data === undefined || data.length === 0 ? (
                <Loading />
              ) : (
                <div
                  onClick={() => {
                    setUserInfoToFalse();
                  }}
                >
                  {showScore ? (
                    <div
                      className="scorePage"
                      onClick={() => {
                        setUserInfoToFalse();
                      }}
                    >
                      <div className="score">
                        <div className="scoreText">
                          you got {score - 1} points out of {data.length}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="questionContainer"
                        onClick={() => {
                          setUserInfoToFalse();
                        }}
                      >
                        <div className="questions">
                          <div className="question-section">
                            <div className="question-count">
                              <div className="questionNumberText">
                                Question {currentQuestion + 1}
                              </div>
                            </div>
                            <h4 className="question-text">
                              00:{seconds}
                              <br></br>
                              {data[currentQuestion].questionText}
                            </h4>
                          </div>
                          <div className="answer-section">
                            {data[currentQuestion].answerOptions.map(
                              (answer, key) =>
                                answerIsShown ? (
                                  answer.isCorrect ? (
                                    <button className="answersButtonRight">
                                      {answer.answerText}
                                    </button>
                                  ) : (
                                    <button className="answersButtonWrong">
                                      {answer.answerText}
                                    </button>
                                  )
                                ) : (
                                  <button
                                    className="answersButton"
                                    onClick={answerHandler(answer.isCorrect)}
                                  >
                                    {answer.answerText}
                                  </button>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <MustLogin />
        </>
      )}
    </div>
  );
};
