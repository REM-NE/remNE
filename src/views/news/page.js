import '../../App.css';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import Post from '../../components/post';
import { useEffect, useState } from 'react';
import '../../App.css';
import PathButton from '../../components/pathButton';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";
import './news.css';

function NewsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "eventos-e-noticias");
            const snap = await getDocs(ref);

            const lista = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));

            setDocsData(lista.reverse());
            setLoading(false);
        }

        loadData();
    }, []);

    function NewsCard() {
        return (
            <>
                {docsData.map((noticia, index) => (
                    // <a key={index} href="#">
                    index < 10 && (<Post key={index} title={noticia.title} image={noticia.imageUrl} />)
                    // </a>
                ))}
            </>
        );
    }

    return (

        <div className="news main top-spacing">
            <Banner title="Eventos e Notícias" />
            {/* <div class="title">Notícias</div> */}
            <div className="container flex-grow-1">
                <div className="column">
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Eventos e Notícias" path="/eventos-e-noticias/edit" />}
                    </div>
                    <div className="grid">
                        <NewsCard />
                    </div>
                    <Pagination totalPages={docsData.length % 10} currentPage={page} onChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default NewsPage;