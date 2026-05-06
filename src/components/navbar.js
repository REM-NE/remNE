import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../utils/authContext';

function Navbar({ menuItems }) {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    // const [searchParams] = useSearchParams();
    // const searchTerm = searchParams.get("search");
    // const [term, setTerm] = useState(searchTerm || "");

    function NavBarButtons() {
        return (
            <>
                {menuItems.map((button, index) => (
                    <Link key={index} to={button.path}>
                        <div className={location.pathname === button.path ? "active" : ""}>
                            <p>{button.title}</p>
                        </div>
                    </Link>
                ))}
            </>
        );
    }

    // const checkSearchAvailability = () => {
    //     const button = menuObject.find((b) => b.path === location.pathname);
    //     return button?.search || false;
    // };

    return (
        <div className="header">
            <div className="row-header container">
                <div className="start-header">
                    <a href='/'><img className="logo" src={logo} alt="logo" /></a>
                </div>
                <div className="row-header bottom-header">
                    <div className="column">
                        <div className="row-header navbar-menu">
                            <NavBarButtons />
                        </div>
                        {/* {checkSearchAvailability() && <SearchBar term={term} setTerm={setTerm} collectionName={location.pathname} />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;