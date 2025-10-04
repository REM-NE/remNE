import '../../App.css';
import './publications.css';

function PublicationsPage() {

    const cardGridObjects = [
        {
            title: "Card title 1",
            text: "Some quick example text to build on the card title and make up the bulk of the card’s content.",
            img: ""
        },
        {
            title: "Card title 2",
            text: "Some quick example text to build on the card title and make up the bulk of the card’s content.",
            img: ""
        },
        {
            title: "Card title 3",
            text: "Some quick example text to build on the card title and make up the bulk of the card’s content.",
            img: ""
        }
    ]

    return (
        <div class="highlight home top-spacing">
            <div className="row justify-content-center gx-4 mt-4 container flex-grow-1">
                <div className="card-main mb-4">
                    <div className="card-inside">
                        {cardGridObjects.map((item, id) => (
                            <div className="row-main card-list">
                                <div className="column">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.text}</p>
                                    <a href="#" className="flex-end btn btn-primary">Veja mais</a>
                                </div>
                                <img alt="" className='publication-img'></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PublicationsPage;