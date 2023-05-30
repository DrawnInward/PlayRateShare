import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Reviews from "./components/Reviews";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
