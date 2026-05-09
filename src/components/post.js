import { Link } from "react-router-dom";
import '../App.css';
import defaultImage from '../assets/images/default-image.png';
import '../views/news/news.css';

export default function Post({ title, image, id, link }) {

    if (!image) {
        image = defaultImage;
    }

    return (
        <Link key={id} to={link != null ? `post/${id}` : link}>
            <div className="column post-card">
                <img className="post-image" src={image} alt=""></img>
                <div className="column-main post-text">
                    <p className="card-title">{title}</p>
                    {/* <p className="card-text">{text}</p> */}
                </div>
            </div>
        </Link>)
}