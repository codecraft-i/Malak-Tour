// -------------- src/Components/GallerySection/GallerySection.jsx --------------
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./GallerySection.css";

const fallbackImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "/Images/im11.jpg",
  "https://uz.bestmagistictour.uz/thumb/2/A4iCVQD39y15rlrViUKIeg/1500r1500/d/ller.webp",
  "/Images/im2.jpg",
  "/Images/im3.jpg",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
];

export default function GallerySection({ images = fallbackImages }) {
  const { t } = useTranslation();
  const { lang = "uz" } = useParams();
  const navigate = useNavigate();

  /* —— Lightbox holati —— */
  const [photoIdx, setPhotoIdx] = useState(-1); // -1 → yopiq

  /* Escape tugmasi bilan yopish */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setPhotoIdx(-1);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* Slaydlar massivi (YARL formatida) */
  const slides = images.map((src) => ({ src }));

  /* “Barchasi” sahifasiga yo‘naltirish (agar kerak bo‘lsa) */
  const goToFullGallery = () => navigate(`/${lang}/gallery`);

  return (
    <section className="gallery">
      <div className="gallery__wrapper">
        {/* ---------- Heading ---------- */}
        <header className="gallery__heading">
          <h2>{t("gallery.title")}</h2>
          <p>{t("gallery.subtitle")}</p>
        </header>

        {/* ---------- Grid ---------- */}
        <div className="gallery__grid">
          {images.map((src, idx) => (
            <figure
              key={idx}
              className={`gallery__item item-${(idx % 7) + 1}`}
              onClick={() => setPhotoIdx(idx)}
            >
              <img
                src={src}
                alt={`${t("gallery.imageAlt")} ${idx + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* ---------- Button ---------- */}
        <button className="gallery__btn" onClick={goToFullGallery}>
          {t("gallery.viewAll")}
        </button>
      </div>

      {/* ---------- YARL Lightbox ---------- */}
      <Lightbox
        open={photoIdx >= 0}
        close={() => setPhotoIdx(-1)}
        index={photoIdx}
        slides={slides}
        plugins={[Thumbnails]}
      />
    </section>
  );
}