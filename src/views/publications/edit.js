import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import { auth, db } from "../../utils/firebaseConfig";

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
        // loadData("publicacoes");
        setLoading(false);
    }, []);

    const createNewPublication = async (newPublicationData) => {
        try {
            const docRef = await addDoc(collection(db, "publicacoes"), {
                title: newPublicationData.title,
                text: newPublicationData.text,
                imageUrl: newPublicationData.imageUrl,
                link: newPublicationData.link,
                publishedAt: new Date(),
                createdAt: serverTimestamp()
            });

            // loadData();
            alert("Notícia criada com ID:", docRef.id);
        } catch (error) {
            alert("Erro ao criar notícia:", error);
        }
    };

    async function saveData(id, dados) {
        const ref = doc(db, "publicacoes", id);
        await updateDoc(ref, dados);
        alert(`Documento ${id} salvo!`);
    }

    const deleteData = async (id) => {   // Remover o documento
        try {
            await deleteDoc(doc(db, "publicacoes", id));
            alert(`Recurso ${id} excluído!`);
        } catch (error) {
            alert("Erro ao excluir recurso:", error);
        }
    };

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">
            <h2 className="text-center pt-5 mb-4">Editor da Página de Publicações Científicas</h2>
            {!user && <p>Faça login para editar.</p>}
            <div className="createNews container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Criar nova notícia</h3>
                <InputText label="Título" data={newPublicationData} setData={setNewPublicationData} property="title" disabled={!user} />
                <InputTextArea label="Texto" data={newPublicationData} setData={setNewPublicationData} property="text" disabled={!user} />
                <InputText label="Link da imagem" data={newPublicationData} setData={setNewPublicationData} property="imageUrl" disabled={!user} />
                <InputText label="Link externo" data={newPublicationData} setData={setNewPublicationData} property="link" disabled={!user} />
                <button
                    className="btn btn-success w-100"
                    onClick={() => createNewPublication(newPublicationData)}
                >
                    Adicionar publicação
                </button>
            </div>

            <div className="container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Últimas notícias:</h3>

                {!docsData.length && <p>Nenhuma notícia encontrada.</p>}
                {docsData && docsData.map((item) => (
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
                                onClick={() => saveData(item.id, item, "publicacoes")}
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
