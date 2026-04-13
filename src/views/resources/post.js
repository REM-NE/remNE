import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../App.css';
import Banner from "../../components/banner";
import { getDocumentById } from "../../cotrollers/firebaseCollections";
import './resources.css';

export default function LibraryPost() {
    const { postId } = useParams();

    const [postData, setPostData] = useState({
        title: "",
        text: "",
        imageURL: "",
        link: ""
    });

    useEffect(() => {
        getDocumentById("recursos", postId)
            .then((data) => {
                setPostData({
                    title: data.title,
                    text: data.text,
                    imageURL: data.imageURL,
                    link: data.link
                });
            })
    }, [postId]);

    return (
        <div className="resources main top-spacing">
            <Banner title="Recursos Educacionais" />
            <br></br>
            <div className="main-post border rounded container p-4 mb-5">
                {postData.imageURL && <img src={postData.imageURL} alt={postData.title} className="main-post-image post-img" />}
                <h3 className="main-post-title">{postData.title}</h3>
                <p className="main-post-text">{postData.text}</p>
                {postData.link && <a href={postData.link} target="_blank" rel="noopener noreferrer" className="main-post-link">Saiba mais</a>}
            </div>
        </div>
    );
}