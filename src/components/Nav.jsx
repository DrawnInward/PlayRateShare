import { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { UserContext } from "../App";

const Nav = () => {
  const { user } = useContext(UserContext);

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
          <Link to="/login" className="nav-login">
            {user ? (
              <>
                <img
                  src={user.avatar_url}
                  alt={`${user.username}'s profile picture`}
                />
              </>
            ) : (
              <span>Login</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/categories" className="nav-li">
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
