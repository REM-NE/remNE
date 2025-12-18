import '../App.css';
import '../views/news/news.css';

export default function Post({ text, image, index }) {
    return <div key={index} class="column post-card">
        <img class="post-image" src={image} alt=""></img>
        <div class="column-main post-text">
            <p className="card-title">{text}</p>
        </div>
    </div>
}