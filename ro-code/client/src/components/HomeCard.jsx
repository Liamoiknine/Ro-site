import { Link } from "react-router-dom";
import "../styles/HomeCard.css";

// Card containing information based on the props. The card is a link to catalog page.
const HomeCard = ({ image, title, path}) => {
    return (
        <Link to={path}>
            <div className="home-card">
                <div className="home-card-image">
                    <img src={image} alt={`${title} image`} />
                </div>
                <div className="home-card-content">
                    <h1>{title}</h1>
                </div>
            </div>
        </Link>
    );
};

export default HomeCard;