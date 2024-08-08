import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
function SignupComponent({ setUserData }) {
  const [input, setInput] = useState({
    // fullname: "",
    username: "",
    password: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [notavail, setNotavail] = useState(false);
  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
    general: "",
  });
  const navigate = useNavigate();

  const handleUsernameCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/users/name/${input.username}`
      );
      setNotavail(response.data.na);
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  const validateForm = async () => {
    let isValid = true;
    const errors = {
      username: "",
      password: "",
      email: "",
      avatar: "",
      general: "",
    };

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.username) {
      errors.username = "*Username is required";
      isValid = false;
    } else if (!usernameRegex.test(input.username)) {
      errors.username =
        "*Username can only contain letters, numbers, and underscores";
      isValid = false;
    } else if (input.username.length < 3 || input.username.length > 20) {
      errors.username = "*Username must be between 4 and 20 characters";
      isValid = false;
    } else {
      await handleUsernameCheck();
      // console.log(notavail);
      if (notavail) {
        errors.username = "*Username already exists";
        isValid = false;
      }
    }

    if (!input.password) {
      errors.password = "*Password is required";
      isValid = false;
    } else if (input.password.length < 8) {
      errors.password = "*Password must be at least 8 characters long";
      isValid = false;
    } else if (!passwordRegex.test(input.password)) {
      errors.password =
        "*Password must contain uppercase letter,\nlowercase letter,number, special character";
      isValid = false;
    }

    if (!input.email) {
      errors.email = "*Email is required";
      isValid = false;
    } else if (!emailRegex.test(input.email)) {
      errors.email = "*Invalid email address";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSignup = async (e) => {
    if (await validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:2000/api/auth/signup",
          {
            // fullname: user.fullname,
            username: input.username,
            password: input.password,
            email: input.email,
            bio: input.bio,
            avatar: input.avatar,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        // console.log(response);
        const token = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        setUserData(response.data.userData);
        navigate("/home");
      } catch (error) {
        console.log(error);
        setError((prevError) => ({
          ...prevError,
          general: "Error occurred during signup",
        }));
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup(e);
    }
  };

  return (
    <>
      <div className="body1">
        <div className="main1">
          <h1 className="subhead1">
            <b>Trivya</b>
          </h1>
          <div
            className="submain1"
            style={{
              boxShadow:
                "0px -4px 8px hsl(256, 26%, 52%), -4px 0px 8px hsl(256, 26%, 52%), 4px 0px 8px hsl(256, 26%, 52%)",
            }}
          >
            <h2 className="mt-4">Sign Up</h2>
            {/* <div>
              <label htmlFor="exampleInputFullname" className="form-label">
                Fullname
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control"
                id="exampleInputFullname"
                // name="fullname"
                // value={input.fullname}
                // onChange={onValueChange}
              />
            </div> */}
            <div className="container" style={{ width: "70%" }}>
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                name="username"
                value={input.username}
                onChange={onValueChange}
              />
              {error.username && (
                <div className="text-danger">{error.username}</div>
              )}
            </div>
            <div className="container mt-3" style={{ width: "70%" }}>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={input.password}
                onChange={onValueChange}
              />
              {error.password && (
                <div className="text-danger" style={{ whiteSpace: "pre-line" }}>
                  {error.password}
                </div>
              )}
            </div>
            <div className="container mt-3" style={{ width: "70%" }}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={input.email}
                onChange={onValueChange}
              />
              {error.email && <div className="text-danger">{error.email}</div>}
            </div>
            <div className="container mt-3" style={{ width: "70%" }}>
              <label htmlFor="exampleInputBio" className="form-label">
                Bio
              </label>
              <textarea
                cols="30"
                className="form-control"
                id="exampleInputBio"
                name="bio"
                value={input.bio}
                onChange={onValueChange}
              ></textarea>
            </div>
            <div className="container mt-3" style={{ width: "70%" }}>
              <label htmlFor="exampleInputAvatar" className="form-label">
                Avatar
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAvatar"
                name="avatar"
                value={input.avatar}
                onKeyPress={handleKeyPress}
                onChange={onValueChange}
              />
            </div>
            <button
              type="submit"
              className="btn text-white mt-3"
              style={{ backgroundColor: "hsl(256,26%,52%)" }}
              onClick={handleSignup}
            >
              Signup
            </button>
            {error.general && (
              <div className="text-danger">{error.general}</div>
            )}
            <div className="mb-5">
              Already have an account?<Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;
