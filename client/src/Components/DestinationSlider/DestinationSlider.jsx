// ------------ src/Components/DestinationSlider/DestinationSlider.jsx ------------
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { NavLink, useParams } from 'react-router-dom';

import useAxios from '../../utils/useAxios';
import { tField } from '../../utils/i18nField';

import 'swiper/css';
import 'swiper/css/navigation';
import './DestinationSlider.css';

export default function DestinationSlider() {
  const { lang } = useParams();
  const api      = useAxios();

  const [slides, setSlides] = useState([]);

  /* DOM tugmalarini ref bilan ushlaymiz */
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

  /* ———  is_popular=true turlarini olish  ——— */
  useEffect(() => {
    api.get('/tours/', { params: { is_popular: true } })
       .then(res => setSlides(res.data))
       .catch(err => console.error('Popular tours fetch error', err));
  }, [lang]);

  return (
    <div className="dest-slider-wrapper">
      {/* Navigation tugmalari */}
      <button ref={prevBtn} className="nav-btn prev-btn" aria-label="Previous">
        <IoIosArrowBack />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        className="dest-swiper"
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0:    { slidesPerView: 1, spaceBetween: 16 },
          600:  { slidesPerView: 2, spaceBetween: 24 },
          900:  { slidesPerView: 3, spaceBetween: 32 },
          1200: { slidesPerView: 3, spaceBetween: 40 },
        }}
        /* 👉 tugmalarni init’dan AVVAL biriktiramiz */
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevBtn.current;
          swiper.params.navigation.nextEl = nextBtn.current;
        }}
      >
        {slides.map((tour) => (
          <SwiperSlide key={tour.id}>
            <div className="card">
              <img
                src={tour.image}
                alt={tField(tour, 'title', lang)}
              />
              <span className="card-title">
                {tField(tour, 'title', lang)}
              </span>
              <NavLink
                to={`/${lang}/tours/${tour.slug}`}
                className="inner-arrow"
              >
                {lang === 'ru' ? 'Подробнее'
                 : lang === 'en' ? 'Details'
                 : 'Batafsil'}
                <IoIosArrowForward />
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button ref={nextBtn} className="nav-btn next-btn" aria-label="Next">
        <IoIosArrowForward />
      </button>
    </div>
  );
}