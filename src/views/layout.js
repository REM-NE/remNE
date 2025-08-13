import '../App.css';
import Navbar from '../components/navbar';
import Home from './home/page';
import Footer from '../components/footer';

function Layout() {
    return (
        <>
            <Navbar />
            <Home />
            <Footer />
        </>
    )
}

export default Layout;