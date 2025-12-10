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
import { AuthProvider } from './utils/authContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="eventos-e-noticias" element={<NewsPage />} />
            <Route path="recursos-educacionais" element={<HighlightsPage />} />
            <Route path="publicacoes" element={<PublicationsPage />} />
            <Route path="biblioteca" element={<LibraryPage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
