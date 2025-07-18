// src/components/TestimonialsSlider/TestimonialsSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaQuoteRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import useAxios from '../../utils/useAxios';
import { tField } from '../../utils/i18nField';

import './TestimonialsSlider.css';

/* ----------  Slider ichidagi bitta kartochka  ---------- */
const TestimonialCard = ({ item, lang }) => (
  <div className="testi__card">
    <div className="testi__quote">
      <FaQuoteRight size={28} />
    </div>

    <h4 className="testi__name">{item.name}</h4>
    <p className="testi__text">{tField(item, 'comment', lang)}</p>
  </div>
);

/* ----------  Navigatsiya tugmalari  ---------- */
const PrevBtn = ({ onClick }) => (
  <button className="testi__nav-btn" onClick={onClick}>
    <IoIosArrowBack />
  </button>
);

const NextBtn = ({ onClick }) => (
  <button className="testi__nav-btn" onClick={onClick}>
    <IoIosArrowForward />
  </button>
);

/* ----------  Asosiy komponent  ---------- */
export default function TestimonialsSlider() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;            // 'uz' | 'en' | 'ru'

  const api = useAxios();                // ?lang=... avtomatik qo‘shiladi
  const [list, setList] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(3);

  /* ---  Maʼlumotni backenddan olish  --- */
  useEffect(() => {
    api.get('/testimonials/')
      .then(res => {
        setList(res.data || []);
        const len = res.data.length;
        setSlidesToShow(len >= 3 ? 3 : len);
      })
      .catch(console.error);
  }, [api]);                             // lang o‘zgarsa useAxios ham yangilanadi

  /* ---  Slick sozlamalari  --- */
  const settings = {
    arrows: true,
    dots: false,
    infinite: list.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(slidesToShow, 2) },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="testi">
      <div className="container">
        <h2 className="testi__title">{t('testimonials.title')}</h2>
        <p className="testi__subtitle">{t('testimonials.subtitle')}</p>

        {list.length ? (
          <Slider {...settings}>
            {list.map(item => (
              <TestimonialCard key={item.id} item={item} lang={lang} />
            ))}
          </Slider>
        ) : (
          <p className="testi__loading">{t('testimonials.loading')}</p>
        )}
      </div>
    </section>
  );
}