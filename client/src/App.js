import React from 'react';
import { Container } from "@mui/material";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    {!user ? (
                        <Route path="/auth" element={<Auth />} />
                        ) : (
                        <Route path="/posts" element={<Navigate to="/" />} />
                    )}
                    {/* <Route path="/auth" element={() => (!user ? <Auth /> : <Navigate to="/posts" />)} /> */}
                    {/* <Route path="/auth" element={<Auth />} /> */}
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;