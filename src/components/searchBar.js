import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SearchBar({ term, setTerm, collectionName }) {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`${collectionName}?search=${encodeURIComponent(term)}`);
    };

    return (
        <div className="search-container container">
            <input
                className="search-input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Buscar..."
            />
            <button
                className="search-button"
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
        </div>
    );
}