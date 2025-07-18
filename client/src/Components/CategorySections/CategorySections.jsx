// CategorySections.jsx
import React from 'react';
import './CategorySections.css';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categories = [
  {
    key: 'ancient',
    image: '/Bans/bn1.jpg',
  },
  {
    key: 'europe',
    image: '/Bans/bn2.jpg',
  },
  {
    key: 'eastAsia',
    image: '/Bans/bn3.jpg',
  },
  {
    key: 'coastal',
    image: '/Bans/bn4.jpg',
  },
];

export default function CategorySections() {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams();
  const navigate = useNavigate();

  function clickGet() {
    navigate(`/${lang}/tours/international`);
  }

  return (
    <div className="categories-container">
      {categories.map((cat, idx) => (
          <div
            key={idx}
            className="category-card"
            style={{ backgroundImage: `url(${cat.image})` }}
          >
            <div className="overlay" />
            <div className="content">
              <h2>{t(`categorySections.${cat.key}.title`)}</h2>
              <p>{t(`categorySections.${cat.key}.subtitle`)}</p>
              <button className="details-button" onClick={clickGet}>
                {t('categorySections.more')} <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}