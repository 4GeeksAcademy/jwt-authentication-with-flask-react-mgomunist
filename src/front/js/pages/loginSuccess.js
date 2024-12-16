import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const LoginSuccess = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate('/loginSuccess');
    }
  }, [store.token, navigate]);

  return (
    <div className="container">
      <h1>Bienvenido, iniciaste sesión correctamente</h1>
    </div>
  );
};