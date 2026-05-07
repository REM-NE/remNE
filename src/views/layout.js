import { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import '../App.css';
import Banner from "../components/banner";
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

    const currentMenu = menuObject.find(
        (b) => b.path === location.pathname
    );

    const currentPage = currentMenu.title || "";

    const currentPath =
        location.pathname === "/"
            ? "home"
            : location.pathname.replace("/", "");

    const currentStatus = currentMenu.search || false;

    const loadData = async () => {
        try {
            const data = await getDocuments(
                "carousel",
                false,
                null,
                null
            );

            const carouselData = data.docs.find(
                (doc) => doc.type === currentPath
            );

            if (carouselData) {
                setDocsData(carouselData);
            }

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
            {docsData.images.length > 0 && (
                location.pathname === "/" ? (
                    <Carousel images={docsData.images} id="homeCarousel" />
                ) : (
                    currentPage !== "Sobre" && <Banner title={currentPage} image={docsData.images[0].imageURL} />
                )
            )}
            {currentStatus && <SearchBar term={term} setTerm={setTerm} collectionName={location.pathname} />}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;