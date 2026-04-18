import { useEffect, useState } from 'react';
import '../../App.css';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { getDocuments, getNextPage, getPrevPage } from '../../cotrollers/firebaseCollections';
import { useAuth } from '../../utils/authContext';
import './publications.css';

function PublicationsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [firstDoc, setFirstDoc] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [history, setHistory] = useState([]);

    const collection = "publicacoes";

    function loadData() {
        getDocuments(collection, true, null).then((data) => {
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
    }, []);

    function NewsCard() {
        return (
            <>
                {Array.isArray(docsData) && docsData.map((publicacao, index) => (
                    index < 10 && (<Post key={index} title={publicacao.title} image={publicacao.imageURL} id={publicacao.id} />)
                ))}
            </>
        );
    }

    return (
        <div className="publications main top-spacing">
            <Banner title="Publicações Científicas" />
            {/* <div className="title">Notícias</div> */}
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Publicações Científicas" path="/publicacoes/edit" />}
                    </div>
                    <div className="grid">
                        <NewsCard />
                    </div>
                    {docsData.length > 0 &&<Pagination
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

export default PublicationsPage;