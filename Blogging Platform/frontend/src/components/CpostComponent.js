import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';
import 'font-awesome/css/font-awesome.min.css';

const CpostComponent = ({ category }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [authors, setAuthors] = useState({});
    const [like, setLike] = useState({});

    const handlePosts = (id) => {
        navigate(`/post/${id}`);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/categories/${category}`);
            const posts = response.data;
            setData(posts);

            const userIds = posts.map(post => post.userId);
            const userResponses = await Promise.all(userIds.map(id => axios.get(`http://localhost:2000/api/users/${id}`)));
            const authorsMap = userResponses.reduce((acc, { data }, index) => {
                acc[userIds[index]] = data;
                return acc;
            }, {});
            setAuthors(authorsMap);

            const likeStates = posts.reduce((acc, post) => {
                acc[post._id] = post.likedByUser;
                return acc;
            }, {});
            setLike(likeStates);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const handleLike = async (id) => {
        if (like[id]) {
            await axios.post(`http://localhost:2000/api/posts/unlike/${id}`);
            setLike((prevLike) => ({ ...prevLike, [id]: false }));
        } else {
            await axios.post(`http://localhost:2000/api/posts/like/${id}`);
            setLike((prevLike) => ({ ...prevLike, [id]: true }));
        }
    };

    const getPostImage = (post) => {
        if (post.image) {
            return post.image;
        }
        return "";
    };

    const getAuthorAvatar = (authorId) => {
        const author = authors[authorId];
        if (author && author.avatar) {
            return author.avatar;
        }
        return "https://pbs.twimg.com/media/GBMkWGbbUAA6zvs.jpg"; // Fallback avatar
    };

    return (
        <div className="content-section">
            <div className="all-posts">
                <h2>{category}</h2>
                <div className="posts-container">
                    {data.map((post, index) => (
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
                                {/* <div className="card-category">{post.category}</div> */}
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
                                <div className="card-actions">
                                    <button className="btn like-button" onClick={() => handleLike(post._id)}>
                                        <i className={`fa ${like[post._id] ? 'fa-heart' : 'fa-heart-o'} icon fa-lg`}> {post.likes}</i>
                                    </button>
                                    <button className="btn comment-button">
                                        <i className="fa fa-comment fa-lg icon1"> {post.comments.length}</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CpostComponent;
