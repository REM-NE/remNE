import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import '../App.css';

import logo from '../assets/images/remne-logo.jpg';

function Navbar() {
    const { currentUser, logout } = useAuth();

    function NavBarButtons() {
        let buttonObject = [
            { title: "Início/Home", icon: "", path: "/" },
            { title: "Eventos e Novidades", icon: "", path: "/eventos-e-novidades" },
            { title: "Recursos Destaque", icon: "", path: "/recursos-destaque" },
            { title: "Publi. Científicas", icon: "", path: "/publicacoes" },
            { title: "Biblioteca", icon: "", path: "/biblioteca" },
            { title: "Sobre", icon: "", path: "/sobre" },
        ];

        return (
            <>
                {buttonObject.map((button, index) => (
                    <Link key={index} to={button.path}>
                        <img class="icon" src={button.icon} alt=""></img>
                        <div>
                            <p>{button.title}</p>
                        </div>
                    </Link>
                ))}
            </>
        );
    }

    return (
        <div class="header">
            <div class="row-header">
                <div class="start-header">
                    <img class="logo" src={logo} alt="logo" />
                </div>
                <div class="column">
                    <div class="top-header">
                        {currentUser ? (
                            <div class="column logout">
                                <span>Olá, {currentUser.email}</span>
                                <Button onClick={logout}>Sair</Button>
                            </div>
                        ) : (
                            <Link to={"/auth/login"}>
                                <Button >LOGIN</Button>
                            </Link>
                        )}
                    </div>
                    <div class="row-header bottom-header">
                        <div class="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
                        <div class="search-bar">
                            <input type="text" defaultValue={"Busca/Pesquisa"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;