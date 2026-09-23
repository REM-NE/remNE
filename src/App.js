import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import './App.css';
import logo from './assets/images/logo.png';
import { AuthProvider } from './utils/authContext';
import AboutForm from "./views/about/edit";
import AboutPage from "./views/about/page";
import LoginPage from "./views/auth/login";
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
import NotFound from "./views/not found/notfound";

export function notify(message, type = "success") {
  window.dispatchEvent(new CustomEvent("app-notification", { detail: { message, type } }));
}

function NotificationHost() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let timeout;
    const showNotification = (event) => {
      setNotification(event.detail);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setNotification(null), 4200);
    };
    window.addEventListener("app-notification", showNotification);
    return () => {
      window.removeEventListener("app-notification", showNotification);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!notification) return null;
  return (
    <div className={`site-notification ${notification.type}`} role="status" aria-live="polite">
      <span className="site-notification-icon" aria-hidden="true">{notification.type === "error" ? "!" : "✓"}</span>
      <span>{notification.message}</span>
      <button type="button" aria-label="Fechar aviso" onClick={() => setNotification(null)}>×</button>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const hasEnteredSiteBefore = sessionStorage.getItem("rem_site_opened");

    if (!hasEnteredSiteBefore) {
      sessionStorage.setItem("rem_site_opened", "true");

      const timer = window.setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 2000);

      return () => {
        window.clearTimeout(timer);
      };
    }

    setIsLoading(false);
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    const previousPath = lastPathRef.current;
    lastPathRef.current = location.pathname;

    if (previousPath && previousPath !== location.pathname) {
      setIsLoading(true);
      const timer = window.setTimeout(() => {
        setIsLoading(false);
      }, 350);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [location.pathname, isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    if (document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    const handlePageLoad = () => setIsLoading(false);
    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [isInitialLoad]);

  return (
    <>
      <NotificationHost />

      {isLoading && (
        <div
          className={isInitialLoad ? "app-loader app-loader--initial" : "app-loader app-loader--route"}
          role="status"
          aria-live="polite"
          aria-label="Carregando página"
        >
          <div className="app-loader-content">
            <img className="app-loader-logo" src={logo} alt="Logo REM" />
            <div className="spinner-border text-danger app-loader-spinner" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      )}

      <div className={`app-shell ${isLoading ? "app-shell--loading" : ""}`}>
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
