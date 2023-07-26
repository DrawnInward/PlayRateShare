import { useNavigate } from "react-router-dom";
import { getSingleUser, postUser } from "../apis";
import { UserContext } from "../App";
import { useContext, useState } from "react";

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const [newSignUp, setNewSignUp] = useState({
    username: "",
    password: "",
    name: "",
    avatar_url: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleChange = (field, value) => {
    setNewSignUp((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const navigate = useNavigate();

  function handlePasswordValidation() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*]).{8,}$/;

    if (newSignUp.password === "") {
      setErrors((currErrors) => ({
        ...currErrors,
        password: "Password is required!",
      }));
    } else if (!passwordRegex.test(newSignUp.password)) {
      setErrors((currErrors) => ({
        ...currErrors,
        password:
          "Password must contain at least 8 characters, including one uppercase letter and one letter or symbol",
      }));
    } else if (confirmPassword == !newSignUp.password) {
      setErrors((currErrors) => ({
        ...currErrors,
        password: "Passwords must match",
      }));
    } else {
      setErrors((currErrors) => {
        delete currErrors.password;
        return { ...currErrors };
      });
    }
  }

  function handleNameValidation() {
    if (newSignUp.name === "") {
      setErrors((currErrors) => ({
        ...currErrors,
        name: "First Name is required!",
      }));
    } else {
      setErrors((currErrors) => {
        delete currErrors.name;
        return { ...currErrors };
      });
    }
  }

  function handleAvatarURLValidation() {
    const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/i);

    if (!urlRegex.test(newSignUp.avatar_url)) {
      setErrors((currErrors) => ({
        ...currErrors,
        avatar_url: "Invalid URL! Please enter a valid URL for the avatar.",
      }));
    } else {
      setErrors((currErrors) => {
        delete currErrors.avatar_url;
        return { ...currErrors };
      });
    }
  }

  const checkUsername = (username) => {
    getSingleUser(username).then((response) => {
      if (response) {
        setErrors((currErrors) => ({
          ...currErrors,
          username: "This username is already taken, please choose another.",
        }));
      } else {
        setErrors((currErrors) => {
          delete currErrors.username;
          return { ...currErrors };
        });
      }
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    handlePasswordValidation();
    handleNameValidation();
    handleAvatarURLValidation();
    if (Object.keys(errors).length === 0) {
      postUser(newSignUp).then((response) => {
        setUser(response);
        setNewSignUp({
          username: "",
          password: "",
          confirmPassword: "",
          name: "",
          avatar_url: "",
        });
        navigate("/reviews");
      });
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={newSignUp.username}
          onBlur={() => checkUsername(newSignUp.username)}
          onChange={(event) => {
            handleChange("username", event.target.value);
          }}
        />
        {errors.username && (
          <span className="error-text">{errors.username}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          value={newSignUp.password}
          onChange={(event) => {
            handleChange("password", event.target.value);
          }}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="text"
          value={newSignUp.confirmPassword}
          onChange={(event) => {
            handleConfirmPassword(event.target.value);
          }}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={newSignUp.name}
          onChange={(event) => {
            handleChange("name", event.target.value);
          }}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
        <label htmlFor="Avatar URL">Avatar URL</label>
        <input
          id="Avatar URL"
          type="text"
          value={newSignUp.avatar_url}
          onChange={(event) => {
            handleChange("avatar_url", event.target.value);
          }}
        />
        {errors.avatar_url && (
          <span className="error-text">{errors.avatar_url}</span>
        )}

        <button>Submit</button>
      </form>
    </>
  );
}
