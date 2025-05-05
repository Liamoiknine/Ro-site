import { Link } from "react-router-dom";
import "../styles/Product.css";
const BASE = process.env.REACT_APP_API_ENDPOINT_URL;

// Card containing information based on the props. The card is a link to the correpsonding individual product page.
const Product = ({ id, image, title, price }) => {
    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className="card">
                <div className="card-image">
                    <img src={`${BASE}${image}`} alt={`${title} image`} />
                </div>
                <div className="card-content">
                    <h1>{title}</h1>
                    <p>{price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Product;