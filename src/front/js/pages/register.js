import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 
import { Link, useNavigate } from "react-router-dom"; 

export const Register = () => {
  const { actions } = useContext(Context); 
  const navigate = useNavigate(); 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError("Faltan datos por completar.");
      return;
    }

    setError("");

    const success = await actions.register(name, email, password);

    if (success) {
      navigate("/signin"); 
    } else {
      setError("No se pudo registrar el usuario."); 
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mb-3">
        <label className="form-label fw-bold">Nombre</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name} 
          type="text"
          className="form-control"
          placeholder="Nombre"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Correo Electrónico</label>
        <input
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email"
          className="form-control"
          placeholder="Ingrese su email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Contraseña</label>
        <input
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          type="password"
          className="form-control"
          placeholder="Ingrese su contraseña"
        />
      </div>

      <button onClick={handleSubmit} type="button" className="btn btn-primary me-3">
        Registrar
      </button>

      <Link to="/">
        <button className="btn btn-secondary">Volver al inicio</button>
      </Link>
    </div>
  );
};