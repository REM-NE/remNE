import { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import '../App.css';
import Banner from "../components/banner";
import Carousel from "../components/carousel";
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchBar';
import { getDocuments } from "../cotrollers/firebaseCollections";
import './layout.css';

const menuObject = [
    { title: "Início", path: "/" },
    { title: "Eventos e Notícias", path: "/eventos-e-noticias", search: true },
    { title: "Recursos Educacionais", path: "/recursos-educacionais", search: true },
    { title: "Publicações Científicas", path: "/publicacoes", search: true },
    { title: "Biblioteca", path: "/biblioteca" },
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
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    const currentMenu = menuObject.find(
        (b) => b.path === location.pathname
    );

    const currentPage = currentMenu?.title || "";

    const currentPath =
        location.pathname === "/"
            ? "home"
            : location.pathname.replace("/", "");

    const bannerTypeAliases = {
        home: ["home"],
        "recursos-educacionais": ["recursos-educacionais", "recursos", "resources"],
        "publicacoes": ["publicacoes", "publicacoes-cientificas", "publications"],
        "biblioteca": ["biblioteca", "library"],
        "sobre": ["sobre", "about"],
        "eventos-e-noticias": ["eventos-e-noticias", "eventos", "noticias", "news"],
    };

    const currentStatus = currentMenu?.search || false;

    useEffect(() => {
        const searchCollectionMap = {
            "/eventos-e-noticias": "eventos-e-noticias",
            "/recursos-educacionais": "recursos",
            "/publicacoes": "publicacoes",
        };

        const collectionName = searchCollectionMap[location.pathname];

        if (!collectionName || !currentStatus) {
            setSearchSuggestions([]);
            return;
        }

        let isMounted = true;

        getDocuments(collectionName, true, null, null)
            .then((data) => {
                if (isMounted) {
                    setSearchSuggestions(data.docs || []);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setSearchSuggestions([]);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [location.pathname, currentStatus]);

    const loadData = async () => {
        setDocsData({ type: "", images: [] });

        try {
            const data = await getDocuments(
                "carousel",
                false,
                null,
                null
            );

            const aliases = bannerTypeAliases[currentPath] || [currentPath];
            const carouselData = data.docs.find(
                (doc) => aliases.includes(doc.type)
            );

            if (carouselData) {
                setDocsData(carouselData);
            } else {
                setDocsData({ type: "", images: [] });
            }

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            setDocsData({ type: "", images: [] });
        }
    };


    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <>
            <Navbar menuItems={menuObject} />
            {docsData.images.length > 0 && (
                location.pathname === "/" ? (
                    <Carousel images={docsData.images} id="homeCarousel" />
                ) : (
                    currentPage !== "Sobre" && <Banner title={currentPage} image={docsData?.images[0].imageURL} />
                )
            )}
            {currentStatus && (
                <SearchBar
                    term={term}
                    setTerm={setTerm}
                    collectionName={location.pathname}
                    suggestions={searchSuggestions}
                />
            )}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
