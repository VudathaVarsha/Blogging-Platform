import { useNavigate } from "react-router-dom";
import "../css/Index.css";
import logo from "../logo1.jpeg";
import { Link } from "react-router-dom";
const IndexComponent = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="buttonttransition">
        <header className="row d-flex justify-content-center">
          <div className="col-sm-10">
            <Link
              className="navbar-brand d-flex align-items-center"
              to="/"
              style={{ fontSize: "2rem" }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "60px", height: "60px", marginRight: "10px" }}
              />{" "}
              Trivya
            </Link>
          </div>
          <div className="col-sm-2 ">
            <button
              className="btn border button"
              style={{ background: "azure", whiteSpace: "nowrap" }}
              onClick={() => handleSignup()}
            >
              Sign Up
            </button>
            <button
              className="btn border button"
              style={{ background: "azure" }}
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </header>
        <main className="vh-100">
          <div className="h-50 d-flex justify-content-center align-items-center ">
            <header className="text-center">
              <h2 style={{ fontSize: "50px", margin: "25px" }}>
                Publish your passions, your way
              </h2>
              <p>Create a unique and beautiful blog easily.</p>
              <button
                style={{ backgroundColor: "pink" }}
                className="btn btn-default btn-lg"
                onClick={() => handleLogin()}
              >
                Create your blog
              </button>
              <br />
              <br />
              <h5>
                <i>Your Stories,Our Stage</i>
              </h5>
              <div className="image-container">
                <img
                  src="//blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEiK1bg4XfMF6LpnhoSTf6dcgeylACww9wUQhlhGAdQjjqnUlWC0GXgWjZbOcruZPsK1rzjeK6H5dA51o8QkQITOy-38BPmF2ExSMbvrV-OHsmbydI_ZRbUrAGNtY8RfFdnmwDEpE_gfFY4oZL0DZOYWjdvmLANqo2_0/d"
                  alt="Letter C"
                  sizes="(min-width: 37.5rem) 7vw, 21vw"
                />
                <img
                  src="//blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEjC8IO7HZVGjXqEfGjcPiVmR3i9QDeCtRGAPFnErcn-wvhboI5w9PQrjtbsR79X5rUIEx56Gl3-v78Ol1q2wGkLUX5I6ffdGgvNEBSHy4cvmWEGQcp2qgvfL6HgPE9XefS1n8GYQEhj5uuunrqpDZCZkNk6Wfo5K6Q/d"
                  alt="Picture"
                  className="img1"
                  sizes="(min-width: 37.5rem) 17vw, 55vw"
                />

                <img
                  src="//blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEj3E1zSPGxlpcPhsB6WUwHISjHA75YSp02JQM-_WQqL3sp_ObxK5N_CqYqMQD3EUowAP56RZnGysFBXjXssbaLfcRbn8V4ThKkupA_ercobdLutc3i1dAS9iWzaDxceCGbiRPBV5JXEV-llckffPHTKShZ-IEENGaI/d"
                  alt="Slipper"
                  className="img2"
                  sizes="15vw"
                />

                <img
                  src="//blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEiyQ6GtlXVOmmMLLo_DBHN1okIk17WLxfB2vcHB6_1KHxz-6wCUdRSNWjcZe5gPIKSIblqQ0zqopBWzdtqE-wggkvDJ89hkUYmLF4heuGdwQIuDqwWKExzgGcoq7GXulTZhYzu8che7grqDOuMFtaZW4xYzbtY/d"
                  alt="Family Blog"
                  sizes="(min-width: 75rem) 55vw, (min-width: 60rem) 60vw, 70vw"
                ></img>
                <img
                  src="//blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEg6b9HYDw0uzUmPaQHqVgsxw8qQRyOQR9ISk08SdD1N3iCzsKcbjpcSwML4OC971VwMt3mHMYqRSHZCcOuN4b7TmJ_Ga98yrfRnicKXRzSnQXyLs56qsfALYcHoubbVVqItIlRXGdfVJDyanhrYJ66WsDQnIwQ/d"
                  className="vase"
                  alt="Vase"
                  sizes="21vw"
                />
              </div>
            </header>
          </div>
        </main>
      </div>
    </>
  );
};

export default IndexComponent;
