import axios from "axios";
import { useState } from "react";
import "../css/newpost.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPostComponent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [opt, setOpt] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /*const checkDuplicatePost = async () => {
    try {
      const response = await axios.get(
        http://localhost:2000/api/posts/check-duplicate,
        {
          params: {
            title,
            content,
            category,
          },
        }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking duplicate post:", error);
      return true;
    }
  };*/

  const validate = () => {
    const titleRegex = /^.{2,50}$/;
    const contentRegex = /^.{5,2000}$/;
    const imageRegex = /\.(jpg|jpeg|png)$/i;

    if (!title) {
      setError("*Title must be provided.");
      return false;
    } else if (!titleRegex.test(title)) {
      setError("*Title must be between 2 and 100 characters.");
      return false;
    }

    if (!content) {
      setError("*Content must be provided.");
      return false;
    } else if (!contentRegex.test(content)) {
      setError("*Content must be between 5 and 1000 characters.");
      return false;
    }

    if (image && !imageRegex.test(image.name)) {
      setError("*Image must be a jpg, jpeg, or png file.");
      return false;
    }

    if (!category) {
      setError("*Category must be selected.");
      return false;
    }

    setError("");
    return true;
  };

  const options = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/categories/");
      setOpt(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    options();
  });

  const handlePost = async () => {
    if (validate()) {
      /*const isDuplicate = await checkDuplicatePost();
      if (isDuplicate) {
        setError("*Duplicate post found. Please modify your post.");
      } 
      else {*/
      try {
        await axios
          .post(
            `http://localhost:2000/api/posts`,
            {
              title: title,
              content: content,
              tags: tags.split(","),
              category: category,
              createdAt: new Date().toISOString().split("T")[0],
            },
            config
          )
          .then((response) => {
            console.log(response.data);
          });
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
      //}
    }
  };

  return (
    <>
      <div className="new-post-container"
           style={{backgroundColor:"whitesmoke"}}
      >
        <br />
        <div className="container ">
          <h2
            className="title-header "
            style={{ color: "hsl(256,26%,52%)", marginLeft: "0px" }}
          >
            Create a New Post
          </h2>
          <br />
          <select
            className="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {opt.map((option, index) => (
              <option value={option.name}>{option.name}</option>
            ))}
            {/* <option value="music">music</option>
            <option value="health">health</option>
            <option value="travel">travel</option>
            <option value="fitness">fitness</option>
            <option value="food">food</option>
            <option value="motivation">motivation</option> */}
          </select>
          <br />
          <br />
          <input
            placeholder="Write the title of your post..."
            type="text"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            placeholder="Write the content of your post..."
            className="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Add tags (separated by commas)..."
            type="text"
            className="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <br />
          <br />

          <br />
          <button
            className="submit-btn"
            onClick={handlePost}
            style={{ marginBottom: "10px" }}
          >
            Add Post
          </button>
          {error && (
            <div
              className="error"
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPostComponent;
