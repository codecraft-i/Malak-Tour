import { Routes, Route, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Base/Home/Home';
import NotFound from './Pages/Base/NotFound/NotFound';
import TourDetailPage from './Pages/Internal/TourDetailPage';
import TourListPage from './Pages/Internal/TourListPage';
import Gallery from './Pages/Internal/Gallery/Gallery';
import ContactSection from './Pages/Internal/ContactSection/ContactSection';

// Media CSS
import './media.css'
import AboutPage from './Pages/Internal/AboutPage/AboutPage';

const SUPPORTED_LANGS = ['en', 'uz', 'ru'];

function LocaleWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(SUPPORTED_LANGS.includes(lang) ? lang : 'uz');
  }, [lang, i18n]);

  const switchLang = (newLang) => {
    const parts = location.pathname.split('/');
    parts[1] = newLang;
    return parts.join('/');
  };

  return <Outlet context={{ switchLang }} />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/uz" replace />} />

        <Route path=":lang/*" element={<LocaleWrapper />}>
          <Route index element={<Home />} />

          {/* —— Tur ro‘yxati —— */}
          <Route
            path="tours/international"
            element={<TourListPage tourType="international" />}
          />
          <Route
            path="tours/national"
            element={<TourListPage tourType="national" />}
          />

          {/* —— Tur detali —— */}
          <Route path="tours/:slug" element={<TourDetailPage />} />

          <Route
            path="gallery"
            element={<Gallery />}
          />
          <Route
            path="contacts"
            element={<ContactSection />}
          />

          <Route path="about" element={<AboutPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
}