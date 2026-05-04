import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../utils/authContext';

import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';
import SearchBar from './searchBar';
import { useSearchParams } from "react-router-dom";
import { useState } from 'react';


function Navbar() {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search");
    const [term, setTerm] = useState(searchTerm || "");

    function NavBarButtons() {
        let buttonObject = [
            { title: "Início", path: "/" },
            { title: "Eventos e Notícias", path: "/eventos-e-noticias" },
            { title: "Recursos Educacionais", path: "/recursos-educacionais" },
            { title: "Publicações Científicas", path: "/publicacoes" },
            { title: "Biblioteca", path: "/biblioteca" },
            { title: "Sobre", path: "/sobre" },
        ];

        return (
            <>
                {buttonObject.map((button, index) => (
                    <Link key={index} to={button.path}>
                        <div className={location.pathname === button.path ? "active" : ""}>
                            <p>{button.title}</p>
                        </div>
                    </Link>
                ))}
            </>
        );
    }

    return (
        <div className="header">
            <div className="row-header">
                <div className="start-header">
                    <a href='/'><img className="logo" src={logo1} alt="logo" /></a>
                    <a href='/'><img className="logo" src={logo2} alt="logo" /></a>
                </div>
                <div className="column">
                    <div className="row-header bottom-header">
                        <div className="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
                        <SearchBar term={term} setTerm={setTerm} collectionName={location.pathname} />
                        {/* <div className="search-bar">
                            <input type="text" defaultValue={"Busca/Pesquisa"} />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;