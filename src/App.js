import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './views/layout';
import Home from "./views/home/page";
import NewsPage from "./views/news/page";
import HighlightsPage from "./views/highlights/page";
import PublicationsPage from "./views/publications/page";
import LibraryPage from "./views/library/page";
import AboutPage from "./views/about/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eventos-e-novidades" element={<NewsPage />} />
          <Route path="recursos-destaque" element={<HighlightsPage />} />
          <Route path="publicacoes" element={<PublicationsPage />} />
          <Route path="biblioteca" element={<LibraryPage />} />
          <Route path="sobre" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
