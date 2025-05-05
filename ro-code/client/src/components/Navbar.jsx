import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  // For dynamic sizing and content adjustments for sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img 
            src={logo}
            alt="ro jewelry logo" 
          />
        </Link>
        
        {/* Large screen view */}
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/shop?category=necklace">Necklaces</Link>
          <Link to="/shop?category=earrings">Earrings</Link>
          <Link to="/shop?category=bracelet">Bracelets</Link>
        </nav>

        {/* Smaller screen view - collapse to hamburger menu*/}
        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Hamburger menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/shop?category=necklace" 
            onClick={() => setIsMenuOpen(false)}
          >
            Necklaces
          </Link>
          <Link 
            to="/shop?category=earrings" 
            onClick={() => setIsMenuOpen(false)}
          >
            Earrings
          </Link>
          <Link 
            to="/shop?category=bracelet" 
            onClick={() => setIsMenuOpen(false)}
          >
            Bracelets
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;