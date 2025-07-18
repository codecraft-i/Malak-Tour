// PhoneLink.jsx
import React from "react";
import { PiPhone } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const PhoneLink = ({ number = "+998919777735" }) => {
  const { t } = useTranslation();          // 🔑 i18n matnini olish

  return (
    <>
      <a className="phone-link" href={`tel:${number}`}>
        <PiPhone className="phone-link-icon" style={{ marginRight: "8px" }} />
        <span className="phone-link-text">{t("header.connection")}</span>
      </a>

      {/* Scoped CSS – tashqi fayl kerak emas */}
      <style>{`
        .phone-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;                       /* ikonka ↔ matn oralig‘i */
          background: #d4af37;            /* oltin rang */
          color: #ffffff;
          padding: 15px 20px;
          border-radius: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .phone-link:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }
        .phone-link:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default PhoneLink;