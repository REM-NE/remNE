import { useState } from 'react';
import '../../App.css';
import news2 from '../../assets/images/news2.png';
import Pagination from '../../components/pagination';
import Post from '../../components/post';
import './highlights.css';

function HighlightsPage() {
    const [page, setPage] = useState(1);

    let object = [
        {
            title: "Início/Home",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Eventos e Novidades",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Recursos Destaque",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Início/Home",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Eventos e Novidades",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Recursos Destaque",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Início/Home",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Eventos e Novidades",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Recursos Destaque",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Início/Home",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Eventos e Novidades",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
        {
            title: "Recursos Destaque",
            text: "Lore ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
            image: `${news2}`,
            link: ""
        },
    ];

    function NewsCard() {
        return (
            <>
                {object.map((noticia, index) => (
                    // <a key={index} href="#">
                    index < 10 && (<Post key={index} text={noticia.text} image={noticia.image} />)
                    // </a>
                ))}
            </>
        );
    }

    const cardUpperTexts = [
        { text: "Ensino Fundamental" },
        { text: "Ensino Médio" },
        { text: "Ensino Superior" }
    ]

    return (
        <div class="highlights main top-spacing">
            {/* <div class="title">Notícias</div> */}
            <div class="container flex-grow-1">
                <div class="column">
                    <div className="row justify-content-center gx-4 mt-4 container flex-grow-1">
                        {cardUpperTexts.map((item, id) => (
                            <div key={id} className="col-md-4 d-flex justify-content-center mb-4">
                                <div className="card" style={{ width: "30rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.text}</h5>
                                        {/* <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the card’s content.
                                </p> */}
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid">
                        <NewsCard />
                    </div>
                    <Pagination totalPages={object.length % 10} currentPage={page} onChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default HighlightsPage;