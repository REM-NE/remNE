import '../App.css';
import '../views/news/news.css';
import newsImage1 from '../assets/images/news1.png';

export default function Post({ title, image, index }) {

    if (!image) {
        image = newsImage1;
    }

    return <div key={index} class="column post-card">
        <img class="post-image" src={image} alt=""></img>
        <div class="column-main post-text">
            <p className="card-title">{title}</p>
            {/* <p className="card-text">{text}</p> */}
        </div>
    </div>
}