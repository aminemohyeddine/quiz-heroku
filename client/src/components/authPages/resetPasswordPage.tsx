import React, { useState } from "react";
import "./resetPasswordPage.css";

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };
  return (
    <div className="resetPageContainer">
      <div className="resetItemsContainer">
        <h1>Reset Password</h1>
        <input
          className="mailInput"
          onChange={changeEmailHandler}
          placeholder="Enter email *"
          type="text"
        />

        <p>We'll never share your email with anyone else</p>
        <button className="submitResetButton">Submit</button>
      </div>
    </div>
  );
};
