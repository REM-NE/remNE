import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export const subscribeToCollection = (collectionName, callback) => {
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

// GET by ID
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
                orderBy("publishedAt", "desc"))
        } else {
            q = collection(db, collectionName)
        }
        const snap = await getDocs(q);

        return snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));
    } catch (error) {
        throw error;
    }
}

// CREATE
export const createDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp()
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
        await updateDoc(ref, data);

        alert("Documento " + data.title + " atualizado na coleção:" + collectionName);


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