import { useContext } from "react";
import { UserContext } from "../App";

const Homepage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <h1>Welcome {user ? user.username : "Guest. Please sign in"}</h1>
    </div>
  );
};

export default Homepage;
