import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SearchBar({ term, setTerm, collectionName, suggestions = [] }) {
    const navigate = useNavigate();
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = useMemo(() => {
        const value = term.trim().toLowerCase();

        if (!value) return [];

        return suggestions
            .filter((item) => item?.title?.toLowerCase().includes(value))
            .slice(0, 6);
    }, [suggestions, term]);

    const updateSearch = (value) => {
        const cleanValue = value.trim();
        setTerm(cleanValue);

        if (!cleanValue) {
            navigate(collectionName);
            return;
        }

        navigate(`${collectionName}?search=${encodeURIComponent(cleanValue)}`);
    };

    const handleSearch = () => {
        updateSearch(term);
    };

    const handleSelectSuggestion = (value) => {
        setTerm(value);
        setShowSuggestions(false);
        navigate(`${collectionName}?search=${encodeURIComponent(value)}`);
    };

    return (
        <div className="search-container container">
            <div className="search-wrapper">
                <div className="search-input-group">
                    <input
                        className="search-input"
                        value={term}
                        onChange={(e) => {
                            setShowSuggestions(true);
                            updateSearch(e.target.value);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                        placeholder="Buscar..."
                    />
                    <button
                        className="search-button"
                        onClick={handleSearch}
                        type="button"
                    >
                        <FaSearch />
                    </button>
                </div>

                {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="search-suggestions" role="listbox">
                        {filteredSuggestions.map((item, index) => (
                            <li key={item.id || `${item.title}-${index}`}>
                                <button
                                    type="button"
                                    className="search-suggestion-item"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => handleSelectSuggestion(item.title)}
                                >
                                    {item.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}