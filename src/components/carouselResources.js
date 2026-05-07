import '../App.css';
import news1 from "./../assets/images/news1.png";
import { useNavigate } from 'react-router-dom';


export default function CarouselResources({ data, id = "carousel" }) {
    const navigate = useNavigate();
    if (!data.length) return null;

    return (
        <div className="container container-carousel flex-grow-1">
            <div id={id} className="carousel slide">
                <div className="carousel-inner">
                    {data.map((item, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""} red-section`} key={index}>
                            <img src={item.imageURL ? item.imageURL : news1} className="red-img w-100 resource-carousel-image" alt="Red" />
                            <div className="red-content d-flex flex-column justify-content-center align-items-center">
                                <h1 className='red-title'>{item.title}</h1>
                                <p className='red-text'>{item.text}</p>
                                <div className='red-actions'>
                                    <button className="red-btn" onClick={() => navigate('/recursos-educacionais')}>Veja Mais</button>
                                </div>
                            </div>
                        </div>))}
                </div>
                {data.length > 1 && (
                    <div style={{ zIndex: 5 }}>
                        <button
                            className="carousel-control-prev button-carousel"
                            type="button"
                            data-bs-target={`#${id}`}
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" />
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button
                            className="carousel-control-next button-carousel"
                            type="button"
                            data-bs-target={`#${id}`}
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
