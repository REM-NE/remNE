import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import NewsForm from './edit'; // formulário de adicionar/editar
import '../../App.css';
import './about.css';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const snap = await getDocs(collection(db, "about"));
        const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAboutData(lista.reverse());
      } catch (err) {
        console.error("Erro ao buscar dados do Firestore:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p className="container main">Carregando...</p>;

  return (
    <div className="about main top-spacing pt-5 pb-5">
      {/* Formulário de edição (aparece apenas se logado) */}
      <NewsForm />

      {/* Conteúdo do Firestore */}
      {aboutData.length === 0 && <p className="container">Nenhum conteúdo encontrado.</p>}
      {aboutData.map(item => (
        <div key={item.id} className={`container mb-5 ${item.type === 'card' ? 'card-block' : ''}`}>
          {item.title && <h2 className="mb-2">{item.title}</h2>}
          {item.text && <p className="text">{item.text}</p>}
        </div>
      ))}
    </div>
  );
}