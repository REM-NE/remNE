import '../../App.css';
import './news.css';
import { Button, CardBody, CardHeader, CardText } from 'react-bootstrap';
import logo from '../../assets/images/remne-logo.jpg';

function NewsPage() {
    function NewsCard() {
        let newsObject = [
            {
                title: "Início/Home",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
                image: `${logo}`,
                link: ""
            },
            {
                title: "Eventos e Novidades",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
                image: `${logo}`,
                link: ""
            },
            {
                title: "Recursos Destaque",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis sed lacus vitae porta. In id nibh lectus. Maecenas scelerisque tellus vel metus cursus, non rhoncus libero convallis. Nullam tincidunt quis lectus quis imperdiet. Mauris gravida feugiat neque, ut rutrum leo dignissim a. Etiam placerat nunc odio, a facilisis nunc porta e. Integer dolor felis, molestie ac condimentum at, vehicula sit amet odio. Maecenas sit amet felis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac rhoncus justo. Pellentesque consequat dolor vel nulla hendrerit varius. Quisque facilisis vel justo id blandit. Donec felis augue, accumsan id elit a, aliquet rhoncus dolor. Cras vitae condimentum ipsum, at vulputate est. Sed non dictum tortor. Duis molestie arcu eget accumsan auctor. Suspendisse neque tellus, faucibus quis condimentum nec, placerat in arcu. Morbi varius orci eleifend dolor efficitur, non ullamcorper ex vulputate. Curabitur bibendum sem vel tincidunt sollicitudin. Vivamus et arcu tincidunt tellus pulvinar ultricies. Curabitur ultricies augue vel magna lacinia fringilla. Quisque posuere efficitur tortor. Nunc sagittis fermentum quam eu interdum. Nullam vehicula ultrices metus, nec aliquet metus porttitor a. Nullam bibendum lorem dui, eget vulputate leo dictum ac. Quisque convallis lectus vitae quam tincidunt, eget gravida augue viverra. Integer quis ultrices neque.",
                image: `${logo}`,
                link: ""
            },
        ];

        return (
            <>
                {newsObject.map((noticia, index) => (
                    // <a key={index} href="#">
                    <div key={index}>
                        <CardHeader>
                            <h4 class="card-title">
                                {noticia.title}
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <div class="row-main">
                                <div class="column-main">
                                    <CardText>{noticia.text}</CardText>
                                    <Button>
                                        Leia mais
                                    </Button>
                                </div>
                                <img class="news-image" src={noticia.image} alt=""></img>
                            </div>
                        </CardBody>
                    </ div>
                    // </a>
                ))}
            </>
        );
    }

    return (
        <div class="news home top-spacing">
            {/* <div class="title">Notícias</div> */}
            <div class="container flex-grow-1">
                <div class="column title card-main">
                    <NewsCard />
                </div>
            </div>
        </div>
    )
}

export default NewsPage;