import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebaseConfig';
import './auth.css';

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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
            signInWithEmailAndPassword(auth, login, password)
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

    // signOut(auth).then(() => {
    // // Sign-out successful.
    // }).catch((error) => {
    // // An error happened.
    // });

    return (
        <div className="home loginContainer">
            <div className="stepContainer">
                <div className="box">
                    <label>
                        Login
                    </label>
                    <input className="input" onChange={(e) => setLogin(e.target.value)} name="login" value={login} />
                    <label>
                        Senha
                    </label>
                    <div className="input">
                        <input type={`${showPassword ? "text" : "password"}`} className="inputPassword" onChange={(e) => setPassword(e.target.value)} name="senha" value={password} />
                        <button className="showPassword" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash /> : <BsEye />}</button>
                    </div>
                    <button className="authButton" onClick={() => enviarDados()}>
                        Enviar
                    </button>
                    <div className="options">
                        <Link to={"/auth/register"}>
                            Cadastre-se
                        </Link>
                        <a href="#">Recuperar Senha</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
