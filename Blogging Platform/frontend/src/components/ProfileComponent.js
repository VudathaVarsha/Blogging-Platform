import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile({ userData, setUserData, loggedIn }) {
  const [email, setEmail] = useState(userData.email);
  const [uname, setUname] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("Edit");
  const [save, setSave] = useState(false);
  const [likes, setLikes] = useState(0);
  const [posts, setPosts] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:2000/api/posts/post/${userData._id}`)
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likes);
        setPosts(data.posts);
      });
  }, []);
  useEffect(() => {
    if (save) {
      const data = {
        uid: userData._id,
        email,
        username: uname,
        bio: bio,
      };
      setUserData(data);
      fetch(`http://localhost:2000/api/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSave(false);
        })
        .catch((err) => {
          console.log("Some Error occurred", err);
        });
    }
  }, [save, email, uname, bio]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setUname(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleEdit = () => {
    if (edit) {
      setSave(true);
    }
    setEdit(!edit);
    setText(edit ? "Edit" : "Save");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    loggedIn(false);
    navigate("/login");
  };
  const handlePosts = () => {
    navigate("/myposts");
  };
  return (
    <div className="container p-5">
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{
          border: "2px solid hsl(265,26%,52%)",
          width: "500px",
          borderRadius: "5%",
          backgroundColor:"whitesmoke"
        }}
      >
        <h1 className="text-center my-5" style={{ color: "hsl(265,26%,52%)" }}>
          Profile
        </h1>
        <div className="form-floating mb-3 d-flex" style={{ gap: "20px" }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={uname}
            onChange={handleNameChange}
            disabled={!edit}
            style={{ width: "25rem" }}
          />
          <label htmlFor="floatingInput" style={{ color: "hsl(265,26%,52%)" }}>
            Username
          </label>
        </div>
        <div className="form-floating m-3" style={{ gap: "20px" }}>
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            value={email}
            onChange={handleEmailChange}
            disabled={!edit}
            style={{ width: "25rem" }}
          />
          <label htmlFor="floatingInput" style={{ color: "hsl(265,26%,52%)" }}>
            Email address
          </label>
        </div>

        <div className="form-floating m-3 d-flex" style={{ gap: "20px" }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={bio}
            onChange={handleBioChange}
            disabled={!edit}
            style={{ width: "25rem" }}
          />
          <label htmlFor="floatingInput" style={{ color: "hsl(265,26%,52%)" }}>
            Bio
          </label>
        </div>
        <div
          className="container m-3 d-flex justify-content-center align-items-center p-3"
          style={{ gap: "72px", flexWrap: "wrap" }}
        >
          <div
            className="card  bg-body-tertiary rounded"
            style={{ width: "10rem", height: "6rem" }}
          >
            <div className="card-body ">
              <h5 className="card-title" style={{ color: "hsl(265,26%,52%)" }}>
                posts
              </h5>
              <p className="card-text my-1">{posts}</p>
            </div>
          </div>
          <div
            className="card bg-body-tertiary rounded"
            style={{ width: "10rem", height: "6rem" }}
          >
            <div className="card-body ">
              <h5 className="card-title" style={{ color: "hsl(265,26%,52%)" }}>
                likes
              </h5>
              <p className="card-text my-1">{likes}</p>
            </div>
          </div>
        </div>
        <div
          className="container p-3 my-3 d-flex justify-content-center align-content-center"
          style={{
            gap: "25px",
            width: "rem",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={handleEdit}
            style={{ backgroundColor: "hsl(265,26%,52%)" }}
          >
            {text}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleLogout}
            style={{ backgroundColor: "hsl(265,26%,52%)" }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
