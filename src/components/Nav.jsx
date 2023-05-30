import { Link } from "react-router-dom";

const Nav = () => {
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
      </ul>
    </nav>
  );
};

export default Nav;
