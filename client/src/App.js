import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import './styles/App.css';

// Loads pages according to routes
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category?" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
  );
}

export default App;