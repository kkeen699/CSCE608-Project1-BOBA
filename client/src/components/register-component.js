import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import "./style.css";
import { useUser } from "../context/user-context";
// import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

const Register = () => {
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleRegister = () => {
    UserService.register(email, username, password)
      .then(() => {
        window.alert(
          "Registration succeeds. Please verify your email before login!"
        );
        navigate("/login");
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  useEffect(() => {
    if(user)
      navigate("/home", {replace: true});
  }, [user])

  return (
    <div style={{ padding: "3rem" }} className="register">
      <div className="screen-1">
        <center><span className="logo">Registration Portal</span></center>
        {message && <div className="alert alert-danger">{message}</div>}
        <br />
        <div className="username">
          <label htmlFor="username">Username</label>
          <div className="sec-2">
            <ion-icon name="person-circle-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeUsername}
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
        </div>
        <br />
        <div className="email">
          <label htmlFor="email">Email</label>
          <div className="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeEmail}
              type="text"
              name="email"
              placeholder="username@email.com"
            />
          </div>
        </div>
        <br />
        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangePassword}
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder=".........."
            />
            <ion-icon onClick={togglePassword} name={passwordShown ? "eye-outline" : "eye-off-outline"}></ion-icon>
          </div>
        </div>
        <br />
        <button className="registerButton" id="register" onClick={handleRegister}>Register</button>
        <br />
        <br />
        <div className="footer">
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
