import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGlobeAmericas, FaShieldAlt, FaMedal } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./AboutSection.css";

const Feature = ({ icon, title, subtitle }) => (
  <div className="feature">
    <span className="feature__icon">{icon}</span>
    <h3 className="feature__title">{title}</h3>
    <p className="feature__subtitle">{subtitle}</p>
  </div>
);

const Stat = ({ value, label, hint }) => (
  <div className="stat">
    <h3 className="stat__value">{value}</h3>
    <p className="stat__label">{label}</p>
    {hint && <span className="stat__hint">{hint}</span>}
  </div>
);

const AboutSection = () => {
  const { t } = useTranslation();
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://malaktour.uz/api/orders/");
        const sum = res.data.reduce(
          (acc, order) => acc + Number(order.amount),
          0
        );
        setTotalAmount(sum);
      } catch (err) {
        console.error("Buyurtma ma’lumotlarini olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formattedAmount =
    totalAmount !== null ? Math.trunc(totalAmount).toLocaleString() : "...";

  return (
    <section className="about" id="about">
      <div className="about__features">
        <Feature
          icon={<FaGlobeAmericas />}
          title={t("about.features.allTours.title")}
          subtitle={t("about.features.allTours.subtitle")}
        />
        <Feature
          icon={<FaShieldAlt />}
          title={t("about.features.guaranteed.title")}
          subtitle={t("about.features.guaranteed.subtitle")}
        />
        <Feature
          icon={<FaMedal />}
          title={t("about.features.top100.title")}
          subtitle={t("about.features.top100.subtitle")}
        />
      </div>

      <div className="about__body">
        <div className="about__image">
          <img
            src="/about.webp"
            alt={t("about.imageAlt")}
          />
        </div>
        <div className="about__text">
          <h2>{t("about.title")}</h2>
          <p className="about__intro" style={{ color: "#000" }}>
            <strong>{t("about.intro")}</strong>
          </p>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <button className="btn-primary">{t("about.more")}</button>
        </div>
      </div>

      <div className="about__stats">
        <Stat value="100%" label={t("about.stats.quality")} hint={t("about.stats.qualityHint")} />
        <Stat value="99%" label={t("about.stats.satisfaction")} hint={t("about.stats.satisfactionHint")} />
        <Stat value={`${formattedAmount}`} label={t("about.stats.orders")} hint={t("about.stats.ordersHint")} />
      </div>
    </section>
  );
};

export default AboutSection;