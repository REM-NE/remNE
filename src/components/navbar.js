import '../App.css';
import { Button } from 'react-bootstrap';

import logo from '../assets/images/remne-logo.jpg';

function Navbar() {

    function NavBarButtons() {
        let buttonObject = [
            { title: "Início/Home", icon: "" },
            { title: "Eventos e Novidades", icon: "" },
            { title: "Recursos Destaque", icon: "" },
            { title: "Publi. Científicas", icon: "" },
            { title: "Biblioteca", icon: "" },
            { title: "Sobre", icon: "" },
        ];

        return (
            <>
                {buttonObject.map((button, index) => (
                    <a key={index} href="#">
                        <img class="icon" src="#" alt=""></img>
                        <div>
                            <p>{button.title}</p>
                        </div>
                    </a>
                ))}
            </>
        );
    }


    return (
        <div class="header">
            <div class="row">
                <div class="start-header">
                    <img class="logo" src={logo} alt="logo"/>
                </div>
                <div class="column">
                    <div class="top-header">
                        <Button>LOGIN</Button>
                    </div>
                    <div class="row bottom-header">
                        <div class="row navbar">
                            <NavBarButtons />
                        </div>
                        <div class="search-bar">
                            <input type="text" defaultValue={"Busca/Pesquisa"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;