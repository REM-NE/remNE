import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import UploadImage from "../../components/forms/uploadImage";
import { uploadImage } from "../../cotrollers/firebaseCollections";
import { auth, db } from "../../utils/firebaseConfig";

export default function HomeForm() {
    const [user, setUser] = useState(null);
    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Detectar usuário logado
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    async function loadData() {
        const ref = collection(db, "home");
        const snap = await getDocs(ref);

        const listaHome = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));

        setDocsData(listaHome);
        setLoading(false);
    }

    // Carregar TODOS os documentos da coleção "home"
    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);

    async function saveData(id, dados) {
        const ref = doc(db, "home", id);

        const updatedImages = await Promise.all(
            (dados.images).map(async (img) => {
                if (img.imageFile instanceof File) {
                    const { url, publicId } = await uploadImage(img.imageFile, img.imagePublicId || null);

                    return {
                        ...img,
                        imageURL: url,
                        imagePublicId: publicId,
                        // imageFile: undefined
                    };
                }
                return {
                    imageURL: img.imageURL,
                    imagePublicId: img.imagePublicId || ""
                };
            })
        );

        const payload = {
            title: dados.title || "",
            text: dados.text || "",
            link: dados.link || "",
            videoURL: dados.videoURL || "",
            publishedAt: serverTimestamp(),
            images: updatedImages
        };

        // console.log("Payload para salvar:", payload);

        await updateDoc(ref, payload);

        alert(`Documento ${id} salvo!`);
    }

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">

            <h2 className="text-center pt-5 mb-4">Editor da Página Home</h2>

            {!user && <p>Faça login para editar.</p>}

            {docsData.map((item, index) => (
                <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">
                    {item.images && item.images.map((image, imageIndex) => (
                        <UploadImage key={imageIndex} label="Imagem" data={item} setData={setDocsData} isANewDoc={false} disabled={!user} isArray={true} index={imageIndex} />
                    ))}
                    {/* TÍTULO */}
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

                    {/* TEXTO */}
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

                    <div className="mb-3">
                        <label>Link para o video:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={item.videoURL || ""}
                            disabled={!user}
                            onChange={(e) => {
                                const novo = [...docsData];
                                novo[index].videoURL = e.target.value;
                                setDocsData(novo);
                            }}
                        />
                    </div>

                    {/* BOTÃO DE SALVAR POR DOCUMENTO */}
                    {user && (
                        <button
                            className="btn btn-success w-100"
                            onClick={() => saveData(item.id, item)}
                        >
                            Salvar alterações
                        </button>
                    )}

                </div>
            ))}
        </div>
    );
}
