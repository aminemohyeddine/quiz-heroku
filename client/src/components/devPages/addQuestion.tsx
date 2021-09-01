import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./addQuestion.css";
import { useParams } from "react-router-dom";
import { Loading } from "../gamePages/loading page/Loading";

interface Props {
  setUserInfoToFalse: () => void;
  adminIsAuthenticated: boolean;
  setAdminIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
}
export const AddQuestion: React.FC<Props> = ({
  setUserInfoToFalse,
  setAdminIsAuthenticated,
}) => {
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );
  const isAuthenticatedAsAdmin: boolean | null = JSON.parse(
    localStorage.getItem("adminAuth") || "{}"
  );
  const getAdminData = async () => {
    setLoading(true);
    const data = await axios.post("http://localhost:3001/posts/admin", {
      token: JWT_TOKEN,
    });
    if (!data) {
      console.log("no data");
      setAdminIsAuthenticated(false);
    } else {
      setAdminIsAuthenticated(true);
    }
    setLoading(false);
  };
  const [loading, setLoading] = useState<boolean>(true);
  let { questionsfield }: any = useParams();

  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <Formik
      initialValues={{
        textQuestion: "",
        ResponseOne: "",
        ResponseTwo: "",
        ResponseThree: "",
        ResponseFour: "",
        responseOneIsCorrect: false,
        responseTwoIsCorrect: false,
        responseThreeIsCorrect: false,
        responseFourIsCorrect: false,
      }}
      validationSchema={Yup.object({
        textQuestion: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required")
          .min(6, "Must be 255 characters or more"),
        ResponseOne: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required")
          .min(1, "Must be 255 characters or more"),
        ResponseTwo: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required")
          .min(1, "Must be 255 characters or more"),
        ResponseThree: Yup.string()
          .max(255, "Must be 255 characters or less")
          .min(1, "Must be 255 characters or more"),
        ResponseFour: Yup.string()
          .max(255, "Must be 255 characters or less")
          .min(1, "Must be 255 characters or more"),
      })}
      onSubmit={(
        {
          textQuestion,
          ResponseOne,
          ResponseTwo,
          ResponseThree,
          ResponseFour,
          responseOneIsCorrect,
          responseTwoIsCorrect,
          responseThreeIsCorrect,
          responseFourIsCorrect,
        },
        { setSubmitting }
      ) => {
        if (ResponseThree === "") {
          const questionAdded: any = axios.post(
            `http://localhost:3001/question/add/${questionsfield}`,
            {
              questionText: textQuestion,
              answerOption: [
                { answerText: ResponseOne, isCorrect: responseOneIsCorrect },
                { answerText: ResponseTwo, isCorrect: responseTwoIsCorrect },
              ],
            }
          );
        } else if (ResponseFour === "" && ResponseThree.length > 1) {
          const questionAdded: any = axios.post(
            `http://localhost:3001/question/add/${questionsfield}`,
            {
              questionText: textQuestion,
              answerOption: [
                { answerText: ResponseOne, isCorrect: responseOneIsCorrect },
                { answerText: ResponseTwo, isCorrect: responseTwoIsCorrect },
                {
                  answerText: ResponseThree,
                  isCorrect: responseThreeIsCorrect,
                },
              ],
            }
          );
        } else {
          const questionAdded: any = axios.post(
            `http://localhost:3001/question/add/${questionsfield}`,
            {
              questionText: textQuestion,
              answerOption: [
                { answerText: ResponseOne, isCorrect: responseOneIsCorrect },
                { answerText: ResponseTwo, isCorrect: responseTwoIsCorrect },
                {
                  answerText: ResponseThree,
                  isCorrect: responseThreeIsCorrect,
                },
                { answerText: ResponseFour, isCorrect: responseFourIsCorrect },
              ],
            }
          );
        }
      }}
    >
      {isAuthenticatedAsAdmin ? (
        <>
          {loading ? (
            <>{<Loading />}</>
          ) : (
            <>
              <Form>
                <div
                  onClick={() => {
                    setUserInfoToFalse();
                  }}
                  className="devQuestionsContainer"
                >
                  <div className="devFormContainer">
                    <h1 className="devMainMessage">
                      Adding {questionsfield} questions Page
                    </h1>
                    <div className="devForms">
                      <div className="DevErrorDiv devErrorTextQuestion">
                        <ErrorMessage name="textQuestion" />
                      </div>
                      <Field
                        className="devQuestionInput"
                        name="textQuestion"
                        type="text"
                        placeholder="type question"
                      />
                      <div className="DevErrorDiv devErrorResponseOne">
                        <ErrorMessage name="ResponseOne" />
                      </div>
                      <div className="questionOnePlusIsCorrect">
                        <Field
                          className="questionInput ResponseOneInput"
                          name="ResponseOne"
                          type="text"
                          placeholder="type first question"
                        />
                        <Field
                          className="isTrueSection"
                          as="select"
                          name="responseOneIsCorrect"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </Field>
                      </div>
                      <div className="DevErrorDiv devErrorResponseTwo">
                        <ErrorMessage name="ResponseTwo" />
                      </div>
                      <div className="questionTwoPlusIsCorrect">
                        <Field
                          className="questionInput ResponseTwoInput"
                          name="ResponseTwo"
                          type="text"
                          placeholder="type 2nd question"
                        />
                        <Field
                          as="select"
                          className="isTrueSection"
                          name="responseTwoIsCorrect"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </Field>
                      </div>
                      <div className="DevErrorDiv devErrorResponseThree">
                        <ErrorMessage name="ResponseThree" />
                      </div>
                      <div className="questionThreePlusIsCorrect">
                        <Field
                          className="questionInput ResponseThreeInput"
                          name="ResponseThree"
                          type="text"
                          placeholder="type 3rd question"
                        />

                        <Field
                          as="select"
                          className="isTrueSection"
                          name="responseThreeIsCorrect"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </Field>
                      </div>
                      <div className="DevErrorDiv devErrorResponseFour">
                        <ErrorMessage name="ResponseFour" />
                      </div>
                      <div className="questionFourPlusIsCorrect">
                        <Field
                          className="questionInput ResponseFourInput"
                          name="ResponseFour"
                          type="text"
                          placeholder="type 4th question"
                        />

                        <Field
                          as="select"
                          className="isTrueSection"
                          name="responseFourIsCorrect"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </Field>
                      </div>
                      <button className="addQuestionButton" type="submit">
                        Add {questionsfield} Question
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </>
      ) : (
        <>login as an admin first</>
      )}
    </Formik>
  );
};
