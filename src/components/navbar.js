import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../utils/authContext';

import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchBar from './searchBar';


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
            <div className="row-header container">
                <div className="start-header">
                    <a href='/'><img className="logo" src={logo} alt="logo" /></a>
                </div>
                <div className="column">
                    <div className="row-header bottom-header">
                        <div className="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
                        {location.pathname != "/" && location.pathname !="/sobre" && <SearchBar term={term} setTerm={setTerm} collectionName={location.pathname} />}
                        {/* <div className="search-bar">
                            <input type="text" defaultValue={"Busca/Pesquisa"} />
                        </div> */}
                        <div className="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;