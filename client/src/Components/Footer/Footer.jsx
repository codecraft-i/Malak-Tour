import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaInstagram,
  FaTelegramPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  /* ---------- Scroll-top ---------- */
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ---------- Call-request modal steyti ---------- */
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSuccess(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/call-request/", form);
      setSuccess(true);
      setForm({ full_name: "", phone: "", message: "" });
    } catch (err) {
      alert(t("footer.requestError") + ": " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Newsletter (subscribe) steyti ---------- */
  const [email, setEmail] = useState("");
  const [nSuccess, setNSuccess] = useState(false);
  const [nLoading, setNLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setNLoading(true);
    try {
      await axios.post("https://malaktour.uz/api/subscribe/", {
        address: email,
      });
      setNSuccess(true);
      setEmail("");
      /* “Rahmat!” xabari 3 soniyadan so‘ng yo‘q bo‘lishi */
      setTimeout(() => setNSuccess(false), 3000);
    } catch (err) {
      alert(t("footer.subscribeError") + ": " + err.message);
    } finally {
      setNLoading(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <>
      <footer className="footer">
        {/* Scroll-top button */}
        <button className="scroll-top" onClick={scrollTop} aria-label={t("footer.scrollTop")}> 
          <FaArrowUp />
        </button>

        <div className="footer-wrapper">
          {/* Column 1 */}
          <div className="footer-col">
            <h2 className="title">
              {t("footer.brand.title")} <span>{t("footer.brand.highlight")}</span>
            </h2>
            <p className="tagline">{t("footer.brand.tagline")}</p>

            <button className="cta" onClick={openModal}>
              <FaPhoneAlt className="cta-icon" />
              {t("footer.cta")}
            </button>

            <ul className="contacts">
              <li>
                <FaPhoneAlt /> +998&nbsp;(91)&nbsp;977-77-35
              </li>
              <li>
                <FaEnvelope /> info@malaktour.uz
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <form className="newsletter" onSubmit={handleNewsletter}>
              <label htmlFor="newsletter">{t("footer.newsletter.label")}</label>

              {nSuccess ? (
                <p className="newsletter-thanks">{t("footer.newsletter.thanks")}</p>
              ) : (
                <div className="input-wrap">
                  <input
                    id="newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter.placeholder")}
                    required
                  />
                  <button type="submit" disabled={nLoading}>
                    {nLoading ? t("footer.newsletter.sending") : t("footer.newsletter.button")}
                  </button>
                </div>
              )}
            </form>

            <div className="social">
              <a href="https://www.instagram.com/malak_tour_?utm_source=qr&igsh=MXF1cDJrZjJ5NG1hcg==" aria-label="Instagram">
                <FaInstagram />
              </a>
              {/* <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a> */}
              <a href="https://t.me/malak_tour" aria-label="Telegram">
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <p className="address">
              <FaMapMarkerAlt /> {t("footer.address")}
            </p>
            <p className="hours">
              <FaClock /> {t("footer.hours")}
            </p>

            <iframe
              title="office-location"
              src="https://maps.google.com/maps?q=41.310139,69.279739&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map"
            ></iframe>
          </div>
        </div>

        <p className="copy">© {new Date().getFullYear()} {t("footer.copyright")}</p>
      </footer>

      {/* ---------- Call-request modal ---------- */}
      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <FiX size={24} />
            </button>

            <h3 className="modal-title">{t("intro.request_l")}</h3>

            {success ? (
              <div className="success-box" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <span style={{ color: "rgb(34, 187, 51)", fontSize: "5rem" }}>
                  <CiCircleCheck />
                </span>
                <p className="success-text" style={{ textAlign: "center" }}>
                  {t("intro.sc1")} <br />
                  {t("intro.sc2")}
                </p>
                <button className="modal-submit" onClick={closeModal}>
                  OK
                </button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder={t("intro.name")}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder={t("intro.phone_n")}
                />
                <textarea
                  rows="3"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("intro.input_a")}
                />
                <button type="submit" className="modal-submit" disabled={loading}>
                  {loading ? t("footer.loading") : t("intro.send")}
                </button>
              </form>
            )}

            {!success && <p className="modal-note">{t("intro.condition")}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;