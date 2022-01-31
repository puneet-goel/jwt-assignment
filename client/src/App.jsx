import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { authenticate } from "./api";

const App = () => {
    
    const [isUserValid, setUserValid] = useState(false);
    useEffect( () => {
        (async () => {
            const x = await authenticate();
            setUserValid(x);
        })()
    },[]);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ isUserValid?<Home /> : <Navigate to='/login' /> } />
                <Route path="/login" element={ isUserValid?<Navigate to='/' /> : <Login setUserValid={setUserValid} /> } />
                <Route path="/*" element={ <Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
