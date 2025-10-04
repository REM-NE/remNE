import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AboutPage from "./views/about/page";
import LoginPage from "./views/auth/login";
import RegisterPage from "./views/auth/register";
import HighlightsPage from "./views/highlights/page";
import Home from "./views/home/page";
import Layout from './views/layout';
import LibraryPage from "./views/library/page";
import NewsPage from "./views/news/page";
import PublicationsPage from "./views/publications/page";

import './utils/firebaseConfig'; // Importa e executa a inicialização do Firebase

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
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
