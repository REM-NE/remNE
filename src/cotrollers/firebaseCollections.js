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

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = async (file) => {
    const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
        (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //     case 'paused':
            //         console.log('Upload is paused');
            //         break;
            //     case 'running':
            //         console.log('Upload is running');
            //         break;
            // }
        },
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
                return imageURL;
            });
        }
    );

};

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