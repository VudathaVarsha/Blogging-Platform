import React from "react";
import "../css/category.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewCatergoryComponent = ({ setCategory }) => {
  const navigate = useNavigate();
  const [cat, setCat] = useState([]);
  const [value, setValue] = useState();
  const [image, setImage] = useState();
  const data = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/categories/");
      setCat(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
  });
  const handleCategory = (cat) => {
    setCategory(cat);
    navigate("/cpost");
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/categories/",
        {
          name: value,
          photo: image,
        }
      );
      setImage("");
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="container mt-5 row justify-content-md-center align-items-md-center"
        style={{ gap: "50px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="container p-4 d-flex align-items-center justify-content-center" style={{gap:"10px"}}>
          <input
            placeholder="category name"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            placeholder="image url"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button onClick={() => handleClick()}>add</button>
        </div>
        {cat.map((category, index) => (
          <div
            className="card post col-md-auto p-5"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.8",
              backgroundImage: `url(${category.photo})`,
            }}
            onClick={() => {
              handleCategory(category.name);
            }}
          >
            <div className="card-body body">
              <h5
                className="card-title p-5"
                style={{ whiteSpace: "nowrap", marginLeft: "-17px" }}
              >
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCatergoryComponent;
