import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import '../../App.css';
import fundamental from '../../assets/images/ensino-fundamental.jpeg';
import medio from '../../assets/images/medio.jpeg';
import superior from '../../assets/images/superior.jpeg';
import Pagination from '../../components/pagination';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { getDocuments, getNextPage, getPrevPage } from '../../cotrollers/firebaseCollections';
import { useAuth } from '../../utils/authContext';
import './resources.css';

function ResourcesPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [firstDoc, setFirstDoc] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState("");

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    const collection = "recursos";

    function loadData() {
        getDocuments(collection, true, filter, searchTerm).then((data) => {
            setDocsData(data.docs);
        });
        setLoading(false);
    }

    const handleNext = async () => {
        if (!lastDoc) return;

        setHistory(prev => [...prev, firstDoc]);
        const res = await getNextPage(lastDoc, collection);

        setDocsData(res.docs);
        setFirstDoc(res.firstDoc);
        setLastDoc(res.lastDoc);
        setPage(prev => prev + 1);
    };

    const handlePrev = async () => {
        if (history.length === 0) return;

        const newHistory = [...history];
        const prevFirstDoc = newHistory.pop();

        const res = await getPrevPage(prevFirstDoc, collection);

        setHistory(newHistory);
        setDocsData(res.docs);
        setFirstDoc(res.firstDoc);
        setLastDoc(res.lastDoc);
        setPage(prev => prev - 1);
    };

    useEffect(() => {
        loadData();
    }, [filter, searchTerm]);

    function ResourceCard() {
        return (
            <div className="grid">
                {Array.isArray(docsData) && docsData.map((recurso, index) => (
                    index < 10 && (
                        <Post key={index} title={recurso.title} image={recurso.imageURL} id={recurso.id} />)
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
        <div className="resources main top-spacing">
            <Banner title="Recursos Educacionais" />
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="row justify-content-center gx-4 mt-4 container flex-grow-1 resources-filter">
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
                    <div className="d-flex justify-content-start">
                        {currentUser && <PathButton text="Editar Recursos Educacionais" path="/recursos-educacionais/edit" />}
                    </div>
                    {docsData.length > 0 ? <ResourceCard /> : <p style={{ textAlign: "center" }}>Nenhum recurso encontrado.</p>}
                    {docsData.length > 0 && <Pagination
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
