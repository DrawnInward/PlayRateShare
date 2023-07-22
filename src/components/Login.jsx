import { useContext, useState } from "react";
import { authenticateUser, getUsers } from "../apis";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [newLogin, setNewLogin] = useState({ username: "", password: "" });

  const handleChange = (field, value) => {
    setNewLogin((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    authenticateUser(newLogin).then((response) => {
      console.log(response, "response!!!");
      setUser(response.user);
      setNewLogin({ username: "", password: "" });
      navigate(-1);
    });
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={newLogin.username}
          onChange={(event) => {
            handleChange("username", event.target.value);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          value={newLogin.password}
          onChange={(event) => {
            handleChange("password", event.target.value);
          }}
        />

        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
