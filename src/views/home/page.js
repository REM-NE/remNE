import { useEffect, useState } from 'react';
import '../../App.css';
import PathButton from '../../components/pathButton';
import { useAuth } from '../../utils/authContext';

import { Link } from "react-router-dom";
import newsImage1 from '../../assets/images/news1.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Carousel from '../../components/carousel';
import CarouselResources from '../../components/carouselResources';
import { getDocuments } from '../../cotrollers/firebaseCollections';
import './home.css';

export default function Home() {

  const { currentUser } = useAuth();

  const [docsData, setDocsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(url.split("?")[1] || "");
      const videoId = params.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    return url;
  };

  const loadData = async () => {
    try {
      getDocuments("home", false).then((data) => {
        setDocsData(data.docs);
      });

      getDocuments("eventos-e-noticias", true).then((data) => {
        setNewsData(data.docs);
      });

      getDocuments("recursos", true).then((data) => {
        // console.log("Recursos carregados:", data);
        setResourcesData(data.docs);
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
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

      {docsData[0] && <Carousel images={docsData[0].images} id="homeCarousel" />}
      <div className="container w-100 flex-grow-1 home-content mb-5">
        {/* About Us */}
        <main className="home-about">
          <div>
            <div className="d-flex justify-content-start">
              {currentUser && <PathButton text="Editar Home" path="/home/edit" />}
            </div>
            {docsData.map((item, index) => (
              <div key={index}>
                <div>
                  <h1 className='main-title'>{item.title}</h1>
                  <p className='main-text'>{item.text}</p>
                </div>
                {item.videoURL && (
                  <iframe
                    className="home-video"
                    width="100%"
                    height="325"
                    src={getEmbedUrl(item.videoURL)}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ))}

          </div>
        </main >

        {/* Cards */}
        <div className="home-news justify-content-center">
          <h1 className='main-title'>Últimas Noticias</h1>
          <div className="home-news-list">
            {newsData.map((item) => (
              <Link key={item.id} to={"eventos-e-noticias/post/" + item.id}>
                <div className="d-flex justify-content-center mb-4">
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
            ))}
          </div>
          <PathButton path="/eventos-e-noticias" text="Veja todas as notícias" />
        </div>
      </div >
      {Array.isArray(resourcesData) && <CarouselResources data={resourcesData} id="resourcesCarousel" />}
      <div className="instagram-posts">
        <h1 className='main-title'>Siga a <a href="https://www.instagram.com/remne/" target="_blank" rel="noopener noreferrer">REM-NE</a> no Instagram!</h1>
        <div data-behold-id="MZu7Iovm2aAychKp2K34"></div>
      </div>
    </div >
  );
}
