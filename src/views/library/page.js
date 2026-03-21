import { useEffect, useState } from 'react';
import '../../App.css';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import PathButton from '../../components/pathButton';
import Post from '../../components/post';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";
import '../news/news.css';

function PublicationsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "biblioteca");
            const snap = await getDocs(ref);

            const lista = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));

            setDocsData(lista);
            setLoading(false);
        }

        loadData();
    }, []);

    function NewsCard() {
        return (
            <>
                {docsData.map((publicacao, index) => (
                    // <a key={index} href="#">
                    index < 10 && (<Post key={index} title={publicacao.title} image={publicacao.imageURL} />)
                    // </a>
                ))}
            </>
        );
    }

    return (
        <div class="publications main top-spacing">
            <Banner title="Publicações Científicas" />
            {/* <div class="title">Notícias</div> */}
            <div class="container flex-grow-1">
                <div class="column">
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Publicações da Biblioteca" path="/biblioteca/edit" />}
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

export default PublicationsPage;