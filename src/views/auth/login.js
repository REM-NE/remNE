import { useState } from 'react';
import './auth.css';
import { auth } from '../../utils/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
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
                    <div className="input">
                        <input className="inputPassword" onChange={(e) => setPassword(e.target.value)} name="senha" value={password} />
                        <button className="showPassword" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash /> : <BsEye />}</button>
                    </div>
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
