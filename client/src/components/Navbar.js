import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeNavbar();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Brand - Left Side */}
        <Link className="navbar-brand fw-bold text-white" to="/" onClick={closeNavbar}>
          Darshan Ease
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links - Right Side */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/temples" onClick={closeNavbar}>
                <i className="fas fa-search me-1"></i>
                Temples
              </Link>
            </li>
          </ul>

          {/* Auth Buttons - Right Side */}
          <div className="d-flex align-items-center ms-3">
            {!isAuthenticated() ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/login" onClick={closeNavbar}>
                  Login
                </Link>
                <Link className="btn btn-light" to="/register" onClick={closeNavbar}>
                  register
                </Link>
              </>
            ) : (
              <>
                {/* Authenticated User Actions */}
                <Link
                  className="btn btn-outline-light me-2"
                  to="/dashboard"
                  onClick={closeNavbar}
                >
                  My Bookings
                </Link>

                {user && user.role === "admin" && (
                  <Link
                    className="btn btn-info me-2"
                    to="/admin"
                    onClick={closeNavbar}
                  >
                    Admin
                  </Link>
                )}

                {user && user.role === "organizer" && (
                  <Link
                    className="btn btn-warning me-2"
                    to="/organizer"
                    onClick={closeNavbar}
                  >
                    Organizer
                  </Link>
                )}

                <button
                  className="btn btn-outline-danger me-2"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Logout
                </button>

                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>
                    {user?.name || 'User'} ({user?.role === 'admin' ? 'Admin' : user?.role === 'organizer' ? 'Organizer' : 'User'})
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <h6 className="dropdown-header">
                        <i className="fas fa-user me-1"></i>
                        {user?.name}
                      </h6>
                    </li>
                    <li>
                      <span className="dropdown-item-text small text-muted">
                        Role: {user?.role === 'admin' ? 'Admin' : user?.role === 'organizer' ? 'Temple Organizer' : 'Devotee'}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-1"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;