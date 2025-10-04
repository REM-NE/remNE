import { useState } from 'react';
import './auth.css';

import { Link } from 'react-router-dom';

export default function LoginPage() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const isNotEmpty = (valor) => {
        if (valor.length > 0) {
            if (login == "remne" && password == "remneadmin") {
                return true
            }
        }
        return false
    }

    const enviarDados = () => {
        if (isNotEmpty(login) && isNotEmpty(password)) {
            alert("Login efetuado com sucesso!")
        } else {
            alert("Usuário não existe")
        }
    }

    return (
        <div className="home top-spacing-highlight loginContainer">
            <div className="stepContainer">
                <div className="box">
                    <label>
                        Login
                    </label>
                    <input className="input" onChange={(e) => setLogin(e.target.value)} name="login" value={login} />
                    <label>
                        Senha
                    </label>
                    <input className="input" onChange={(e) => setPassword(e.target.value)} name="senha" value={password} />
                    <button onClick={() => enviarDados()}>
                        Enviar
                    </button>
                    <div className="options">
                        <Link to={"/auth/register"}>
                            <a>Cadastre-se</a>
                        </Link>
                        <a href="#">Recuperar Senha</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
