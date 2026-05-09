import { useEffect, useState } from 'react';
import '../../App.css';
import book45 from '../../assets/books/45.jpg';
import book69 from '../../assets/books/69.jpg';
import Post from '../../components/post';
import { useAuth } from '../../utils/authContext';
import '../news/news.css';

const booksList = [
    {
        id: 1,
        title: "Ensinando multiplicação e divisão do 1º ao 3º ano",
        imageURL: "",
        link: "../assets/books/1-3-Multiplicação-e-divisão.pdf"
    },
    {
        id: 2,
        title: "Ensinando multiplicação e divisão do 4º ao 5º ano",
        imageURL: book45,
        link: "../assets/books/4-5-Multiplicação-e-divisão.pdf"
    },
    {
        id: 3,
        title: "Ensinando multiplicação e divisão do 6º ao 9º ano",
        imageURL: book69,
        link: "../assets/books/6-9-Multiplicação-e-divisão.pdf"
    },
    {
        id: 4,
        title: "Equidade na Educação Matemática",
        imageURL: "",
        link: "../assets/books/equidade-matemática.pdf"
    }
]

function LibraryPage() {
    const { currentUser } = useAuth();

    const [docsData, setDocsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [page, setPage] = useState(1);
    // const [firstDoc, setFirstDoc] = useState(null);
    // const [lastDoc, setLastDoc] = useState(null);
    // const [history, setHistory] = useState([]);

    // const [searchParams] = useSearchParams();
    // const searchTerm = searchParams.get("search") || "";

    const collection = "biblioteca";

    // const loadData = async () => {
    //     try {
    //         const data = await getDocuments(collection, true, null, searchTerm);

    //         setDocsData(data.docs);
    //         setLastDoc(data.lastDoc);
    //     } catch (error) {
    //         console.error("Erro ao carregar dados:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleNext = async () => {
    //     if (!lastDoc) return;

    //     setHistory(prev => [...prev, firstDoc]);
    //     const res = await getNextPage(lastDoc, collection);

    //     setDocsData(res.docs);
    //     setFirstDoc(res.firstDoc);
    //     setLastDoc(res.lastDoc);
    //     setPage(prev => prev + 1);
    // };

    // const handlePrev = async () => {
    //     if (history.length === 0) return;

    //     const newHistory = [...history];
    //     const prevFirstDoc = newHistory.pop();

    //     const res = await getPrevPage(prevFirstDoc, collection);

    //     setHistory(newHistory);
    //     setDocsData(res.docs);
    //     setFirstDoc(res.firstDoc);
    //     setLastDoc(res.lastDoc);
    //     setPage(prev => prev - 1);
    // };

    useEffect(() => {
        // loadData();
        setDocsData(booksList);
    }, []);

    function BookCard() {
        return (
            <>
                {Array.isArray(docsData) && docsData.map((book, index) => (
                    index < 10 && (
                        <Post
                            key={book.id}
                            title={book.title}
                            image={book.imageURL}
                            link={book.link}
                            id={book.id}
                        />
                    )
                ))
                }
            </>
        );
    }

    return (
        <div className="publications mt-5 mb-5 main">
            <div className="container flex-grow-1">
                {/* <div className="column"> */}
                {/* <div className="d-flex justify-content-start">
                        {currentUser && <PathButton text="Editar Publicações da Biblioteca" path="/biblioteca/edit" />}
                    </div> */}
                <div className="grid">
                    <BookCard />
                </div>
                {/* {docsData.length > 0 ? <Pagination
                        currentPage={page}
                        hasNext={docsData.length === 10} // depende do limit
                        hasPrev={page > 1}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    /> :
                    <p>Nenhuma publicação encontrada.</p>
                    } */}
            </div>
        </div>
        // </div>
    )
}

export default LibraryPage;