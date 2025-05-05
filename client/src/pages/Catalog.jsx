import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import Layout from "../components/Layout";
import Product from '../components/Product';
import "../styles/Catalog.css"

// Creates a grid of Product components, displaying each product in the database. Allows filtering by type and price.
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error,    setError]    = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();  // Track selected catagory
  const selectedCategory = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState("featured")   // Track sorting filter selection
  const categories = ['necklace', 'bracelet', 'earrings'];

  // Fetch all products at the start
  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Failed to load products'));
  }, []); 
  if (error) return <p className="error">{error}</p>;

  // Filter products based on the current category selected
  const filtered = selectedCategory
    ? products.filter(p => p.category.toLowerCase() === selectedCategory)
    : products;

  // Sort categories based on the sorting option selected
  let sorted = [...filtered];
  if (sortBy === 'low-high') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    sorted.sort((a, b) => b.price - a.price);
  }
  else if (sortBy === "featured"){
    sorted.sort((a,b) => a.id - b.id)
  }

  return (
    <Layout>
    <div className="body">
    <h1 className="banner">Our Collection</h1>

      <div className="filters">
        <select
          id="category-selector"
          value={selectedCategory}
          onChange={e => {
            const cat = e.target.value;
            if (cat) {
              setSearchParams({ category: cat.toLowerCase() });
            } else {
              setSearchParams({});
            }
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select 
        id="sort-selector"
        value={sortBy}
        onChange={e => {
            setSortBy(e.target.value);
        }}
        >
            <option key="featured" value="featured">Featured</option>
            <option key="low-high" value="low-high">Price: Low &rarr; High</option>
            <option key="high-low" value="high-low">Price: High &rarr; Low</option>

        </select>
      </div>

        <div className="grid-container">
          <div className="grid">  
            {sorted.map(item => (
                <Product
                  key={item.id}
                  id={item.id}
                  image={item.images[0]}
                  title={item.title}
                  price={`$${item.price.toFixed(2)}`}
                  />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
