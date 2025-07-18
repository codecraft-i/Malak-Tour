// AboutPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutPage.css";

import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="about-base-page">
      <Header />
     <div className="about-page">
       <div className="about-page__container">
        <div className="about-page__text">
          <h1>{t("about.title")}</h1>
          <p className="highlight">{t("about.intro")}</p>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <p className="contact-invite">{t("about-p.contactCall")}</p>

          {/* <div className="about-page__signature">
            <p><strong>{t("about-p.signature.respectfully")}</strong></p>
            <p><strong>{t("about-p.signature.director")}</strong></p>
            <p><strong>{t("about-p.signature.name")}</strong></p>
          </div> */}
        </div>

        <div className="about-page__image">
          <img src="/about.webp" alt="Beach and palm" />
        </div>
      </div>
     </div>
     <Footer />
    </div>
  );
};

export default AboutPage;
