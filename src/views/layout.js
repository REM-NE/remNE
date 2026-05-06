import { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import '../App.css';
import Carousel from "../components/carousel";
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchBar';
import { getDocuments } from "../cotrollers/firebaseCollections";

const menuObject = [
    { title: "Início", path: "/" },
    { title: "Eventos e Notícias", path: "/eventos-e-noticias", search: true },
    { title: "Recursos Educacionais", path: "/recursos-educacionais", search: true },
    { title: "Publicações Científicas", path: "/publicacoes", search: true },
    { title: "Biblioteca", path: "/biblioteca", search: true },
    { title: "Sobre", path: "/sobre" },
];

function Layout() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search");

    const [term, setTerm] = useState(searchTerm || "");
    const [docsData, setDocsData] = useState({
        type: "",
        images: []
    });

    const checkSearchAvailability = () => {
        const button = menuObject.find((b) => b.path === location.pathname);
        return button?.search || false;
    };

    const loadData = async () => {
        try {
            getDocuments("carousel", false, null, null).then((data) => {
                if (data.type === location.pathname.replace("/", "")) {
                    setDocsData(data.docs);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar menuItems={menuObject} />
            <Carousel images={docsData.images} id="homeCarousel" />
            {checkSearchAvailability() && <SearchBar term={term} setTerm={setTerm} collectionName={location.pathname} />}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;