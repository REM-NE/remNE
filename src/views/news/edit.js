import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebaseConfig";

export default function NewsForm() {
    const [user, setUser] = useState(null);
    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newsData, setNewsData] = useState({
        title: "",
        text: "",
        imageUrl: "",
        link: "",
    });

    // Detectar usuário logado
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    // Carregar TODOS os documentos da coleção "home"
    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "eventos-e-noticias");
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

    const createNews = async (newsData) => {
        try {
            const docRef = await addDoc(collection(db, "eventos-e-noticias"), {
                title: newsData.title,
                text: newsData.text,
                imageUrl: newsData.imageUrl,
                link: newsData.link,
                publishedAt: new Date(),
                createdAt: serverTimestamp()
            });

            alert("Notícia criada com ID:", docRef.id);
        } catch (error) {
            alert("Erro ao criar notícia:", error);
        }
    };

    // Atualizar somente o documento alterado
    async function salvar(id, dados) {
        const ref = doc(db, "eventos-e-noticias", id);
        await updateDoc(ref, dados);
        alert(`Documento ${id} salvo!`);
    }

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">

            <h2 className="text-center pt-5 mb-4">Editor da Página Home</h2>

            {!user && <p>Faça login para editar.</p>}

            <div className="createNews">
                <h3>Criar nova notícia</h3>
                <div className="mb-3">
                    <label>Título:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newsData.title}
                        disabled={!user}
                        onChange={(e) => {
                            setNewsData({ ...newsData, title: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label>Texto:</label>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows={4}
                            value={newsData.text}
                            disabled={!user}
                            onChange={(e) => {
                                setNewsData({ ...newsData, text: e.target.value });
                            }}
                        ></textarea>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Link da imagem:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newsData.imageUrl}
                        disabled={!user}
                        onChange={(e) => {
                            setNewsData({ ...newsData, imageUrl: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label>Link externo:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newsData.link}
                        disabled={!user}
                        onChange={(e) => {
                            setNewsData({ ...newsData, link: e.target.value });
                        }}
                    />
                </div>
                <button
                    className="btn btn-success w-100"
                    onClick={() => createNews(newsData)}
                >
                    Adicionar notícia
                </button>
            </div>

            {docsData.map((item, index) => (
                <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                    <h4>Documento: {item.id}</h4>

                    <div className="mb-3">
                        <label>Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={item.title || ""}
                            disabled={!user}
                            onChange={(e) => {
                                const novo = [...docsData];
                                novo[index].title = e.target.value;
                                setDocsData(novo);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Texto:</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            disabled={!user}
                            value={item.text || ""}
                            onChange={(e) => {
                                const novo = [...docsData];
                                novo[index].text = e.target.value;
                                setDocsData(novo);
                            }}
                        ></textarea>
                    </div>

                    {/* BOTÃO DE SALVAR POR DOCUMENTO */}
                    {user && (
                        <button
                            className="btn btn-success w-100"
                            onClick={() => salvar(item.id, item)}
                        >
                            Salvar alterações
                        </button>
                    )}

                </div>
            ))}
        </div>
    );
}
