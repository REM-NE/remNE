import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import '../../App.css';
import fundamental from '../../assets/images/ensino-fundamental.jpeg';
import medio from '../../assets/images/medio.jpeg';
import superior from '../../assets/images/superior.jpeg';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { getDocuments } from '../../cotrollers/firebaseCollections';
import { useAuth } from '../../utils/authContext';
import './resources.css';

function ResourcesPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    const collection = "recursos";

    const loadData = useCallback(() => {
        getDocuments(collection, true, null, searchTerm).then((data) => {
            setDocsData(data.docs);
        });
    }, [collection, searchTerm]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    function ResourceCard() {
        return (
            <div className="grid">
                {Array.isArray(docsData) && docsData.map((recurso, index) => (
                    index < 10 && (
                        <Post key={index} title={recurso.title} image={recurso.imageURL} link={null} id={recurso.id} />)
                ))}
            </div>
        );
    }

    const cardUpperTexts = [
        { img: fundamental, text: "Ensino Fundamental" },
        { img: medio, text: "Ensino Médio" },
        { img: superior, text: "Ensino Superior" }
    ]

    return (
        <div className="resources main">
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="container flex-grow-1 resources-filter">
                        {cardUpperTexts.map((item, id) => (
                            <div key={id} className="d-flex justify-content-center">
                                <div className="card resource-highlight-card">
                                    <img src={item.img} className="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.text}</h5>
                                        {/* <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                                </p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-start">
                        {currentUser && <PathButton text="Editar Recursos Educacionais" path="/recursos-educacionais/edit" />}
                    </div>
                    {docsData.length > 0 ? <ResourceCard /> : <p style={{ textAlign: "center" }}>Nenhum recurso encontrado.</p>}
                    {/* {docsData.length > 0 ? <Pagination
                        currentPage={page}
                        hasNext={docsData.length === 10} // depende do limit
                        hasPrev={page > 1}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    /> : <p >Nenhum recurso encontrado.</p>} */}
                </div>
            </div>
        </div>
    )
}

export default ResourcesPage;
