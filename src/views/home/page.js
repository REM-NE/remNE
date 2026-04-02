import { useEffect, useState } from 'react';
import '../../App.css';
import PathButton from '../../components/pathButton';
import { useAuth } from '../../utils/authContext';

import { Link } from "react-router-dom";
import carouselImage1 from '../../assets/images/carousel1.png';
import newsImage1 from '../../assets/images/news1.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Carousel from '../../components/carousel';
import { getDocuments } from '../../cotrollers/firebaseCollections';

export default function Home() {

  const { currentUser } = useAuth();

  const [docsData, setDocsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadData() {
    getDocuments("home", false).then((data) => {
      setDocsData(data);
    });

    getDocuments("eventos-e-noticias", true).then((data) => {
      setNewsData(data);
    });

    getDocuments("recursos", true).then((data) => {
      setResourcesData(data);
    });

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  (function () {
    const d = document, s = d.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js"; d.head.append(s);
  })();

  return (
    <div className="home top-spacing d-flex flex-column min-vh-100">

      <Carousel images={docsData.length ? docsData[0].imagens : [carouselImage1]} id="homeCarousel" />

      <div className="container w-100 flex-grow-1 d-flex flex-row mb-5">
        {/* About Us */}
        <main className="home-about">
          <div>
            <div className="d-flex justify-content-start">
              {currentUser && <PathButton text="Editar Home" path="/home/edit" />}
            </div>
            {docsData.map((item, index) => (
              <div key={index}>
                <h1 className='main-title'>{item.titulo}</h1>
                <p className='main-text'>{item.texto}</p>
              </div>
            ))}
            <video className='video-index' width="100%" height="315" controls>
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </main >

        {/* Cards */}
        < div className="home-news justify-content-center" >
          <h1 className='main-title'>Últimas Noticias</h1>
          {
            newsData.map((item) => (
              <Link to={"eventos-e-noticias/post/" + item.id}>
                <div key={item.id} className="d-flex justify-content-center mb-4">
                  <div className="card" style={{ cursor: "pointer" }}>
                    <img src={item.image || newsImage1} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title home-card-title">{item.title}</h5>
                      {/* <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                  </p> */}
                    </div>
                  </div>
                </div>
              </Link>

            ))
          }
          <PathButton path="/eventos-e-noticias" text="Veja todas as notícias" />
        </div >
      </div >
      {/* <div className="red-section d-flex flex-column justify-content-center align-items-center container">
        <img src={red} className="red-img w-100" alt="Red" />
        <div className="red-content d-flex flex-column justify-content-center align-items-center">
          <h1 className='red-title'>O Reino de Aljabar</h1>
          <p className='red-text'>O RED O reino de Aljabar: o desafio da balança consiste em um jogo, para alunos do 4º ano do Ensino Fundamental, cuja ideia geral é utilizar relações de igualdade e desigualdade em uma balança de dois pratos para descobrir valores desconhecidos.</p>
          <div className='red-actions'>
            <button className="red-btn" onClick={() => { }}>Veja Mais</button>
          </div>
        </div>
      </div> */}
      <div class="instagram-posts">
        <h1 className='main-title'>Siga a <a href="https://www.instagram.com/remne/" target="_blank" rel="noopener noreferrer">REM-NE</a> no Instagram!</h1>
        <div data-behold-id="MZu7Iovm2aAychKp2K34"></div>
      </div>
    </div >
  );
}