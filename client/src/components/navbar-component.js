import React from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useUser } from "../context/user-context";
import "./style.css";

const NavBar = () => {
  const { user, setUser } = useUser();
  const handleLogout = () => {
    UserService.logout();
    window.alert("Logout Successfully, now you are redirected to the homepage.");
    setUser(UserService.isLogin());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-nav">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" style={{color:"#fff"}}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav">
              
              {/* before login */}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      BOBA
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
              
              {/* after login */}
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      BOBA
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      Fridge
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mylist">
                      Shopping Lists
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myrecipe">
                      My Recipe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recipes">
                      Recipe Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      Logout
                    </Link>
                </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;