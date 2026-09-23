
import logoRem from '../../assets/images/logo.png';
import './style_notfound.css';

export default function NotFound() {
    return (
        <div className="container_notfound">
            <div className="notfound-card">
                <img
                    src={logoRem}
                    alt="REM"
                    className="logo_notfound"
                />

                <span className="notfound-badge">Erro 404</span>

                <h1>404</h1>

                <h2>Página não encontrada</h2>

                <p>
                    A página que você está procurando não existe ou foi movida.
                </p>

                <a href="/" className="notfound-button">
                    Voltar para o início
                </a>
            </div>
        </div>
    );
}