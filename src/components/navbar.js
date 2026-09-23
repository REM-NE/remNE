import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../utils/authContext';

function Navbar({ menuItems }) {
    useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    function NavBarButtons() {
        return (
            <>
                {menuItems.map((button, index) => (
                    <Link key={button.path || index} to={button.path} className="navbar-link"
                        aria-current={location.pathname === button.path ? "page" : undefined}>
                        <span className={location.pathname === button.path ? "active" : ""}>
                            {button.title}
                        </span>
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
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
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
