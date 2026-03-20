import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from 'react';
import '../../App.css';
import PathButton from '../../components/pathButton';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";
import '../../App.css';
import fundamental from '../../assets/images/ensino-fundamental.jpeg';
import medio from '../../assets/images/medio.jpeg';
import news2 from '../../assets/images/news2.png';
import superior from '../../assets/images/superior.jpeg';
import Banner from '../../components/banner';
import Pagination from '../../components/pagination';
import Post from '../../components/post';
import './highlights.css';

function HighlightsPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "recursos");
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
                {docsData.map((recurso, index) => (
                    // <a key={index} href="#">
                    index < 10 && (<Post key={index} title={recurso.title} image={recurso.image} />)
                    // </a>
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
        <div class="highlights main top-spacing">
            <Banner title="Recursos Educacionais" />
            <br></br>
            <button className="botao-noticias" style={{ padding_bottom: "50px", }} onClick={() => { }}>Envio de Material</button>
            <div class="container flex-grow-1">
                <div class="column">
                    <div className="row justify-content-center gx-4 mt-4 container flex-grow-1">
                        {cardUpperTexts.map((item, id) => (
                            <div key={id} className="col-md-4 d-flex justify-content-center mb-4">
                                <div className="card" style={{ width: "30rem" }}>
                                    <img src={item.img} class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.text}</h5>
                                        {/* <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                                </p> */}
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>

                            </div>

                        ))}
                    </div>
                    <div className="d-flex justify-content-start mt-5">
                        {currentUser && <PathButton text="Editar Recursos e Publicações" path="/recursos-educacionais/edit" />}
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

export default HighlightsPage;