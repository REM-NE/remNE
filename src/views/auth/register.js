import { useState } from 'react';
import './auth.css';

import { Link } from 'react-router-dom';

export default function RegisterPage() {

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isNotEmpty = (valor) => {
        if (valor.length > 0) {
            return true
        }
        return false
    }

    const enviarDados = () => {
        if (isNotEmpty(name) && isNotEmpty(login) && isNotEmpty(password)) {
            alert("Usuário criado com sucesso")
        } else {
            if (password == confirmPassword) {
                alert("Algum dado não foi informado")
            }
        }
    }

    return (
        <div className="home top-spacing-highlight loginContainer">
            <div className="stepContainer">
                <div className="box">
                    <label>
                        Nome
                    </label>
                    <input className="input" onChange={(e) => setName(e.target.value)} name="nome" value={name} />

                    <label>
                        Login
                    </label>
                    <input className="input" onChange={(e) => setLogin(e.target.value)} name="login" value={login} />

                    <label>
                        Senha
                    </label>
                    <input className="input" onChange={(e) => setPassword(e.target.value)} name="senha" value={password} />

                    <label>
                        Confirmar
                    </label>
                    <input className="input" onChange={(e) => setConfirmPassword(e.target.value)} name="confirmarSenha" value={confirmPassword} />
                    <button onClick={() => enviarDados()}>
                        Enviar
                    </button>
                    <div className="options">
                        <Link to={"/auth/login"}>
                            <a>Fazer login</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>);
}