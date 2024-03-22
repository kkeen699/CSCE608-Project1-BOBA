import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user-context";
import "./style.css";
const BobaHome = () => {
  const {user, setUser} = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if(user)
      navigate("/home", {replace: true});
  }, [user, navigate])
  
  return (
    <main>
      <div className="container py-4">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Better Organized, Better Appetites</h1>
          <p>
            Do you often forget what you've purchased until it's already expired? 
            Do you frequently recall items you need only after returning home without them? 
            Are you often unsure of what to eat despite spending considerable time deciding? 
            If so, BOBA is an excellent solution to meet all your needs.
          </p>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h3>Manage Your Fridge</h3>
              <p>
                You can easily record ingredients and track their expiration dates in your fridge.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h3>Create Shopping Lists</h3>
              <p>
                You have the flexibility to create multiple shopping lists to help you remember what you need.
              </p><br />
            </div>
          </div>
          <div className="col-md-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h3>Explore Recipes</h3>
              <p>
                You can discover and try a wide range of recipes from different cuisines globally. Additionally, you can share your favorite dishes with others.
              </p><br />
            </div>
          </div>
          
          <p className="mt-2">
            This website is for practice purpose only, 
            so please do not provide any personal information, such as credit card numbers.
          </p>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024 Cheng-Yun Cheng
        </footer>
      </div>
    </main>
  );
};

export default BobaHome;