import '../../App.css';
import './highlights.css';

function HighlightsPage() {

    const cardUpperTexts = [
        { text: "Ensino Fundamental" },
        { text: "Ensino Médio" },
        { text: "Ensino Superior" }
    ]

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
        <div class="highlight main top-spacing-highlight">
            <div className="row justify-content-center gx-4 mt-4 container flex-grow-1">
                {cardUpperTexts.map((item, id) => (
                    <div key={id} className="col-md-4 d-flex justify-content-center mb-4">
                        <div className="card" style={{ width: "30rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.text}</h5>
                                {/* <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                                </p> */}
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="card-main mb-4">
                    <div className="card-inside">
                        {cardGridObjects.map((item, id) => (
                            <div className="row-main card-list">
                                <img alt="" className='circle-img'></img>
                                <div className="column">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.text}</p>
                                    <div className="card-button">
                                        <a href="#" className="flex-end btn btn-primary">Veja mais</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HighlightsPage;