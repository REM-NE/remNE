import {
    uploadImage,
    subscribeToCollection,
    getDocumentById,
    getDocuments,
    getPrevPage,
    getNextPage,
    createDocument,
    updateDocument,
    deleteDocument
} from "./firebaseCollections";

// Mock do firestore
jest.mock("firebase/firestore", () => {
    const mockServerTimestamp = jest.fn(() => "MOCK_TIMESTAMP");
    return {
        addDoc: jest.fn(),
        collection: jest.fn((db, name) => ({ _collection: name })),
        deleteDoc: jest.fn(),
        doc: jest.fn((db, col, id) => ({ _doc: `${col}/${id}` })),
        getDoc: jest.fn(),
        getDocs: jest.fn(),
        limit: jest.fn((n) => ({ _limit: n })),
        onSnapshot: jest.fn(),
        orderBy: jest.fn((field, dir) => ({ _orderBy: field, _dir: dir })),
        query: jest.fn((...args) => ({ _query: args })),
        serverTimestamp: mockServerTimestamp,
        startAfter: jest.fn((cursor) => ({ _startAfter: cursor })),
        startAt: jest.fn((cursor) => ({ _startAt: cursor })),
        updateDoc: jest.fn(),
        where: jest.fn((field, op, val) => ({ _where: { field, op, val } })),
    };
});

jest.mock("../utils/firebaseConfig", () => ({
    db: "MOCK_DB",
}));

global.fetch = jest.fn();
global.alert = jest.fn();
global.confirm = jest.fn();

const {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    updateDoc,
} = require("firebase/firestore");

beforeEach(() => {
    jest.clearAllMocks();
    const { serverTimestamp } = require("firebase/firestore");
    serverTimestamp.mockReturnValue("MOCK_TIMESTAMP");
});

describe("uploadImage", () => {
    test("envia um formdata para Cloudinary", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                secure_url: "https://res.cloudinary.com/img.jpg",
                public_id: "abc123",
            }),
        });

        const file = new File(["conteudo"], "foto.jpg", { type: "image/jpeg" });
        const result = await uploadImage(file);

        expect(fetch).toHaveBeenCalledWith(
            "https://api.cloudinary.com/v1_1/dyp5jzbal/image/upload",
            expect.objectContaining({ method: "POST" })
        );
        expect(result).toEqual({
            url: "https://res.cloudinary.com/img.jpg",
            publicId: "abc123",
        });
    });

    test("inclui public_id no FormData", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ secure_url: "url", public_id: "meu_id" }),
        });

        const file = new File(["x"], "img.png", { type: "image/png" });
        await uploadImage(file, "meu_id");

        const callBody = fetch.mock.calls[0][1].body;
        expect(callBody instanceof FormData).toBe(true);
        expect(callBody.get("public_id")).toBe("meu_id");
        expect(callBody.get("overwrite")).toBe("true");
    });

    test("não inclui public_id quando não tiver", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ secure_url: "url", public_id: "auto" }),
        });

        const file = new File(["x"], "img.png", { type: "image/png" });
        await uploadImage(file);

        const callBody = fetch.mock.calls[0][1].body;
        expect(callBody.get("public_id")).toBeNull();
    });

    test("lança erro quando resposta não é ok", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: { message: "Upload falhou" } }),
        });

        const file = new File(["x"], "img.png", { type: "image/png" });
        await expect(uploadImage(file)).rejects.toThrow("Upload falhou");
    });

    test("lança erro quando resposta contém campo error", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ error: { message: "Limite excedido" } }),
        });

        const file = new File(["x"], "img.png", { type: "image/png" });
        await expect(uploadImage(file)).rejects.toThrow("Limite excedido");
    });
});

