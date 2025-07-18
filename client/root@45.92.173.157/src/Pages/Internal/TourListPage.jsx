// ---------------- src/Pages/Internal/TourListPage.jsx ----------------
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import { tField } from '../../utils/i18nField';
import TourCard from '../../Components/TourCard/TourCard';
import './TourListPage.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function TourListPage({ tourType }) {
  const { lang } = useParams();
  const api = useAxios();

  const [tours, setTours]   = useState([]);
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    setLoad(true);
    api.get('/tours/', { params: { tour_type: tourType } })
       .then(res => setTours(res.data))
       .catch(() => setTours([]))
       .finally(() => setLoad(false));
  }, [tourType, lang]);

  /* ——— Sahifa sarlavhasi ——— */
  const pageTitle =
    lang === 'ru'
      ? tourType === 'international' ? 'Международные туры' : 'Национальные туры'
      : lang === 'en'
      ? tourType === 'international' ? 'International tours'  : 'National tours'
      : tourType === 'international' ? 'Xalqaro sayohatlar'   : 'Milliy turlar';

  if (loading) return <div className="loading">Yuklanmoqda…</div>;

  return (
    <div className='inm-baseBox'>
       <Header />
        <section className="tour-list">
        <h1 className="section-title">{pageTitle}</h1>

        {tours.length === 0 ? (
          <p className="not-found">
            {lang === 'ru' ? 'Пока нет туров'
            : lang === 'en' ? 'No tours yet'
            : 'Hozircha tur topilmadi'}
          </p>
        ) : (
          <div className="tour-list-grid">
            {tours.map(t => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}