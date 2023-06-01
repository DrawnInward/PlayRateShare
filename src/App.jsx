import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Nav from "./components/Nav";
import Homepage from "./components/Home";
import Comments from "./components/Comments";
import { createContext } from "react";
import Login from "./components/Login";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/reviews/:review_id" element={<Review />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:review_id/comments" element={<Comments />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
