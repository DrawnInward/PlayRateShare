import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Reviews from "./components/Reviews";
import Nav from "./components/Nav";
import Homepage from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
