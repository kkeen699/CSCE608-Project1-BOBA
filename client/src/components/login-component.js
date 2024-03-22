import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import { useUser } from "../context/user-context";
import "./style.css";
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

const Login = (props) => {
  const {user, setUser} = useUser();
	const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = () => {
    UserService.login(email, password)
      .then((response) => {
        /// jwt in local storage
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert(
          "Login successfully, you are now redirected to the home page."
        );
        // props.setLoginState(UserService.isLogin());
        setUser(UserService.isLogin());
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  useEffect(() => {
    if(user)
      navigate("/home", {replace: true});
  }, [user])


  return (
    <div style={{ padding: "3rem" }} className="login">
      	<div className="screen-1">
		  	{message && ( <div className="alert alert-danger" role="alert">{message}</div>)}
        	<center><span className="logo">Login Portal</span></center>
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
			<button className="loginButton" id="login" onClick={handleLogin}>Login</button>
			<br />
			<br />
			<div className="footer">
				<a href="/register">Register</a>
			</div>
		</div>
    </div>
  );
};

export default Login;