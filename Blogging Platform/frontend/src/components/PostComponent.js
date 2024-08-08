import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import "../css/post.css";
import deleteComment from "../images/image.png";
import "font-awesome/css/font-awesome.min.css";

const PostComponent = ({ userData }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState({});
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState(false);
  const params = useParams();
  const commentsRef = useRef(null);

  const token = JSON.parse(localStorage.getItem("token")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleBlog = async () => {
    if (!params.id) {
      console.log("params.id is not defined");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:2000/api/posts/${params.id}`,
        config
      );
      setPost(response.data);
      setLiked(response.data.likedByUser);

      handleUser(response.data.userId);
      const res = await axios.get(
        `http://localhost:2000/api/posts/comments/${params.id}`,
        config
      );
      setComments(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Error fetching blog data:", err);
    }
  };
  const scrollToComments = () => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleUser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/users/${id}`,
        config
      );
      setAuthor(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await axios.post(
          `http://localhost:2000/api/posts/unlike/${params.id}`,
          {},
          config
        );
        setPost((prevPost) => ({
          ...prevPost,
          likes: prevPost.likes - 1,
        }));
      } else {
        await axios.post(
          `http://localhost:2000/api/posts/like/${params.id}`,
          {},
          config
        );
        setPost((prevPost) => ({
          ...prevPost,
          likes: prevPost.likes + 1,
        }));
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };
  
  const handleComment = async () => {
    try {
      await axios.post(
        `http://localhost:2000/api/posts/comments/${params.id}`,
        {
          userName: userData.username,
          content: input,
          createdAt: new Date().toISOString(),
        },
        config
      );
      setInput("");
      handleBlog(); 
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:2000/api/posts/comments/${params.id}/${id}`,
        config
      );
      console.log(res.data);
      setComments(comments.filter((comm) => comm._id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    handleBlog();
  }, []);

  return (
    <div className="container d-flex flex-column p-3">
      <div className="post-header mb-4 d-flex justify-content-between align-items-center">
        <div className="post-info">
          <img
                src= "https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"
                alt={author.username}
                className="author-avatar"
          /> 
          &nbsp;&nbsp;<span style={{fontSize:"25px"}}><b>{author.username}</b></span><br/><br/>
          <h3 className="post-title">{post.title}</h3>
        </div>
        <div className="likes-comments-count">
          <p className="post-meta">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLikeToggle}
          >
            ❤️{post.likes}
           
          </button>
          <button
            className="comments-button"
            onClick={scrollToComments}
          >
            <i className='far fa-comment-dots' style={{fontSize:"24px"}}></i> {comments.length}
          </button>
        </div>
       </div>
      <figure className="figure text-center">
        <img
          src={post.image || "https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"}
          className="figure-img img-fluid rounded"
          alt="..."
          style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
        />
        <figcaption className="figure-caption mt-4" style={{ fontSize: "20px" }}>
          {post.content}
        </figcaption>
      </figure>
      <div
        className="container commentBox p-3 d-flex justify-content-center align-items-center"
        style={{ gap: "20px" }}
      >
        <textarea
          rows="2"
          placeholder="Type your thoughts here..."
          value={input}
          className="comm"
          onChange={(e) => setInput(e.target.value)}
          style={{ border: "1px solid  rgba(0, 0, 0, 0.1)", width: "75%" }}
        ></textarea>
        <button
          className="btn btn-info"
          onClick={() => {
            handleComment();
          }}
        >
          Comment
        </button>
      </div>
      <div ref={commentsRef} className="container d-flex flex-column" style={{ gap: "20px" }}>
        {comments.map((comm, index) => (
          <div
            className="container"
            style={{ border: "1px solid rgba(0, 0, 0, 0.1)",backgroundColor:"white" }}
            key={index}
          >
            <div className="container commentBox p-2 d-flex align-items-center">
              <img
                src="https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"
                className="img img-fluid"
                alt="..."
                style={{ borderRadius: "50%", width: "30px" }}
              />
              <p className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                {comm.userName}
              </p>
              
              <button
                disabled={!(userData._id === comm.userId)}
                onClick={() => handleDelete(comm._id)}
                style={{
                  marginLeft: "auto",
                  border: "none",
                  background: "none",
                }}
              >
                <img
                  src={deleteComment}
                  alt="deleteComment"
                  width={"20px"}
                  height={"20px"}
                />
              </button>
            </div>
            <div className="container">
              <p style={{ fontSize: "15px" }}>{comm.content}</p>
              <span className="ml-2" style={{ fontSize: "13px",color:"GrayText",marginRight:"auto" }}>
                {new Date(comm.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostComponent;