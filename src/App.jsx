import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Nav from "./components/Nav";
import Homepage from "./components/Home";
import Comments from "./components/Comments";
import Categories from "./components/Categories";

function App() {
  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:review_id/comments" element={<Comments />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
