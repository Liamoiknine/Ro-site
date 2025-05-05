import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts } from '../services/productService';

import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer"
import "../styles/Home.css";

// Images
import logo from "../assets/logo.png"
import landingImg from "../assets/landing_img_cropped.png"
import necklaceImage from "../assets/necklace.png";
import earringsImage from "../assets/earrings.png";
import braceletImage from "../assets/bracelet.png";
import Navbar from '../components/Navbar';

const BASE = process.env.REACT_APP_API_ENDPOINT_URL;

export default function Home() {
  const [featured, setFeatured] = useState([]); // Hold the data for featured items, to be passed ot HomeCard components
  const [navOpen, setNavOpen] = useState(false); // Track status of nav bar component for conditional rendering

  // Define data to be sent as props to HomeCard components
  const categoryOptions = [
    {
      title: "necklaces",
      image: necklaceImage,
      category: "necklace"
    },
    {
      title: "bracelets",
      image: braceletImage,
      category: "bracelet"
    },
    {
      title: "earrings",
      image: earringsImage,
      category: "earrings"
    }
  ];

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Listen for user scrolling an set navOpen state variable accordingly
  useEffect(() => {
    const onScroll = () => {
      setNavOpen(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Grab the first four products from the database on load. These will be featured. Store in featured state variable
  useEffect(() => {
    getProducts()
      .then(data => setFeatured(data.slice(0, 3)))
      .catch(err => console.error("Failed to fetch featured:", err));
  }, []);

  return (
    <>
      {navOpen && <Navbar></Navbar>}
      <div className="hero">
        <div className="hero-buttons">
          <Link to="/"><button>Home</button></Link>
          <Link to="/shop"><button>Shop</button></Link>
          <Link to="/shop?category=necklace"><button>Necklaces</button></Link>
          <Link to="/shop?category=bracelet"><button>Bracelets</button></Link>
          <Link to="/shop?category=earrings"><button>Earrings</button></Link>
        </div>
        <div className="underline"></div>
        <div className="hero-logo">
          <img src={logo} alt="ro logo" />
        </div>
        <div className="hero-img">
          <img src={landingImg} alt="landing image" />  
        </div>
        <div className="hero-text">
          <h1 className="first-h1"><span className="highlight">Decorate</span> your days.</h1>
          <h1 className="second-h1"><span className="highlight">Elevate</span> your nights.</h1>
          <Link to="/shop">
              <button>
                Shop Collection
              </button>
          </Link>
        </div>
 
      </div>

      <div id="sections">
        <div className="category-section">
          <h1>Shop by Category</h1>
          <div className="category-grid">
              {categoryOptions.map((category, index) => (
                <HomeCard
                  key={index}
                  title={category.title}
                  image={category.image}
                  path={`/shop?category=${category.category}`}
                />
              ))}
          </div>
          <Link to="/shop">
            <button className="categories-button">Shop All &rarr;</button>
          </Link>
        </div>

        {/* ← New Featured Pieces section → */}
        <div className="showcase-section">
          <h1>Featured Pieces</h1>
          <div className="showcase-grid">
            {featured.map(item => (
              <HomeCard
                key={item.id}
                id={item.id}
                image={`${BASE}${item.images[2]}`} alt={`${item.title} image`}
                title={item.title}
                price={`$${item.price.toFixed(2)}`}
                path={`/product/${item.id}`}
              />
            ))}
          </div>
          <Link to="/shop">
            <button className="products-button">View All Products &rarr;</button>
          </Link>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}