import { Link } from "react-router-dom";
import "../css/category.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryComponent = ({ setCategory }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const handleCategory = (cat) => {
    setCategory(cat);
    navigate("/cpost");
  };
  const data = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/categories/");
      setInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div
        className="container mt-5 row justify-content-md-center align-items-md-center"
        style={{ gap: "50px", marginLeft: "auto", marginRight: "auto" }}
      >
        {info.map((category, index) => (
          <div
            className="category-card"
            style={{
              backgroundImage: `url(${category.photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            key={index}
            onClick={() => {
              handleCategory(category.name);
            }}
          >
            <div className="category-text">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryComponent;
