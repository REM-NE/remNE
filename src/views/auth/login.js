import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import "./auth.css";

export default function LoginPage() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const isNotEmpty = (valor) => {
        return valor.length > 0;
    };

    const enviarDados = () => {

        if (isNotEmpty(login) && isNotEmpty(password)) {

            signInWithEmailAndPassword(auth, login, password)
                .then(() => {
                    alert("Login efetuado com sucesso!");
                    navigate("/");
                })
                .catch(() => {
                    alert("Login deu errado!");
                });

        } else {
            alert("Algum campo está vazio!");
        }
    };

    return (
        <div className="home loginContainer">

            <div className="stepContainer">

                <div className="box">

                    <label>
                        Login
                    </label>

                    <input
                        className="input"
                        onChange={(e) => setLogin(e.target.value)}
                        name="login"
                        value={login}
                    />

                    <label>
                        Senha
                    </label>

                    <div className="input">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="inputPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            name="senha"
                            value={password}
                        />

                        <button
                            className="showPassword"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </button>

                    </div>

                    <button
                        className="authButton"
                        onClick={enviarDados}
                    >
                        Enviar
                    </button>

                </div>

            </div>

        </div>
    );
}