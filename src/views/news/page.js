import { useEffect, useState } from 'react';
import '../../App.css';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { getDocuments, getNextPage, getPrevPage } from '../../cotrollers/firebaseCollections';
import { useAuth } from '../../utils/authContext';
import './news.css';

function NewsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [firstDoc, setFirstDoc] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [history, setHistory] = useState([]);

    const collection = "eventos-e-noticias";

    const loadData = async () => {
        const data = await getDocuments(collection, true, null);
        setDocsData(data.docs);
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
    }, []);

    function NewsCard() {
        return (
            <>
                {Array.isArray(docsData) && docsData.map((noticia, index) => (
                    // <a key={index} href="#">
                    index < 10 && (<Post key={index} title={noticia.title} image={noticia.imageURL} id={noticia.id} />)
                    // </a>
                ))}
            </>
        );
    }

    return (

        <div className="news main top-spacing">
            <Banner title="Eventos e Notícias" />
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Eventos e Notícias" path="/eventos-e-noticias/edit" />}
                    </div>
                    <div className="grid">
                        <NewsCard />
                    </div>
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

export default NewsPage;