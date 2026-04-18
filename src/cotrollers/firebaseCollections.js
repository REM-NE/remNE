import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    startAfter,
    startAt,
    updateDoc
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

// Cloudinary - start

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "standard");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyp5jzbal/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    if (!res.ok || data.error) {
        console.error("Erro Cloudinary:", data);
        throw new Error(data.error?.message || "Erro no upload");
    }

    return data.secure_url;
};

// Cloudinary - end

// Firebase Firestore - start

export const subscribeToCollection = (collectionName, callback) => { //Usado na edição, para atualizar a lista de documentos em tempo real
    const q = query(
        collection(db, collectionName),
        orderBy("publishedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        callback(data);
    });

    return unsubscribe;
};

// GET by ID - Usado nos posts
export const getDocumentById = async (collectionName, id) => {
    try {
        const ref = doc(db, collectionName, id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return { id: snap.id, ...snap.data() };
        } else {
            throw new Error("Documento não encontrado");
        }
    } catch (error) {
        throw error;
    }
}

// GET
export const getDocuments = async (collectionName, orderByField) => {
    try {
        let q;
        if (orderByField) {
            q = query(
                collection(db, collectionName),
                orderBy("publishedAt", "desc"),
                limit(10)
            )
        } else {
            q = collection(db, collectionName)
        }
        const snap = await getDocs(q);
        const lastDoc = snap.docs[snap.docs.length - 1];

        return {
            docs: snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })),
            lastDoc
        };
    } catch (error) {
        throw error;
    }
}

export const getPrevPage = async (cursor, collectionName) => {
    const ref = collection(db, collectionName);

    let q;

    if (cursor) {
        q = query(
            ref,
            orderBy("createdAt", "desc"),
            startAt(cursor),
            limit(10)
        );
    } else {
        q = query(
            ref,
            orderBy("createdAt", "desc"),
            limit(10)
        );
    }

    const snap = await getDocs(q);

    const docs = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
    }));

    return {
        docs,
        firstDoc: snap.docs[0],
        lastDoc: snap.docs[snap.docs.length - 1]
    };
};

export const getNextPage = async (lastDoc, collectionName) => {
    try {
        let q;

        if (lastDoc) {
            q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
                startAfter(lastDoc),
                limit(10)
            );
        } else {
            q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
                limit(10)
            );
        }

        const snap = await getDocs(q);

        const docs = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));

        const firstDoc = snap.docs.length > 0 ? snap.docs[0] : null;
        const lastDocResult = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

        return {
            docs,
            firstDoc,
            lastDoc: lastDocResult
        };

    } catch (error) {
        throw error;
    }
};

// CREATE
export const createDocument = async (collectionName, data) => {
    try {
        let imageURL = "";

        if (data.imageURL) {
            imageURL = await uploadImage(data.imageFile);
        }
        // console.log("Criando documento com dados:", data, "e imagem URL:", imageURL);

        const docRef = await addDoc(collection(db, collectionName), {
            title: data.title,
            text: data.text,
            imageURL, // Faz upload da nova imagem no cloudinary e obtém a URL
            link: data.link,
            createdAt: serverTimestamp(),
            publishedAt: serverTimestamp()
        });

        alert("Documento " + data.title + " criado na coleção: " + collectionName);
        return docRef.id;
    } catch (error) {
        throw error;
    }
};

// UPDATE
export const updateDocument = async (collectionName, id, data) => {
    try {
        const ref = doc(db, collectionName, id);

        let imageURL = data.imageURL;

        if (data.imageFile instanceof File) {
            imageURL = await uploadImage(data.imageFile);
        }

        const updatePayload = {
            title: data.title,
            text: data.text,
            link: data.link,
            publishedAt: serverTimestamp(),
            imageURL
        };

        await updateDoc(ref, updatePayload);

        alert("Documento " + data.title + " atualizado!");
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar documento");
    }
};

// DELETE
export const deleteDocument = async (collectionName, id) => {
    if (!window.confirm("Tem certeza que quer deletar este documento?")) return;

    try {
        await deleteDoc(doc(db, collectionName, id));

        alert("Documento excluído da coleção:" + collectionName);
    } catch (error) {
        throw error;
    }
};

// Firebase Firestore - end