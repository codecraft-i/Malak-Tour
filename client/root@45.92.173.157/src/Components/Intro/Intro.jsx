// src/components/Intro/Intro.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHeadphones,
  FiX,
} from "react-icons/fi";
import axios from "axios";                 // ➊  Axios qo‘shildi
import Header from "../Header/Header";
import "./Intro.css";
import { CiCircleCheck } from "react-icons/ci";

import { useTranslation } from "react-i18next";

const Intro = () => {
  const { t } = useTranslation();

  const slides = [
    {
      image: "/Images/im14.jpg",
      title: t('intro.h_tx1'),
      subtitle: t('intro.h_tx1_sb'),
    },
    {
      image: "/Images/im11.jpg",
      title: t('intro.h_tx2'),
      subtitle: t('intro.h_tx2_sb'),
    },
    {
      image: "/Images/im7.jpg",
      title: t('intro.h_tx3'),
      subtitle: t('intro.h_tx3_sb'),
    },
    {
      image: "/Images/im1.jpg",
      title: t('intro.h_tx4'),
      subtitle: t('intro.h_tx4_sb'),
    },
  ];
  /* ---------- Slider state ---------- */
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    []
  );
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  /* ---------- Autoplay (3 s) ---------- */
  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextSlide, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [current, nextSlide]);

  /* ---------- Modal state ---------- */
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSuccess(false);             // modal yopilganda success-ni tiklash
  };

  /* ---------- Form state ---------- */
  const [form, setForm] = useState({ full_name: "", phone: "", message: "" });
  const [success, setSuccess] = useState(false);      // ➋  muvaffaqiyat flag
  const [loading, setLoading] = useState(false);      // (ixtiyoriy) loader

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://malaktour.uz/api/call-request/", form);
      setSuccess(true);            // ➌  xabar chiqadi
      setForm({ full_name: "", phone: "", message: "" });
    } catch (err) {
      alert("Yuborishda xatolik: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div
      className="intro-container"
      style={{ backgroundImage: `url(${slides[current].image})` }}
    >
      {/* Overlay + content */}
      <div className="intro-overlay">
        <Header />

        {/* Central text */}
        <div className="intro-textbox">
          <h1 className="intro-title">{slides[current].title}</h1>
          <h2 className="intro-subtitle">{slides[current].subtitle}</h2>
        </div>

        {/* Left-side “So‘rovnoma” button */}
        <button className="survey-btn" onClick={openModal}>
          <span className="survey-icon">
            <FiHeadphones size={32} />
          </span>
          <span className="survey-label" style={{textTransform: "uppercase"}}>
            {t('intro.request_l_title')}
          </span>
        </button>

        {/* Right-side arrows */}
        <div className="arrows-box">
          <button className="arrow-btn" onClick={prevSlide}>
            <FiArrowLeft size={28} />
          </button>
          <button className="arrow-btn" onClick={nextSlide}>
            <FiArrowRight size={38} />
          </button>
        </div>

        {/* Numeric indicators */}
        <div className="counter-box">
          {slides.map((_, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <span
                key={num}
                className={`counter-item ${idx === current ? "active" : ""}`}
                onClick={() => setCurrent(idx)}
              >
                {num}
              </span>
            );
          })}
        </div>
      </div>

      {/* ------------ Modal ------------- */}
      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              <FiX size={24} />
            </button>

            <h3 className="modal-title">{t('intro.request_l')}</h3>

            {success ? (                                   /* ➍  Success hududi */
              <div className="success-box" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <span style={{ color: "rgb(34, 187, 51)", fontSize: "5rem" }}><CiCircleCheck /></span>
                <p className="success-text" style={{textAlign: "center"}}>
                  {t('intro.sc1')} <br />
                  {t('intro.sc2')}
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
                  placeholder={t('intro.name')}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder={`${t('intro.phone_n')} *`}
                />
                <textarea
                  rows="3"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={`${t('intro.input_a')}`}
                />
                <button
                  type="submit"
                  className="modal-submit"
                  disabled={loading}
                >
                  {loading ? "Sending…" : t('intro.send')}
                </button>
              </form>
            )}

            {!success && (
              <p className="modal-note">
                {t('intro.condition')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;