import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PartnersCarousel.css";

const API = "https://malaktour.uz/api/partners/";
const DESKTOP_MAX = 5;

export default function PartnersCarousel() {
  const { t } = useTranslation();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios.get(API).then(({ data }) => setPartners(data)).catch(console.error);
  }, []);

  const settings = useMemo(() => {
    const n = partners.length || 1;

    return {
      arrows: false,
      dots: true,
      infinite: n > DESKTOP_MAX,
      autoplay: n > DESKTOP_MAX,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      speed: 600,
      slidesToShow: Math.min(n, DESKTOP_MAX),
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: Math.min(n, 4) } },
        { breakpoint: 768, settings: { slidesToShow: Math.min(n, 3) } },
        { breakpoint: 480, settings: { slidesToShow: Math.min(n, 2) } },
      ],
    };
  }, [partners.length]);

  return (
    <section className="partners">
      <div className="partners__container">
        <h2 className="partners__title">{t("partners.title")}</h2>
        <p className="partners__subtitle">{t("partners.subtitle")}</p>

        <Slider {...settings} className="partners__slider">
          {partners.map(({ id, name, logo }) => (
            <div key={id} className="partner-card">
              <img src={logo} alt={name} loading="lazy" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}