// import '../../App.css';

// function Library() {
//     return (
//         <div class="library home">Biblioteca</div>
//     )
// }

// export default Library;

import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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

    // Carregar TODOS os documentos da coleção "home"
    useEffect(() => {
        async function loadData() {
            const ref = collection(db, "home");
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

    // Atualizar somente o documento alterado
    async function salvar(id, dados) {
        const ref = doc(db, "home", id);
        await updateDoc(ref, dados);
        alert(`Documento ${id} salvo!`);
    }

    if (loading) return <p className="container flex-grow-1 library main">Carregando...</p>;

    return (
        <div className="container main top-spacing pb-5">

            <h2 className="text-center pt-5 mb-4">Editor da Página Home</h2>

            {!user && <p>Faça login para editar.</p>}

            {docsData.map((item, index) => (
                <div key={item.id} className="container library flex-grow-1 mt-4 p-3 border rounded">

                    <h4>Documento: {item.id}</h4>

                    {/* TÍTULO */}
                    <div className="mb-3">
                        <label>Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={item.titulo || ""}
                            disabled={!user}
                            onChange={(e) => {
                                const novo = [...docsData];
                                novo[index].titulo = e.target.value;
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
                            value={item.texto || ""}
                            onChange={(e) => {
                                const novo = [...docsData];
                                novo[index].texto = e.target.value;
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
