import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import '../../App.css';
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import UploadImage from "../../components/forms/uploadImage";
import { deleteDocument } from "../../cotrollers/firebaseCollections";
import { auth, db } from "../../utils/firebaseConfig";
import './about.css';

export default function AboutForm() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    text: "",
    type: "text" // tipo padrão
  });

  const collectionName = "about";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function loadData() {
    try {
      const q = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc"),
      )
      const snap = await getDocs(q);
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setData(lista.reverse());
    } catch (err) {
      console.error("Erro ao buscar dados do Firestore:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createBlock() {
    if (!user) return;
    if (!form.title && !form.text) return;

    try {
      await addDoc(collection(db, collectionName), { ...form, createdAt: serverTimestamp() });
      setForm({ title: "", text: "", type: "text" });
      loadData();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar bloco");
    }
  }

  async function saveBlock(id, item) {
    if (!user) return;

    try {
      await updateDoc(doc(db, collectionName, id), item);
      alert("Documento " + item.title + " atualizado!");

      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return null;
  // if (loading) return <p>Carregando...</p>;

  return (
    <div className="container about main top-spacing pb-5">
      <h2 className="text-center pt-5 mb-4">Editor da Página do Sobre</h2>

      <div className="container flex-grow-1 mt-4 p-3 border rounded">
        {/* Formulário para adicionar novo bloco */}
        <InputText label="Título" data={form} setData={setForm} property="title" isANewDoc={true} disabled={!user} />
        <InputTextArea label="Texto" data={form} setData={setForm} property="text" isANewDoc={true} disabled={!user} />
        <select
          className="form-control mb-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="text">Texto</option>
          <option value="card">Card</option>
        </select>
        <button className="btn btn-success w-100 mb-3" onClick={createBlock}>
          Adicionar texto
        </button>
      </div>

      <div className="container flex-grow-1 mt-4 p-3 border rounded">
        <h3>Conteúdo da Página do Sobre:</h3>
        {/* Blocos existentes para edição */}
        {data.map((item, i) => (
          <div key={item.id} className="container flex-grow-1 mt-4 p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h4>Documento: {item.id}</h4>
              <button className="btn delete-btn botao-noticias" onClick={() => deleteDocument(collectionName, item.id)}>
                Excluir
              </button>
            </div>
            <InputText label="Título" data={item} setData={setData} property="title" isANewDoc={false} disabled={!user} />
            <InputTextArea label="Texto" data={item} setData={setData} property="text" isANewDoc={false} disabled={!user} />
            {/* <UploadImage image={item.image} /> */}
            <select
              className="form-control mb-2"
              value={item.type || "text"}
              onChange={(e) => {
                const novo = [...data];
                novo[i].type = e.target.value;
                setData(novo);
              }}
            >
              <option value="text">Texto</option>
              <option value="card">Card</option>
            </select>
            <UploadImage label="Imagem" data={item} setData={setData} isANewDoc={false} disabled={!user} />
            <div className="d-flex pt-2">
              <button className="btn  btn-success flex-grow-1" onClick={() => saveBlock(item.id, item)}>
                Salvar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
