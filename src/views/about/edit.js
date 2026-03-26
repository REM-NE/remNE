import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";

export default function NewsForm() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    text: "",
    type: "text" // tipo padrão
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "about"));
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(lista.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createBlock() {
    if (!user) return;
    if (!form.title && !form.text) return;

    try {
      await addDoc(collection(db, "about"), { ...form, createdAt: serverTimestamp() });
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
      await updateDoc(doc(db, "about", id), item);
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBlock(id) {
    if (!user) return;

    if (!window.confirm("Tem certeza que quer deletar este bloco?")) return;

    try {
      await deleteDoc(doc(db, "about", id));
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return null;
  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container border p-3 mb-4 rounded">
      <h3>Editor da Página About</h3>

      {/* Formulário para adicionar novo bloco */}
      <input
        className="form-control mb-2"
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Texto"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <select
        className="form-control mb-2"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="text">Texto</option>
        <option value="card">Card</option>
      </select>
      <button className="btn btn-success w-100 mb-3" onClick={createBlock}>
        Adicionar bloco
      </button>

      {/* Blocos existentes para edição */}
      {data.map((item, i) => (
        <div key={item.id} className="border p-2 mb-3 rounded">
          <input
            className="form-control mb-2"
            value={item.title || ""}
            onChange={(e) => {
              const novo = [...data];
              novo[i].title = e.target.value;
              setData(novo);
            }}
          />
          <textarea
            className="form-control mb-2"
            value={item.text || ""}
            onChange={(e) => {
              const novo = [...data];
              novo[i].text = e.target.value;
              setData(novo);
            }}
          />
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
          <div className="d-flex gap-2">
            <button className="btn btn-primary flex-grow-1" onClick={() => saveBlock(item.id, item)}>
              Salvar
            </button>
            <button className="btn btn-danger flex-grow-1" onClick={() => deleteBlock(item.id)}>
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}