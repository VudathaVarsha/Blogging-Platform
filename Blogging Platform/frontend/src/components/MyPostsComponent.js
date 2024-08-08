import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/home.css"; // Reuse the CSS file

export default function MyPostsComponent({ userData, searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:2000/api/posts/post/${userData._id}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.myposts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [userData._id, isEditing]);

  const navigate = useNavigate();

  const handlePosts = (id) => {
    navigate(`/post/${id}`);
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setPostId(post._id);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    handleEditClick(post);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:2000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsEditing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = async (id) => {
    fetch(`http://localhost:2000/api/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setPosts(posts.filter((post) => post._id !== id));
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="content-section">
        <div className="all-posts">
          <h2>My Posts</h2>
          <div className="posts-container">
            {filteredPosts.map((post, index) => (
              <div className="card" key={index}>
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${post.image || "https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"})`,
                  }}
                >
                  <div className="card-category">{post.category}</div>
                </div>
                <div className="card-details">
                  <div className="card-title">{post.title}</div>
                  <div className="card-description">
                    {post.content.substring(0, 100)}...
                  </div>
                  
                  <div className="card-actions">
                    <button className="styled-button" onClick={() => handlePosts(post._id)}>
                      Read More
                    </button>
                    <button className="styled-button">
                      <i className="fa fa-heart"> {post.likes}</i>
                    </button>
                    <button className="styled-button">
                      <i className="fa fa-regular fa-comment fa-lg icon1">
                        &nbsp;{post.comments.length}
                      </i>
                    </button>
                    <button className="styled-button" onClick={() => handleEdit(post)}>
                      <i className="fas fa-pen-to-square fa-lg"></i>
                    </button>
                    <button className="styled-button" onClick={() => handleDelete(post._id)}>
                      <i className="fas fa-trash-alt fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditing && (
        <>
          <div className="blur-background" onClick={handleCloseClick}></div>
          <div className="modal-container">
            <button onClick={handleCloseClick} className="close-button">
              <i className="fa fa-thin fa-xmark fa-lg"></i>
            </button>
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
            <center>
              <button onClick={handleSaveClick} className="save-button">
                Save
              </button>
            </center>
          </div>
        </>
      )}
    </>
  );
}
