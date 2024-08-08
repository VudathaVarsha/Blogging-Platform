import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../logo1.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/nav.css";

const NavbarComponent = ({ loggedIn, setSearchQuery }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleCategory = () => {
    navigate("/category");
  };

  const handleNewPost = () => {
    navigate("/newpost");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMyPosts = () => {
    navigate("/myposts");
  };

  const handleAllPosts = () => {
    navigate("/home");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="div2">
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary mynav"
          style={{ marginTop: "-10px" }}
        >
          <div
            className="container-fluid div1"
            style={{ backgroundColor: "hsl(265,26%,52%)" }}
          >
            <Link
              className="navbar-brand d-flex align-items-center"
              to="/"
              style={{ fontSize: "2rem" }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />{" "}
              Trivya
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className="nav-link btn m-3"
                    onClick={handleNewPost}
                    style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}
                  >
                    <i className="fa-light fa-solid fa-plus fa-lg "></i>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn m-3"
                    onClick={handleAllPosts}
                    style={{ fontSize: "1.5rem" }}
                  >
                    Posts
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn m-3"
                    onClick={handleCategory}
                    style={{ fontSize: "1.5rem" }}
                  >
                    Categories
                  </button>
                </li>
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </form>
              <ul
                className="my-3 d-flex"
                style={{ listStyle: "none", gap: "10px" }}
              >
                <li className="nav-item dropdown">
                  <button
                    className="btn col-lg-1 col-xs-1 div5 dropdown-toggle"
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="fa fa-user-circle"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                    <li>
                      <button className="dropdown-item" onClick={handleMyPosts}>
                        My Posts
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleProfile}>
                        Profile
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarComponent;
