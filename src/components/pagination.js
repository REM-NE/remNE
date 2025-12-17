import '../App.css';

export default function Pagination({ totalPages, currentPage, onChange }) {
    return (
        <div className='pagination'>
            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                    <div className='main-title' key={page}>
                        <button
                            onClick={() => onChange(page)}
                            style={{
                                padding: "6px",
                                border: "unset",
                                background: "unset",
                                fontWeight: page === currentPage ? "bold" : "normal",
                                cursor: "pointer"
                            }}
                        >
                            {page}
                        </button>
                        {page < totalPages && <span>,</span>}
                    </div>
                );
            })}
        </div>
    );
}
