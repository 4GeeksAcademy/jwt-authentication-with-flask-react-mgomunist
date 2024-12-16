import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signin } from "./pages/signin";
import { Register } from "./pages/register";
import { LoginSuccess } from "./pages/loginSuccess";
import ProtectedRoute from "./component/protectedRoute";

const Layout = () => {
    // Verifica si la URL del backend está definida
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <div>
            <BrowserRouter>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Ruta protegida con ProtectedRoute */}
                        <Route
                            path="/loginsuccess"
                            element={
                                <ProtectedRoute>
                                    <LoginSuccess />
                                </ProtectedRoute>
                            }
                        />
                        
                        {/* Ruta para página no encontrada */}
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
