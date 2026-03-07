import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const [token,setToken] = useState(null);

  useEffect(()=>{
    setToken(localStorage.getItem("token"));
  },[]);

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href="/";

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/">
          DarshanEase
        </Link>

        <div>

          <Link className="btn btn-light me-2" to="/temples">
            Temples
          </Link>

          {token && (

            <Link className="btn btn-success me-2" to="/dashboard">
              Dashboard
            </Link>

          )}

          {token && (

            <Link className="btn btn-warning me-2" to="/admin">
              Admin
            </Link>

          )}

          {!token && (

            <Link className="btn btn-primary me-2" to="/login">
              Login
            </Link>

          )}

          {!token && (

            <Link className="btn btn-info me-2" to="/register">
              Register
            </Link>

          )}

          {token && (

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;