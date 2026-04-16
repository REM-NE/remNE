import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from 'react';
import '../../App.css';
import fundamental from '../../assets/images/ensino-fundamental.jpeg';
import medio from '../../assets/images/medio.jpeg';
import superior from '../../assets/images/superior.jpeg';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { getDocuments, getNextPage } from '../../cotrollers/firebaseCollections';
import { useAuth } from '../../utils/authContext';
import './resources.css';

function ResourcesPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastDoc, setLastDoc] = useState(null);
    const [history, setHistory] = useState([]);

    const collection = "recursos";

    function loadData() {
        getDocuments(collection, true).then((data) => {
            setDocsData(data.docs);
        });
        setLoading(false);
    }

    const handlePrev = async () => {
        if (page <= 1) return;

        const prevCursor = history[history.length - 2] || null;

        const res = await getNextPage(prevCursor, collection);

        setHistory(prev => prev.slice(0, -1));
        setDocsData(res.docs);
        setLastDoc(res.lastDoc);
        setPage(prev => prev - 1);
    };

    const handleNext = async () => {
        const res = await getNextPage(lastDoc, collection);

        setHistory(prev => [...prev, lastDoc]);
        setDocsData(res.docs);
        setLastDoc(res.lastDoc);
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        loadData();
    }, []);

    function NewsCard() {
        return (
            <>
                {Array.isArray(docsData) && docsData.map((recurso, index) => (
                    index < 10 && (
                        <Post key={index} title={recurso.title} image={recurso.imageURL} id={recurso.id} />)
                ))}
            </>
        );
    }

    const cardUpperTexts = [
        { img: fundamental, text: "Ensino Fundamental" },
        { img: medio, text: "Ensino Médio" },
        { img: superior, text: "Ensino Superior" }
    ]

    return (
        <div className="resources main top-spacing">
            <Banner title="Recursos Educacionais" />
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="resource-actions">
                        <button className="botao-noticias" onClick={() => { }}>Envio de Material</button>
                    </div>
                    <div className="row justify-content-center gx-4 mt-4 container flex-grow-1">
                        {cardUpperTexts.map((item, id) => (
                            <div key={id} className="col-12 col-md-6 col-xl-4 d-flex justify-content-center mb-4">
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
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Recursos Educacionais" path="/recursos-educacionais/edit" />}
                    </div>
                    <div className="grid">
                        <NewsCard />
                    </div>
                    {<Pagination
                        currentPage={page}
                        hasNext={docsData.length === 10} // depende do limit
                        hasPrev={page > 1}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />}
                </div>
            </div>
        </div>
    )
}

export default ResourcesPage;
