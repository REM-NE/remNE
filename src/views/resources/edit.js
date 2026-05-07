import { onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import InputText from "../../components/forms/inputText";
import InputTextArea from "../../components/forms/inputTextArea";
import UploadImage from "../../components/forms/uploadImage";
import { createDocument, deleteDocument, subscribeToCollection, updateDocument } from "../../cotrollers/firebaseCollections";
import { auth } from "../../utils/firebaseConfig";

export default function ResourcesForm() {
    const [user, setUser] = useState(null);
    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const levels = ["Ensino Fundamental", "Ensino Médio", "Ensino Superior"];
    const defaultSelect = "[Selecione um nível educacional]";

    const [resourcesData, setResourcesData] = useState({
        title: "",
        text: "",
        educationalLevel: "",
        imageURL: "",
        imageFile: null,
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
        const unsubscribe = subscribeToCollection("recursos", (data) => {
            setDocsData(data);
            setLoading(false);
        });

        return () => unsubscribe(); // limpa o listener
    }, []);

    const createNew = () => createDocument("recursos", {
        title: resourcesData.title,
        text: resourcesData.text,
        educationalLevel: resourcesData.educationalLevel !== defaultSelect ? resourcesData.educationalLevel : "",
        imageURL: resourcesData.imageURL,
        imageFile: resourcesData.imageFile,
        link: resourcesData.link,
        publishedAt: new Date(),
        createdAt: serverTimestamp()
    });

    const updateDoc = (id, data) => updateDocument("recursos", id, {
        title: data.title,
        text: data.text,
        educationalLevel: data.educationalLevel !== defaultSelect ? data.educationalLevel : "",
        imageURL: data.imageURL,
        imageFile: data.imageFile,
        link: data.link,
    });


    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">
            <h2 className="text-center pt-5 mb-4">Editor da Página de Recursos Educacionais</h2>
            {!user && <p>Faça login para editar.</p>}
            <div className="createNews container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Criar novo recurso</h3>
                <InputText label="Título" data={resourcesData} setData={setResourcesData} property="title" isANewDoc={true} disabled={!user} />
                <InputTextArea label="Texto" data={resourcesData} setData={setResourcesData} property="text" isANewDoc={true} disabled={!user} />
                <select
                    className="form-control mb-2"
                    value={resourcesData.educationalLevel === "" ? defaultSelect : resourcesData.educationalLevel}
                    onChange={(e) => setResourcesData({ ...resourcesData, educationalLevel: e.target.value })}
                >
                    <option value="">
                        {defaultSelect}
                    </option>
                    {levels.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                    ))}
                </select>
                <UploadImage label="Imagem" data={resourcesData} setData={setResourcesData} isANewDoc={true} disabled={!user} />
                <InputText label="Link externo" data={resourcesData} setData={setResourcesData} property="link" isANewDoc={true} disabled={!user} />
                <button
                    className="btn btn-success w-100"
                    onClick={() => createNew(resourcesData)}
                >
                    Adicionar recurso
                </button>
            </div>

            <div className="container library flex-grow-1 mt-4 p-3 border rounded">
                <h3>Últimos recursos:</h3>
                {!docsData.length && <p>Nenhum recurso encontrado.</p>}
                {docsData.map((item) => (
                    <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                        <div className="d-flex justify-content-between">
                            <h4>Documento: {item.id}</h4>
                            <button className="btn delete-btn botao-noticias" onClick={() => deleteDocument(item.id)}>Excluir</button>
                        </div>

                        <InputText label="Título" data={item} setData={setDocsData} property="title" isANewDoc={false} disabled={!user} />
                        <InputTextArea label="Texto" data={item} setData={setDocsData} property="text" isANewDoc={false} disabled={!user} />
                        <select
                            className="form-control mb-2"
                            value={item.educationalLevel === "" ? defaultSelect : item.educationalLevel}
                            onChange={(e) => {
                                setDocsData((prev) =>
                                    prev.map((item) => {
                                        item.educationalLevel = e.target.value;
                                        return item;
                                    })
                                );
                            }}
                        >
                            <option value="">
                                {defaultSelect}
                            </option>
                            {levels.map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
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
