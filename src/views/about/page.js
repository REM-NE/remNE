import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import '../../App.css';
import PathButton from "../../components/pathButton";
import { useAuth } from "../../utils/authContext";
import { db } from "../../utils/firebaseConfig";
import './about.css';

export default function AboutPage() {
  const { currentUser } = useAuth();

  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const collectionName = "about";

  useEffect(() => {
    async function loadData() {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc"),
        )
        const snap = await getDocs(q);
        const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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
    <div className="about main top-spacing pb-5">
      <div className="container mt-5">
        {currentUser && <PathButton text="Editar Página do Sobre" path="/sobre/edit" />}
      </div>
      {/* Conteúdo do Firestore */}
      {aboutData.length === 0 && <p className="container">Nenhum conteúdo encontrado.</p>}
      {aboutData.map(item => (
        <div key={item.id} className={`container ${item.type === 'card' ? 'about-authors' : ''}`}>
          {item.title && <h2 className="mb-2">{item.title}</h2>}
          {item.text && <p className="text">{item.text}</p>}
        </div>
      ))}
    </div>
  );
}