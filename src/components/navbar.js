import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../utils/authContext';

function Navbar({ menuItems }) {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const buttonObject = [
        { title: "Inicio", path: "/" },
        { title: "Eventos e Notícias", path: "/eventos-e-noticias" },
        { title: "Recursos Educacionais", path: "/recursos-educacionais" },
        { title: "Publicações Cientí­ficas", path: "/publicacoes" },
        { title: "Biblioteca", path: "/biblioteca" },
        { title: "Sobre", path: "/sobre" },
    ];

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    function NavBarButtons() {
        return (
            <>
                {menuItems.map((button, index) => (
                    <Link key={index} to={button.path} className="navbar-link">
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
                    <Link to='/'><img className="logo" src={logo} alt="logo" /></Link>
                    <button
                        type="button"
                        className={`navbar-toggle ${isMenuOpen ? "is-open" : ""}`}
                        aria-label="Abrir menu"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((current) => !current)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
                <div className="column">
                    <div className="row-header bottom-header">
                        <div className={`row-header navbar-menu ${isMenuOpen ? "is-open" : ""}`}>
                            <NavBarButtons />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
