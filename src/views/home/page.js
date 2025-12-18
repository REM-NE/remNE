import { useEffect, useState } from 'react';
import '../../App.css';
import EditButton from '../../components/editButton';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";

import carouselImage1 from '../../assets/images/carousel1.png';
import newsImage1 from '../../assets/images/news1.png';
import red from '../../assets/images/red.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Home() {

  const { currentUser } = useAuth();

  const [docsData, setDocsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const ref = collection(db, "home");
      const snap = await getDocs(ref);

      const lista = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setDocsData(lista);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="home top-spacing d-flex flex-column min-vh-100">

      {/* Conteúdo */}
      <div className="container-carousel flex-grow-1">
        {/* Carousel */}
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={carouselImage1}
                className="d-block w-100 h-80"
                alt="..."
                style={{ height: "496px", objectFit: "cover" }}
              />

            </div>
            <div className="carousel-item">
              <img
                src={carouselImage1}
                className="d-block w-100 h-80"
                alt="..."
                style={{ height: "496px", objectFit: "cover" }}
              />

            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container w-100 flex-grow-1 d-flex flex-row mb-5">
        {/* About Us */}
        <main className="home-about">
          <div>
            {currentUser && <EditButton path="/home/edit" />}
            {docsData.map((item, index) => (
              <div key={index}>
                <h1 className='main-title'>{item.titulo}</h1>
                <p className='main-text'>{item.texto}</p>
              </div>
            ))}
          </div>
          <div>
            <video className='video-index' width="100%" height="315" controls>
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </main>

        {/* Cards */}
        <div className="justify-content-center">
          <h1 className='main-title'>Últimas Noticias</h1>
          {[1, 2, 3].map((item) => (
            // <button className="" onClick={() => {}}>
            <div key={item} className="d-flex justify-content-center mb-4">
              <div className="card" onClick={() => { }} style={{ cursor: "pointer" }}>
                <img src={newsImage1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title home-card-title">Lorem Ipsum is simply dummy text of the printing </h5>
                  {/* <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                  </p> */}
                  {/* <a href="#" className="btn btn-primary">Veja mais</a> */}
                </div>
              </div>
            </div>
            // </button>

          ))}
          <button className="botao-noticias" onClick={() => { }}>Ver todas as notícias</button>
        </div>
      </div>
      <div className="red-section d-flex flex-column justify-content-center align-items-center container">
        <img src={red} className="red-img w-100" alt="Red" />
        <div className="red-content d-flex flex-column justify-content-center align-items-center">
          <h1 className='red-title'>O Reino de Aljabar</h1>
          <p className='red-text'>O RED O reino de Aljabar: o desafio da balança consiste em um jogo, para alunos do 4º ano do Ensino Fundamental, cuja ideia geral é utilizar relações de igualdade e desigualdade em uma balança de dois pratos para descobrir valores desconhecidos.</p>
          <div className='red-actions'>
            <button className="red-btn" onClick={() => { }}>Veja Mais</button>
          </div>
        </div>
      </div>
    </div>
  );
}