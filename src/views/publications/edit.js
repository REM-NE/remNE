import { onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import UploadImage from "../../components/forms/uploadImage";
import { createDocument, deleteDocument, subscribeToCollection, updateDocument } from "../../cotrollers/firebaseCollections";
import { auth } from "../../utils/firebaseConfig";

export default function NewsForm() {
    const [user, setUser] = useState(null);
    const [docsData, setDocsData] = useState([]); // Lista de documentos do Firestore
    const [loading, setLoading] = useState(true);

    const [newPublicationData, setNewPublicationData] = useState({
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
        const unsubscribe = subscribeToCollection("publicacoes", (data) => {
            setDocsData(data);
            setLoading(false);
        });

        return () => unsubscribe(); // limpa o listener
    }, []);

    const createNew = () => createDocument("publicacoes", {
        title: newPublicationData.title,
        text: newPublicationData.text,
        imageUrl: newPublicationData.imageUrl,
        link: newPublicationData.link,
        publishedAt: new Date(),
        createdAt: serverTimestamp()
    });

    const updateDoc = (id, data) => updateDocument("publicacoes", id, {
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl,
        link: data.link,
    });

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">
            <h2 className="text-center pt-5 mb-4">Editor da Página de Publicações Científicas</h2>
            {!user && <p>Faça login para editar.</p>}
            <div className="createNews container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Criar nova publicação</h3>
                <InputText label="Título" data={newPublicationData} setData={setNewPublicationData} property="title" isANewDoc={true} disabled={!user} />
                <InputTextArea label="Texto" data={newPublicationData} setData={setNewPublicationData} property="text" isANewDoc={true} disabled={!user} />
                <UploadImage label="Imagem" data={newPublicationData} setData={setNewPublicationData} isANewDoc={true} disabled={!user} />
                <InputText label="Link externo" data={newPublicationData} setData={setNewPublicationData} property="link" isANewDoc={true} disabled={!user} />
                <button
                    className="btn btn-success w-100"
                    // onClick={() => console.log(newPublicationData.imageUrl)}
                    onClick={() => createNew()}
                >
                    Adicionar publicação
                </button>
            </div>

            <div className="container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Últimas publicações:</h3>

                {!docsData.length && <p>Nenhuma publicação encontrada.</p>}
                {docsData && docsData.map((item) => (
                    <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                        <div className="d-flex justify-content-between">
                            <h4>Documento: {item.id}</h4>
                            <button className="btn delete-btn botao-noticias" onClick={() => deleteDocument("publicacoes", item.id)}>Excluir</button>
                        </div>
                        <InputText label="Título" data={item} setData={setDocsData} property="title" isANewDoc={false} disabled={!user} />
                        <InputTextArea label="Texto" data={item} setData={setDocsData} property="text" isANewDoc={false} disabled={!user} />
                        <UploadImage label="Imagem" data={item} setData={setDocsData} isANewDoc={false} disabled={!user} />
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
