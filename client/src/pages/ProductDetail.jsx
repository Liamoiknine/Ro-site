// ProductDetail.jsx

import { useState, useEffect } from 'react';
import { useParams }          from 'react-router-dom';
import { getProduct }         from '../services/productService';
import '../styles/ProductDetail.css';
import Layout from '../components/Layout';
import { Link } from "react-router-dom";


export default function ProductDetail() {
  const { id } = useParams(); // id of current product being viewed
  const [product, setProduct] = useState(null); // all info about the product being presented
  const [selectedImage, setSelectedImage] = useState(''); // track which image is currently being displayed
  const [category, setCategory] = useState(''); // store the current category
  const [descExpanded, setDescExpanded]   = useState(false); // track state of expandable description field
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Update the product being presented when id is changed
  useEffect(() => {
    getProduct(id)
      .then(data => setProduct(data))
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  // Define default selected image, and set current category
  useEffect(() => {
      if(!product) return;
      if (product?.images?.length) {
        setSelectedImage(product.images[1]);
      }
      if (product.category){
        setCategory(product.category.toLowerCase())
      }
  }, [product]);

  if (loading) return <p>Loading product…</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  // Toggle description to its other state
  const toggleDescription = () => setDescExpanded(exp => !exp);

  return (
    <Layout>
      <div className="links">
        <Link to="/">Home</Link>
        <p>/</p>
        <Link to={`/shop?category=${category}`}>Shop</Link>        
        <p>/</p>
        <p className="current-item">{product.title}</p>
      </div>

      <div className="page-body">

        <div className="image-gallery">
          <div className="display-image">
              {selectedImage && (
                <img
                  src = {`${process.env.REACT_APP_API_ENDPOINT_URL}${selectedImage}`}
                  alt={`${product.title} display`}
                />
              )}
          </div>
          <div className="all-images">
            {product.images.slice(1).map((imgPath, idx) => (
              <img
                key={idx}
                src={`${process.env.REACT_APP_API_ENDPOINT_URL}${imgPath}`}
                alt={`${product.title} ${idx + 1}`}
                className={`${imgPath === selectedImage ? ' active' : ''}`}
                onClick={() => setSelectedImage(imgPath)}
              />
            ))}
          </div>
        </div>

        <div className="info">
          <h1 className="serif">{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>

          <button>Add to Bag</button>

          <div className="description-container">

            <div className="desc-title-wrapper">
              <h2 className="description-title">Description</h2>

              <button className="desc-toggle" onClick={toggleDescription}>
                  {descExpanded ? '▲' : '▼'}
              </button>
            </div>

            <hr className="description-divider" />
            <p className={`description ${descExpanded ? 'expanded' : 'collapsed'}`}>
              {product.description}
            </p>

          </div>
          
          <div className="details-list">
            <p className="">Details:</p>
            <ul className="details-list">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </Layout>
  );
}
