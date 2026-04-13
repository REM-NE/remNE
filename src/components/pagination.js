import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import '../App.css';

export default function Pagination({
    currentPage,
    hasNext,
    hasPrev,
    onNext,
    onPrev
}) {
    return (
        <div className="pagination">
            {hasPrev && <button
                onClick={onPrev}
                className='pagination-button'
                style={{
                    marginRight: "10px",
                    cursor: hasPrev ? "pointer" : "not-allowed"
                }}
            >
                <BsArrowLeftShort />
            </button>}
            <span className="main-title">
                {currentPage}
            </span>
            {hasNext && <button
                onClick={onNext}
                className='pagination-button'
                style={{
                    marginLeft: "10px",
                    cursor: hasNext ? "pointer" : "not-allowed"
                }}
            >
                <BsArrowRightShort />
            </button>}
        </div>
    );
}