describe("subscribeToCollection", () => {
    test("registra listener e retorna unsubscribe", () => {
        const mockUnsub = jest.fn();
        onSnapshot.mockReturnValue(mockUnsub);

        const callback = jest.fn();
        const unsub = subscribeToCollection("noticias", callback);

        expect(onSnapshot).toHaveBeenCalledTimes(1);
        expect(unsub).toBe(mockUnsub);
    });

    test("callback recebe dados formatados com id", () => {
        onSnapshot.mockImplementation((q, cb) => {
            cb({
                docs: [
                    { id: "doc1", data: () => ({ title: "A" }) },
                    { id: "doc2", data: () => ({ title: "B" }) },
                ],
            });
            return jest.fn();
        });

        const callback = jest.fn();
        subscribeToCollection("noticias", callback);

        expect(callback).toHaveBeenCalledWith([
            { id: "doc1", title: "A" },
            { id: "doc2", title: "B" },
        ]);
    });
});

describe("getDocumentById", () => {
    test("retorna documento existente com id", async () => {
        getDoc.mockResolvedValueOnce({
            exists: () => true,
            id: "abc",
            data: () => ({ title: "Teste" }),
        });

        const result = await getDocumentById("noticias", "abc");
        expect(result).toEqual({ id: "abc", title: "Teste" });
    });

    test("lança erro para documento inexistente", async () => {
        getDoc.mockResolvedValueOnce({
            exists: () => false,
        });

        await expect(getDocumentById("noticias", "xyz")).rejects.toThrow(
            "Documento não encontrado"
        );
    });
});

describe("getDocuments", () => {
    const makeMockSnap = (items) => ({
        docs: items.map((item) => ({
            id: item.id,
            data: () => ({ title: item.title }),
        })),
    });

    test("retorna lista de documentos limitada a 10", async () => {
        const items = Array.from({ length: 15 }, (_, i) => ({
            id: `doc${i}`,
            title: `Titulo ${i}`,
        }));
        getDocs.mockResolvedValueOnce(makeMockSnap(items));

        const result = await getDocuments("noticias", "publishedAt");
        expect(result.docs).toHaveLength(10);
    });

    test("filtra por título", async () => {
        getDocs.mockResolvedValueOnce(
            makeMockSnap([
                { id: "1", title: "React Tutorial" },
                { id: "2", title: "Vue Guide" },
                { id: "3", title: "React Hooks" },
            ])
        );

        const result = await getDocuments("noticias", "publishedAt", null, "react");
        expect(result.docs).toHaveLength(2);
        expect(result.docs.every((d) => d.title.toLowerCase().includes("react"))).toBe(true);
    });

    test("retorna lastDoc para paginação", async () => {
        getDocs.mockResolvedValueOnce(
            makeMockSnap([{ id: "1", title: "A" }, { id: "2", title: "B" }])
        );

        const result = await getDocuments("noticias", "publishedAt");
        expect(result.lastDoc).toBeDefined();
    });

    test("retorna docs vazio quando n tem nenhum resultado", async () => {
        getDocs.mockResolvedValueOnce(makeMockSnap([]));

        const result = await getDocuments("noticias", "publishedAt");
        expect(result.docs).toHaveLength(0);
        expect(result.lastDoc).toBeNull();
    });
});

describe("getNextPage", () => {
    test("página com startAfter (com cursor)", async () => {
        const mockCursor = { id: "last" };
        getDocs.mockResolvedValueOnce({
            docs: [{ id: "next1", data: () => ({ title: "X" }) }],
        });

        const result = await getNextPage(mockCursor, "noticias");
        expect(result.docs).toHaveLength(1);
        expect(result.firstDoc).toBeDefined();
        expect(result.lastDoc).toBeDefined();
    });

    test("funciona sem cursor (primeira página)", async () => {
        getDocs.mockResolvedValueOnce({
            docs: [{ id: "first1", data: () => ({ title: "Y" }) }],
        });

        const result = await getNextPage(null, "noticias");
        expect(result.docs).toHaveLength(1);
    });

    test("retorna firstDoc e lastDoc null quando sem resultados", async () => {
        getDocs.mockResolvedValueOnce({ docs: [] });

        const result = await getNextPage(null, "noticias");
        expect(result.docs).toHaveLength(0);
        expect(result.firstDoc).toBeNull();
        expect(result.lastDoc).toBeNull();
    });
});

