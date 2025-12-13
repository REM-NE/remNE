import '../App.css';
import logo2 from '../assets/images/logo2.png';
function Footer() {
    return (
        <div className="footer">
            <div className="footer-top">
                <p><a>Mobile app</a></p>
                <p>Community</p>
                <p>Company</p>

                <img className="logo" src={logo2} alt="logo" />

                <p>Help desk</p>
                <p>Blog</p>
                <p>Resources</p>
            </div>

            <hr className="footer-hr" />

            <section className="footer-section-bottom">
                <a href="https://github.com/samuel123d/">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="35px"
                        height="35px"
                        fill="currentColor"
                        className="bi bi-github"
                        viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8..." />
                    </svg>
                </a>

                <span>2025 REM - Todos os direitos reservados.</span>
            </section>
        </div>






    )

}

export default Footer;