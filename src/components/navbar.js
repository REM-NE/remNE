import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../utils/authContext';


function Navbar() {
    const { currentUser, logout } = useAuth();

    const location = useLocation();

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
                        {/* <img className="icon" src={button.icon} alt=""></img> */}
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