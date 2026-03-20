import '../../App.css';
import news2 from '../../assets/images/news2.png';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import Post from '../../components/post';
import { useEffect, useState } from 'react';
import '../../App.css';
import PathButton from '../../components/pathButton';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";
import './publications.css';

function PublicationsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "publicacoes");
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
                    index < 10 && (<Post key={index} text={publicacao.text} image={publicacao.imageURL} />)
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
                        {currentUser && <PathButton text="Editar Recursos e Publicações" path="/publicacoes/edit" />}
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