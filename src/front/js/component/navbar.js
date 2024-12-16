import React, { useContext } from "react";
import { Context } from "../store/appContext"; 
import { Link, useNavigate } from "react-router-dom"; 

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (store.isAuthenticated) {
      actions.logout(); 
      navigate("/signin"); 
    } else {
      navigate("/signin");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sistema de Autenticación
        </Link>
        <button
          className="btn btn-outline-primary"
          onClick={handleButtonClick} 
        >
          {store.isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};
