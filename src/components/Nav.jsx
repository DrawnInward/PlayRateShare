import { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { UserContext } from "../App";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    window.localStorage.removeItem("current_user");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li>
          <Link to="/" className="nav-li">
            Home
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="nav-li">
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/categories" className="nav-li">
            Categories
          </Link>
        </li>
        <div className="nav-login">
          {user ? (
            <>
              {" "}
              <li>
                <Link to="/login" onClick={handleSignOut} className="nav-login">
                  Sign out
                </Link>
              </li>
              <li>
                <img
                  src={user.avatar_url}
                  alt={`${user.username}'s profile picture`}
                />
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link to={"/login"} className="nav-li">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="nav-li">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
