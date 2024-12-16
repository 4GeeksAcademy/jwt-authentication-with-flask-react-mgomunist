import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; 
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {/* Botones */}
      <div className="mt-4">
        <Link to="/register">
          <button className="btn btn-primary mx-2">Regístrate</button>
        </Link>
        <Link to="/signin">
          <button className="btn btn-secondary mx-2">Inicia sesión</button>
        </Link>
      </div>
    </div>
  );
};
