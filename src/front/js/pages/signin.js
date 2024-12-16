import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

export const Signin = () => {
  const { actions } = useContext(Context); 
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!user.email || !user.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await actions.login(user.email, user.password);

      if (response) {
        navigate("/loginSuccess"); 
      } else {
        setError("Por favor, intenta iniciar sesión de nuevo.");
      }
    } catch (error) {
      setError("Hubo un error al iniciar sesión.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      {error && (
        <div
          className="alert alert-danger mt-3"
          style={{
            backgroundColor: "#e3c1c4",
            color: "#61171e",
            borderColor: "#f5bfc5",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      <h2 className="mb-4 text-center">Inicio de Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Iniciar sesión
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/register" style={{ fontWeight: "bold", textDecoration: "none" }}>
          Regístrate aquí si aún no tienes cuenta
        </Link>
      </div>
    </div>
  );
};