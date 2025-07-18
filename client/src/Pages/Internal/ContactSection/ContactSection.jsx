import React from "react";
import { FaInstagram, FaTelegramPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./ContactSection.css";
import { useTranslation } from "react-i18next";
import Header from "../../../Components/Header/Header";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-base-section">
        <Header />
      <div className="contact-section">
        <div className="contact-info">
        <h2>{t("footer.brand.title")} <span>{t("footer.brand.highlight")}</span></h2>
        <p className="tagline">{t("footer.brand.tagline")}</p>

        <p className="phone">
          <FaPhoneAlt /> <strong>+998 (91) 977-77-35</strong>
          <span className="icons">
            <a href="https://t.me/malak_tour" target="_blank" rel="noreferrer">
              <FaTelegramPlane className="tg" />
            </a>
            <a href="https://www.instagram.com/malak_tour_?utm_source=qr&igsh=MXF1cDJrZjJ5NG1hcg%3D%3D" target="_blank" rel="noreferrer">
              <FaInstagram className="in" />
            </a>
          </span>
        </p>

        <p className="email">
          <FaEnvelope /> <a href="mailto:info@malaktour.uz">info@malaktour.uz</a>
        </p>

        <p className="location">
          <FaMapMarkerAlt /> {t("footer.address")}
        </p>

        <p className="hours">
          <FaClock /> {t("footer.hours")}
        </p>
      </div>

      <div className="contact-map">
        <iframe
          title="office-location"
          src="https://maps.google.com/maps?q=41.310139,69.279739&z=15&output=embed"
          width="100%"
          height="350"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
    </section>
  );
};

export default ContactSection;