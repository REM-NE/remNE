import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../App.css';
import Banner from "../../components/banner";
import { getDocumentById } from "../../cotrollers/firebaseCollections";
import './news.css';

export default function LibraryPost() {
    const { postId } = useParams();

    const [postData, setPostData] = useState({
        title: "",
        text: "",
        imageUrl: "",
        link: ""
    });

    useEffect(() => {
        getDocumentById("eventos-e-noticias", postId)
            .then((data) => {
                setPostData({
                    title: data.title,
                    text: data.text,
                    imageUrl: data.imageUrl,
                    link: data.link
                });
            })
    }, [postId]);

    return (
        <div class="news main top-spacing">
            <Banner title="Eventos e Notícias" />
            <br></br>
            <div className="main-post border rounded container p-4 mb-5">
                {postData.imageUrl && <img src={postData.imageUrl} alt={postData.title} className="main-post-image" />}
                <h3 className="main-post-title">{postData.title}</h3>
                <p className="main-post-text">{postData.text}</p>
                {postData.link && <a href={postData.link} target="_blank" rel="noopener noreferrer" className="main-post-link">Saiba mais</a>}
            </div>
        </div>
    );
}