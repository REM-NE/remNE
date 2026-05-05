import { useNavigate } from "react-router-dom";

export default function SearchBar({ term, setTerm, collectionName }) {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`${collectionName}?search=${encodeURIComponent(term)}`);
    };

    return (
        <div>
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button onClick={handleSearch}>
                Buscar
            </button>
        </div>
    );
}