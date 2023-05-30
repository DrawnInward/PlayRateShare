import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Reviews from "./components/Reviews";
import Nav from "./components/Nav";
import Homepage from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </>
    </BrowserRouter>
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