describe("getPrevPage", () => {
    test("pagina com startAt c cursor fornecido", async () => {
        const mockCursor = { id: "cur" };
        getDocs.mockResolvedValueOnce({
            docs: [{ id: "p1", data: () => ({ title: "Z" }) }],
        });

        const result = await getPrevPage(mockCursor, "noticias");
        expect(result.docs).toHaveLength(1);
        expect(result.firstDoc).toBeDefined();
    });

    test("funciona sem cursor", async () => {
        getDocs.mockResolvedValueOnce({
            docs: [{ id: "p1", data: () => ({ title: "Z" }) }],
        });

        const result = await getPrevPage(null, "noticias");
        expect(result.docs).toHaveLength(1);
    });
});

describe("createDocument", () => {
    test("chama addDoc", async () => {
        addDoc.mockResolvedValueOnce({ id: "new123" });

        const data = {
            title: "Teste",
            text: "Texto",
            imageURL: "",
            link: "https://x.com",
            educationalLevel: "Ensino Médio",
        };

        const id = await createDocument("noticias", data);

        expect(addDoc).toHaveBeenCalledTimes(1);
        const payload = addDoc.mock.calls[0][1];
        expect(payload.title).toBe("Teste");
        expect(payload.title_lower).toBe("teste");
        expect(payload.educationalLevel).toBe("Ensino Médio");
        expect(payload.createdAt).toBeDefined();
        expect(payload.publishedAt).toBeDefined();
        expect(id).toBe("new123");
    });

    test("Envia imagem quando o imageURL esxiste", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ secure_url: "https://img.url", public_id: "pid" }),
        });
        addDoc.mockResolvedValueOnce({ id: "img123" });

        const data = {
            title: "Com Imagem",
            text: "Texto",
            imageURL: "algo",
            imageFile: new File(["x"], "f.jpg"),
            imagePublicId: "pid",
            link: "",
        };

        await createDocument("noticias", data);

        expect(fetch).toHaveBeenCalledTimes(1);
        const payload = addDoc.mock.calls[0][1];
        expect(payload.imageURL).toEqual({ url: "https://img.url", publicId: "pid" });
    });
});

describe("updateDocument", () => {
    test("chama o updateDoc", async () => {
        updateDoc.mockResolvedValueOnce();

        const data = {
            title: "Editado",
            text: "Novo texto",
            imageURL: "http://img.jpg",
            link: "http://link.com",
            educationalLevel: "Ensino Superior",
        };

        await updateDocument("noticias", "doc1", data);

        expect(updateDoc).toHaveBeenCalledTimes(1);
        const payload = updateDoc.mock.calls[0][1];
        expect(payload.title).toBe("Editado");
        expect(payload.title_lower).toBe("editado");
        expect(payload.imageURL).toBe("http://img.jpg");
        expect(alert).toHaveBeenCalledWith("Documento Editado atualizado!");
    });

    test("Upload de nova imagem (quando imageFile é instância de File)", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ secure_url: "https://new.url", public_id: "newpid" }),
        });
        updateDoc.mockResolvedValueOnce();

        const data = {
            title: "Com Nova Imagem",
            text: "T",
            imageURL: "old_url",
            imageFile: new File(["y"], "nova.jpg", { type: "image/jpeg" }),
            imagePublicId: "oldpid",
            link: "",
        };

        await updateDocument("noticias", "doc1", data);

        expect(fetch).toHaveBeenCalledTimes(1);
        const payload = updateDoc.mock.calls[0][1];
        expect(payload.imageURL).toEqual({ url: "https://new.url", publicId: "newpid" });
    });
});

describe("deleteDocument", () => {
    test("Deletar documento quando usuário confirma", async () => {
        confirm.mockReturnValue(true);
        deleteDoc.mockResolvedValueOnce();

        await deleteDocument("noticias", "doc1");

        expect(deleteDoc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith("MOCK_DB", "noticias", "doc1");
        expect(alert).toHaveBeenCalledWith("Documento excluído da coleção:noticias");
    });

    test("não executa quando usuário cancela o confirmar", async () => {
        confirm.mockReturnValue(false);

        await deleteDocument("noticias", "doc1");

        expect(deleteDoc).not.toHaveBeenCalled();
    });
});
