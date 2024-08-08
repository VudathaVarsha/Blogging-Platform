import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

function LoginComponent({ setUserData, userData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const pref = useRef(null);

  const onNameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    // e.preventDefault();
    setIsError(false);
    try {
      const userlogin = await axios.post(
        "http://localhost:2000/api/auth/login",
        { username, password }
      );
      // console.log(userlogin);
      localStorage.setItem("token", JSON.stringify(userlogin.data));
      setUserData(userlogin.data.userData);
      navigate("/home");
    } catch (error) {
      setIsError(true);
      // console.log(error)
      setError(error.response.data.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "floatingInput") {
        pref.current.focus();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <>
      <div className="body1">
        <div className="container justify-content-center align-items-center p-5">
          <h1 className="mb-5 text-center" style={{ fontSize: "4rem" }}>
            <b>Trivya</b>
          </h1>
          <div
            className="container justify-content-center align-items-center p-5"
            style={{
              boxShadow:
                "0px -4px 8px hsl(256, 26%, 52%), -4px 0px 8px hsl(256, 26%, 52%), 4px 0px 8px hsl(256, 26%, 52%)",
              // border: "2px solid black",
              backgroundColor: "white",
              width: "500px",
              margin: "auto",
              marginTop: "10%",
              borderRadius: "18px",
            }}
          >
            <h2 className="p-4 text-center">Login</h2>
            <div className=" container justify-content-center align-items-center">
              <div className="form-floating" style={{ marginTop: "20px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="username"
                  onChange={onNameChange}
                  onKeyPress={handleKeyPress}
                  style={{ width: "100%" }}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating" style={{ marginTop: "40px" }}>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="password"
                  onChange={onPassChange}
                  onKeyPress={handleKeyPress}
                  ref={pref}
                  style={{ width: "100%" }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </div>
            <div
              className="container d-flex flex-column justify-content-center align-items-center p-4"
              style={{ gap: "20px" }}
            >
              <button
                type="submit"
                className="btn text-white mt-2"
                style={{ backgroundColor: "hsl(256,26%,52%)" }}
                onClick={handleLogin}
              >
                Login
              </button>
              {isError && <div className="err text-danger">{error}</div>}
              <div className="mb-4">
                Create an account?<Link to="/signup">Signup</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
