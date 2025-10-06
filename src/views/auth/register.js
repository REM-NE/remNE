import { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const isNotEmpty = (valor) => {
        if (valor.length > 0) {
            return true
        }
        return false
    }

    const enviarDados = () => {
        if (isNotEmpty(login) && isNotEmpty(password)) {
            createUserWithEmailAndPassword(auth, login, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Login efetuado com sucesso!");
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Login deu errado!");
                });
        } else {
            alert("Algum campo está vazio!")
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
                    <div className="input">
                        <input className="inputPassword" onChange={(e) => setPassword(e.target.value)} name="senha" value={password} />
                        <button className="showPassword" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash /> : <BsEye />}</button>
                    </div>
                    
                    <label>
                        Confirmar senha
                    </label>
                    <div className="input">
                        <input className="inputPassword" onChange={(e) => setConfirmPassword(e.target.value)} name="confirmarSenha" value={confirmPassword} />
                        <button className="showPassword" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash /> : <BsEye />}</button>
                    </div>

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