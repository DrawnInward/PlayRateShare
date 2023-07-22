import { useEffect, useState } from "react";
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
import Categories from "./components/Categories";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("current_user");
    if (loggedInUser !== null) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("current_user", JSON.stringify(user));
    }
  }, [user]);

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
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
