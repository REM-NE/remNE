import { useEffect, useState } from 'react';
import '../../App.css';
import EditButton from '../../components/editButton';
import { useAuth } from '../../utils/authContext';
import { collection, db, getDocs } from "../../utils/firebaseConfig";

import carouselImage1 from '../../assets/images/carousel1.png';
import newsImage1 from '../../assets/images/news1.png';

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
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">REM</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

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

      <div className="container w-100 flex-grow-1 d-flex">
        {/* About Us */}
        <main className="home-about">
          <div>
            {currentUser && <EditButton />}
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
                  <h5 className="card-title">Lorem Ipsum is simply dummy text of the printing </h5>
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
    </div>
  );
}