import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
interface Props {
  setUserInfoToFalse: () => void;
}
export const SignUp: React.FC<Props> = ({ setUserInfoToFalse }) => {
  const [message, setMessage] = useState("");

  const fetchProducts = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string,
    phoneNumber: string
  ) => {
    const user = await axios.post(`${process.env.REACT_APP_IP}/user/register`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userName: userName,
      phoneNumber: phoneNumber,
    });
    if (user.data.message === "user added") return setMessage("user Added");
    setMessage(user.data);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(1024, "UserName Must be 1024 characters or less")
            .min(6, "UserName Must be 6 characters or more")
            .required("UserName is Required"),
          password: Yup.string()
            .max(20, "Password Must be 20 characters or less")
            .min(6, "Password Must be 6 characters or more")
            .required("Password is Required"),
          firstName: Yup.string()
            .max(255, "FirstName Must be 255 characters or less")
            .min(6, "FirstName Must be 6 characters or more")
            .required("FirstName is Required"),
          lastName: Yup.string()
            .max(255, "LastName Must be 255 characters or less")
            .min(6, "LastName Must be 6 characters or more")
            .required("LastName is Required"),
          email: Yup.string()
            .max(1024, "Email Must be 1024 characters or less")
            .min(6, "Email Must be 6 characters or more")
            .required("Email is Required")
            .email(),
          phoneNumber: Yup.string()
            .max(1024, "PhoneNumber Must be 1024 characters or less")
            .min(6, "PhoneNumber Must be 6 characters or more")
            .required("PhoneNumber is Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetchProducts(
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.userName,
            values.phoneNumber
          );
        }}
      >
        {({ errors, touched }) => (
          <Form
            onClick={() => {
              setUserInfoToFalse();
            }}
          >
            <div className="signUp">
              <div className="welcomeSection">
                <h1>Welcome</h1>
                <br></br> <p>You are 30 seconds away from getting started!</p>
              </div>
              <div className="singUpFormContainer">
                <h3>{message}</h3>
                <h1>Register</h1>
                <div className="NamesInputContainer">
                  {/* firstName input */}
                  <div>
                    {errors.firstName && touched.firstName ? (
                      <div className="firstNameErrorM errorM">
                        <ErrorMessage name="firstName" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      placeholder="First Name *"
                      className="input singUpFirstNameInput"
                      name="firstName"
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                  {/* lastName input */}
                  <div>
                    {errors.lastName && touched.lastName ? (
                      <div className="lastNameErrorM errorM">
                        <ErrorMessage name="lastName" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      placeholder="Last Name *"
                      className="input singUpLastNameInput"
                      name="lastName"
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="userNamePasswordInputContainer">
                  {/* userName input */}
                  <div>
                    {errors.userName && touched.userName ? (
                      <div className="lastNameUserNameErrorM errorM">
                        <ErrorMessage name="userName" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      placeholder="User Name *"
                      className="input lastNameUserNameInput"
                      name="userName"
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                  {/* password input */}
                  <div>
                    {errors.password && touched.password ? (
                      <div className="singUpPasswordErrorM errorM">
                        <ErrorMessage name="password" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      placeholder="Password *"
                      className="input singUpPasswordInput"
                      name="password"
                      type="password"
                    />
                  </div>
                </div>
                <div className="emailPhoneInputContainer errorM">
                  {/* email input */}
                  <div>
                    {errors.email && touched.email ? (
                      <div className="emailEmailErrorM">
                        <ErrorMessage name="email" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      className="input singUpEmailInput"
                      name="email"
                      placeholder="Email *"
                      type="text"
                    />
                  </div>
                  {/* phoneNumber input */}
                  <div>
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div className="phoneErrorM errorM">
                        <ErrorMessage name="phoneNumber" />
                      </div>
                    ) : (
                      <div className="errorHiddenDiv"></div>
                    )}
                    <Field
                      placeholder="Phone Number *"
                      className="input phoneInput"
                      name="phoneNumber"
                      type="text"
                    />
                  </div>
                </div>
                <button className="signUpLoginButton" type="submit">
                  Submit Registration
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
