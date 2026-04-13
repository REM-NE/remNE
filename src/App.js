import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { AuthProvider } from './utils/authContext';
import AboutForm from "./views/about/edit";
import AboutPage from "./views/about/page";
import LoginPage from "./views/auth/login";
import RegisterPage from "./views/auth/register";
import HomeForm from "./views/home/edit";
import Home from "./views/home/page";
import Layout from './views/layout';
import LibraryForm from "./views/library/edit";
import LibraryPage from "./views/library/page";
import LibraryPost from "./views/library/post";
import NewsForm from "./views/news/edit";
import NewsPage from "./views/news/page";
import NewsPost from "./views/news/post";
import PublicationsForm from "./views/publications/edit";
import PublicationsPage from "./views/publications/page";
import PublicationsPost from "./views/publications/post";
import ResourcesForm from "./views/resources/edit";
import ResourcesPage from "./views/resources/page";
import ResourcesPost from "./views/resources/post";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="eventos-e-noticias" element={<NewsPage />} />
            <Route path="recursos-educacionais" element={<ResourcesPage />} />
            <Route path="publicacoes" element={<PublicationsPage />} />
            <Route path="biblioteca" element={<LibraryPage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="home/edit" element={<HomeForm />} />
            <Route path="eventos-e-noticias/edit" element={<NewsForm />} />
            <Route path="recursos-educacionais/edit" element={<ResourcesForm />} />
            <Route path="publicacoes/edit" element={<PublicationsForm />} />
            <Route path="biblioteca/edit" element={<LibraryForm />} />
            <Route path="eventos-e-noticias/edit" element={<NewsForm />} />
            <Route path="recursos-educacionais/edit" element={<ResourcesForm />} />
            <Route path="publicacoes/edit" element={<PublicationsForm />} />
            <Route path="biblioteca/edit" element={<LibraryForm />} />
            <Route path="eventos-e-noticias/post/:postId" element={<NewsPost />} />
            <Route path="recursos-educacionais/post/:postId" element={<ResourcesPost />} />
            <Route path="publicacoes/post/:postId" element={<PublicationsPost />} />
            <Route path="biblioteca/post/:postId" element={<LibraryPost />} />
            <Route path="sobre/edit" element={<AboutForm />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
