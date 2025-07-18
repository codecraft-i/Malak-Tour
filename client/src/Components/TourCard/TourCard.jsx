// ---------------- src/Components/TourCard.jsx ----------------
import { Link, useParams } from 'react-router-dom';
import { FaMoneyBill } from 'react-icons/fa';
import { tField } from '../../utils/i18nField';

export default function TourCard({ tour }) {
  const { lang } = useParams();                  // uz | en | ru
  const title    = tField(tour, 'title', lang);  // lokalizatsiyalangan nom

  return (
    <div className="tour-card">
      <img src={tour.image} alt={title} className="tour-card-img" />

      <h3 className="tour-card-title">{title}</h3>

      <p className="tour-card-price">
        <FaMoneyBill /> {Number(tour.price).toLocaleString()} so‘mdan
      </p>

      <Link to={`/${lang}/tours/${tour.slug}`} className="tour-card-btn">
        {lang === 'ru' ? 'Подробнее'
         : lang === 'en' ? 'Details'
         : 'Batafsilroq'}
      </Link>
    </div>
  );
}