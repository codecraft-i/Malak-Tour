import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiHeadphones, FiX } from 'react-icons/fi';
import './PromoBanner.css';

import { CiCircleCheck } from "react-icons/ci";
import { t } from 'i18next';

const API = 'https://malaktour.uz/api';

const PromoBanner = () => {
  const [promo, setPromo] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  /* ------- backenddan maʼlumot olish ------- */
  useEffect(() => {
    axios.get(`${API}/promotions/active/`).then((res) => {
      if (res.status === 200) {
        setPromo(res.data);
        setRemaining(res.data.seconds_left);
      }
    });
  }, []);

  /* -------------- taymer -------------- */
  useEffect(() => {
    if (!remaining) return;
    const id = setInterval(
      () => setRemaining((sec) => (sec > 0 ? sec - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [remaining]);

  const fmt = (n) => String(n).padStart(2, '0');
  const splitTime = (sec) => {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return { d, h, m, s: sec % 60 };
  };

  /* -------------- forma yuborish -------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/inquiries/`, {
      ...form,
      promotion: promo?.id || null,
    });
    setSent(true);
  };

  /* ------------------------------------------- */
  if (!promo)
    return (
      <section className="promo-banner--empty">
        {/* <p>Aksiya muddati tugadi</p> */}
      </section>
    );

  const { d, h, m, s } = splitTime(remaining || 0);

  return (
    <section
      className="promo-banner"
      style={{ backgroundImage: `url(${promo.image})` }}
    >
      <div className="promo-overlay">
        <div className="banner-wrapper">
          {/* ------------ CHAP TOMON ------------ */}
          <div className="banner-left">
            <h1 className="banner-title">{promo.banner_title}</h1>
            <p className="banner-subtitle">{promo.banner_subtitle}</p>

            {promo.discount_text && (
              <p className="banner-discount">{promo.discount_text}</p>
            )}
            {promo.discount_subtitle && (
              <p className="banner-discount--sub">{promo.discount_subtitle}</p>
            )}

            <div className="timer-box">
              <div className="timer-item">
                <span className="num">{fmt(d)}</span>
                <span className="label">kun</span>
              </div>
              <div className="timer-item">
                <span className="num">{fmt(h)}</span>
                <span className="label">soat</span>
              </div>
              <div className="timer-item">
                <span className="num">{fmt(m)}</span>
                <span className="label">daq</span>
              </div>
              <div className="timer-item">
                <span className="num">{fmt(s)}</span>
                <span className="label">son</span>
              </div>
            </div>
          </div>

          {/* ------------ O‘NG TOMON ------------ */}
          <div className="banner-right">
            <button className="cta-btn" onClick={() => setShowModal(true)}>
              <FiHeadphones size={26} />
              <span>So‘rovingizni qoldiring</span>
            </button>
            <p className="cta-note">
              Shoshilib qoling, takliflar soni cheklangan!
            </p>
          </div>
        </div>
      </div>

      {/* ------------- MODAL ------------- */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FiX size={24} />
            </button>

            {sent ? (
              <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#000"}}>
                <span style={{ color: "rgb(34, 187, 51)", fontSize: "5rem" }}><CiCircleCheck /></span>
                                <p className="success-text" style={{textAlign: "center"}}>
                                  {t('intro.sc1')} <br />
                                  {t('intro.sc2')}
                </p>
              </div>
            ) : (
              <>
                <h3 className="modal-title" style={{color: "#000"}}>{t('intro.request_l')}</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                  <input
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                    placeholder={t('intro.name')}
                  />
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder={`${t('intro.phone_n')} *`}
                    required
                  />
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={t('intro.input_a')}
                  />
                  <button type="submit" className="modal-submit">
                    {t('intro.send')}
                  </button>
                </form>
                <p className="modal-note">
                  {t('intro.condition')}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PromoBanner;