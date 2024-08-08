import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/home.css";

const HomeComponent = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [authors, setAuthors] = useState({});

  const categoryImages = {
    travel: "https://e0.pxfuel.com/wallpapers/298/983/desktop-wallpaper-travel-around-world-travel-laptop-background-travel-and-tourism.jpg",
    food: "https://static.vecteezy.com/system/resources/thumbnails/021/939/720/small_2x/fast-food-set-hamburger-cheeseburger-cola-french-fries-burger-and-hamburger-ai-photo.jpg",
    health: "https://etimg.etb2bimg.com/thumb/103580468.cms?width=400&height=300",
    music: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEuhMn5PzmvIhYOtIO_pi73wgB_yH5L9IjOg&s",
    fitness: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbfDAWy8FhkWk5-3",
    motivation: "https://www.usatoday.com/gcdn/authoring/images/motleyfool/2023/11/05/U",
    others: "https://i.pngimg.me/thumb/f/720/comdlpng6938797.jpg",
    study: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=sr",
    cooking: "https://www.justwords.in/blog/wp-content/uploads/2020/10/indian-food-i"
  };

  const handlePosts = (id) => {
    navigate(`/post/${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/posts");
      const posts = response.data;
      setData(posts);

      // Fetch authors' details
      const authorIds = [...new Set(posts.map((post) => post.userId))];
      const authorDetails = await Promise.all(
        authorIds.map((id) => axios.get(`http://localhost:2000/api/users/${id}`))
      );
      const authorsMap = authorDetails.reduce((acc, { data }) => {
        acc[data._id] = data;
        return acc;
      }, {});
      setAuthors(authorsMap);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = data.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPostImage = (post) => {
    if (post.image) {
      return post.image;
    } else if (categoryImages[post.category.toLowerCase()]) {
      return categoryImages[post.category.toLowerCase()];
    }
    return "";
  };

  const getAuthorAvatar = (authorId) => {
    const author = authors[authorId];
    if (author && author.avatar) {
      return author.avatar;
    }
    return "https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"; 
  };

  return (
    <div className="content-section">
      <div className="banner">
        <img src="https://png.pngtree.com/background/20210710/original/pngtree-men-s-socks-promotion-fashion-simple-wind-activity-poster-banner-picture-image_1055689.jpg" alt="Banner" />
        <div className="banner-text">
          <h1>Your Stories</h1>
          <h2>Our Stage</h2>   
        </div>
      </div>
      <div className="all-posts">
        <div className="posts-container">
          {filteredPosts.map((post, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handlePosts(post._id)}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${getPostImage(post)})`,
                }}
              >
                <div className="card-category">{post.category}</div>
              </div>
              <div className="card-details">
                <div className="card-title">{post.title}</div>
                <div className="card-description">
                  {post.content.substring(0, 100)}...
                </div>
                {authors[post.userId] && (
                  <div className="card-author">
                    <img
                      src={getAuthorAvatar(post.userId)}
                      alt="author-avatar"
                      className="author-avatar"
                    />
                    <span>{authors[post.userId].username}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default HomeComponent;
