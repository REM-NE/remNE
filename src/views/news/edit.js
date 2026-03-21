import { onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import { createDocument, deleteDocument, subscribeToCollection, updateDocument } from "../../cotrollers/firebaseCollections";
import { auth } from "../../utils/firebaseConfig";

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

    useEffect(() => {
        const unsubscribe = subscribeToCollection("eventos-e-noticias", (data) => {
            setDocsData(data);
            setLoading(false);
        });

        return () => unsubscribe(); // limpa o listener
    }, []);

    const createNew = () => createDocument("eventos-e-noticias", {
        title: newsData.title,
        text: newsData.text,
        imageUrl: newsData.imageUrl,
        link: newsData.link,
        publishedAt: new Date(),
        createdAt: serverTimestamp()
    });

    const updateDoc = (id, data) => updateDocument("eventos-e-noticias", id, {
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl,
        link: data.link,
    });

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">
            <h2 className="text-center pt-5 mb-4">Editor da Página de Eventos e Notícias</h2>
            {!user && <p>Faça login para editar.</p>}
            <div className="createNews container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Criar nova notícia</h3>
                <InputText label="Título" data={newsData} setData={setNewsData} property="title" isANewDoc={true} disabled={!user} />
                <InputTextArea label="Texto" data={newsData} setData={setNewsData} property="text" isANewDoc={true} disabled={!user} />
                <InputText label="Link da imagem" data={newsData} setData={setNewsData} property="imageUrl" isANewDoc={true} disabled={!user} />
                <InputText label="Link externo" data={newsData} setData={setNewsData} property="link" isANewDoc={true} disabled={!user} />
                <button
                    className="btn btn-success w-100"
                    onClick={() => createNew(newsData)}
                >
                    Adicionar notícia
                </button>
            </div>

            <div className="container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Últimas notícias:</h3>

                {!docsData.length && <p>Nenhuma notícia encontrada.</p>}
                {docsData.map((item) => (
                    <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                        <div className="d-flex justify-content-between">
                            <h4>Documento: {item.id}</h4>
                            <button className="btn delete-btn botao-noticias" onClick={() => deleteDocument(item.id)}>Excluir</button>
                        </div>

                        <InputText label="Título" data={item} setData={setDocsData} property="title" isANewDoc={false} disabled={!user} />
                        <InputTextArea label="Texto" data={item} setData={setDocsData} property="text" isANewDoc={false} disabled={!user} />
                        <InputText label="Link da imagem" data={item} setData={setDocsData} property="imageUrl" isANewDoc={false} disabled={!user} />
                        <InputText label="Link externo" data={item} setData={setDocsData} property="link" isANewDoc={false} disabled={!user} />

                        {/* BOTÃO DE SALVAR POR DOCUMENTO */}
                        {user && (
                            <button
                                className="btn btn-success w-100"
                                onClick={() => updateDoc(item.id, item)}
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
