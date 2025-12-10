import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import '../App.css';

import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';

function Navbar() {
    const { currentUser, logout } = useAuth();

    const location = useLocation();

    function NavBarButtons() {
        let buttonObject = [
            { title: "Início", icon: "", path: "/" },
            { title: "Eventos e Notícias", icon: "", path: "/eventos-e-noticias" },
            { title: "Recursos Educacionais", icon: "", path: "/recursos-educacionais" },
            { title: "Publicações Científicas", icon: "", path: "/publicacoes" },
            { title: "Biblioteca", icon: "", path: "/biblioteca" },
            { title: "Sobre", icon: "", path: "/sobre" },
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
            <div className="row-header">
                <div className="start-header">
                    <img className="logo" src={logo1} alt="logo" />
                    <img className="logo" src={logo2} alt="logo" />
                </div>
                <div className="column">
                    {/* <div className="top-header"> 
                        {currentUser ? (
                            <div className="column logout">
                                <span>Olá, {currentUser.email}</span>
                                <Button onClick={logout}>Sair</Button>
                            </div>
                        ) : (
                            <Link to={"/auth/login"}>
                                <Button >LOGIN</Button>
                            </Link>
                        )}
                    </div> */}
                    <div className="row-header bottom-header">
                        <div className="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
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