import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebaseConfig";
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import { collection, serverTimestamp, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

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

    useEffect(() => {
        loadData();
    }, []);

    // Atualizar somente o documento alterado
    async function saveData(id, dados) {
        const ref = doc(db, "eventos-e-noticias", id);
        await updateDoc(ref, dados);
        alert(`Documento ${id} salvo!`);
    }

    const deleteData = async (id) => {   // Remover o documento
        try {
            await deleteDoc(doc(db, "eventos-e-noticias", id));
            alert(`Recurso ${id} excluído!`);
        } catch (error) {
            alert("Erro ao excluir recurso:", error);
        }
    };

    useEffect(() => {
        loadData();
        setLoading(false);
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

            // loadData();
            alert("Notícia criada com ID:", docRef.id);
        } catch (error) {
            alert("Erro ao criar notícia:", error);
        }
    };

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">
            <h2 className="text-center pt-5 mb-4">Editor da Página de Eventos e Notícias</h2>
            {!user && <p>Faça login para editar.</p>}
            <div className="createNews container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Criar nova notícia</h3>
                <InputText label="Título" data={newsData} setData={setNewsData} property="title" disabled={!user} />
                <InputTextArea label="Texto" data={newsData} setData={setNewsData} property="text" disabled={!user} />
                <InputText label="Link da imagem" data={newsData} setData={setNewsData} property="imageUrl" disabled={!user} />
                <InputText label="Link externo" data={newsData} setData={setNewsData} property="link" disabled={!user} />
                <button
                    className="btn btn-success w-100"
                    onClick={() => createNews(newsData)}
                >
                    Adicionar notícia
                </button>
            </div>

            <div className="container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Últimas notícias:</h3>

                {!docsData.length && <p>Nenhuma notícia encontrada.</p>}
                {docsData.map((item, index) => (
                    <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                        <div className="d-flex justify-content-between">
                            <h4>Documento: {item.id}</h4>
                            <button className="btn delete-btn botao-noticias" onClick={() => deleteData(item.id)}>Excluir</button>
                        </div>

                        <InputText label="Título" data={item} setData={setDocsData} property="title" disabled={!user} />
                        <InputTextArea label="Texto" data={item} setData={setDocsData} property="text" disabled={!user} />
                        <InputText label="Link da imagem" data={item} setData={setDocsData} property="imageUrl" disabled={!user} />
                        <InputText label="Link externo" data={item} setData={setDocsData} property="link" disabled={!user} />

                        {/* BOTÃO DE SALVAR POR DOCUMENTO */}
                        {user && (
                            <button
                                className="btn btn-success w-100"
                                onClick={() => saveData(item.id)}
                            >
                                Salvar alterações
                            </button>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
