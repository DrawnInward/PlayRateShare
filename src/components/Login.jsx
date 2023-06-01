import { useContext, useState } from "react";
import { getUsers } from "../apis";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [newLogin, setNewLogin] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    getUsers().then((users) => {
      users.forEach((user) => {
        if (user.username === newLogin) {
          setUser(user);
          navigate("/");
        }
      });
    });
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newLogin}
          onChange={(event) => {
            setNewLogin(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
