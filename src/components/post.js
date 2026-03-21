import { Link } from "react-router-dom";
import '../App.css';
import newsImage1 from '../assets/images/news1.png';
import '../views/news/news.css';

export default function Post({ title, image, id}) {

    if (!image) {
        image = newsImage1;
    }

    return (
        <Link key={id} to={`post/${id}`}>
            <div class="column post-card">
                <img class="post-image" src={image} alt=""></img>
                <div class="column-main post-text">
                    <p className="card-title">{title}</p>
                    {/* <p className="card-text">{text}</p> */}
                </div>
            </div>
        </Link>)
}