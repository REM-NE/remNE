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
    updateDoc
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

// Cloudinary - start

const uploadImage = async (file) => { // Faz upload da imagem para o Cloudinary e retorna a URL
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "standard"); //standard é o preset da home

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyp5jzbal/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    console.log("Resposta do upload da imagem:", data);

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
        const newLastDoc = snap.docs[snap.docs.length - 1];

        return {
            docs: snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })),
            newLastDoc
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

        const updatePayload = {
            title: data.title,
            text: data.text,
            link: data.link,
            publishedAt: serverTimestamp()
        };

        if (data.imageFile) {
            updatePayload.imageURL = await uploadImage(data.imageFile, collectionName);
        } else if (data.imageURL) {
            updatePayload.imageURL = data.imageURL;
        }

        { updatePayload.imageURL && await updateDoc(ref, updatePayload) };

        alert("Documento " + data.title + " atualizado na coleção: " + collectionName);
    } catch (error) {
        throw error;
    }
};

// DELETE
export const deleteDocument = async (collectionName, id) => {
    try {
        await deleteDoc(doc(db, collectionName, id));

        alert("Documento excluído da coleção:" + collectionName);
    } catch (error) {
        throw error;
    }
};

// Firebase Firestore - end