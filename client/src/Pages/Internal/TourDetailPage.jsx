// -------------- src/Pages/Internal/TourDetailPage.jsx --------------
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';

import useAxios from '../../utils/useAxios';
import { tField } from '../../utils/i18nField';
import BookingModal from '../../Components/BookingModal/BookingModal';
import './TourDetailPage.css';

/* ▶️  Lightbox (YARL) */
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function getYoutubeEmbed(url = '') {
  if (url.includes('/embed/')) return url;
  const m = url.match(/(?:v=|\.be\/)([^&]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export default function TourDetailPage() {
  const { slug, lang } = useParams();     //  /:lang/…
  const api = useAxios();

  const [tour, setTour]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setModal] = useState(false);
  const [photoIdx, setIdx]    = useState(-1);   // -1 → yopiq

  /* —— Fetch —— */
  useEffect(() => {
    setLoading(true);
    api.get(`/tours/${slug}/`)
       .then(res => setTour(res.data))
       .catch(() => setTour(null))
       .finally(() => setLoading(false));
  }, [slug, lang]);   // lang o‘zgarsa ham qayta fetch

  if (loading) return <div className="loading">Yuklanmoqda…</div>;
  if (!tour)   return <div className="not-found">Tur topilmadi</div>;

  /* —— Lokalizatsiya qilinadigan maydonlar —— */
  const title      = tField(tour,        'title',       lang);
  const aboutHTML  = tField(tour,        'about',       lang);
  const descSocial = tour.social ? tField(tour.social, 'description', lang) : '';

  /* —— Lightbox slaydlari —— */
  const slides = tour.gallery.map(g => ({ src: g.image }));

  /* —— Statik frazalar (oddiy ternary) —— */
  const btnBook =
    lang === 'ru' ? 'Забронировать тур'
    : lang === 'en' ? 'Book the tour'
    : 'Sayohatga bron qilish';

  const galleryTitle =
    lang === 'ru' ? 'Галерея'
    : lang === 'en' ? 'Gallery'
    : 'Galereya';

  return (
    <div className='t-d-baseBox'>
    <Header />
      {/* ===== Intro ===== */}
      <section className="tour-intro">
        <div className="tour-text">
          <h1>{title}</h1>

          <div
            className="tour-about"
            dangerouslySetInnerHTML={{ __html: aboutHTML }}
          />

          <button className="book-btn" onClick={() => setModal(true)}>
            {btnBook}
          </button>
        </div>

        <div className="tour-image-wrapper">
          <img src={tour.image} alt={title} className="tour-main-img" />
          <p className="tour-price">
            <FaMoneyBill /> {Number(tour.price).toLocaleString()} so‘mdan
          </p>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      {!!tour.gallery?.length && (
        <section className="tour-gallery">
          <h2 className="section-title">{galleryTitle}</h2>

          <div className="gallery-grid">
            {tour.gallery.map((img, i) => (
              <img
                key={img.id}
                src={img.image}
                alt={title}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===== YouTube + Social ===== */}
      {tour.social && (
        <section className="tour-social">
          <h2 className="section-title">YouTube</h2>

          <iframe
            width="100%"
            height="500"
            src={getYoutubeEmbed(tour.social.youtube_link)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <p className="social-description">{descSocial}</p>

          <button className="book-btn" onClick={() => setModal(true)}>
            {btnBook}
          </button>
        </section>
      )}

      {/* ===== Booking modal ===== */}
      {showModal && (
        <BookingModal tourId={tour.id} onClose={() => setModal(false)} />
      )}

      {/* ===== Lightbox ===== */}
      <Lightbox
        open={photoIdx >= 0}
        close={() => setIdx(-1)}
        index={photoIdx}
        slides={slides}
        plugins={[Thumbnails]}
      />
      <Footer />
    </div>
  );
}