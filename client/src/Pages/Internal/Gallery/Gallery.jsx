// -------------- src/Pages/Internal/Gallery.jsx --------------
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

/* ▶️  Lightbox (YARL) */
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

import "./Gallery.css";

export default function Gallery() {
  const { lang = "uz" } = useParams();
  const { t } = useTranslation();
  const api = useAxios();

  /* —— State —— */
  const [images, setImages] = useState([]);          // ["/media/…", …]
  const [loading, setLoading] = useState(true);
  const [photoIdx, setPhotoIdx] = useState(-1);      // -1 → lightbox yopiq

  /* —— Fetch —— */
  useEffect(() => {
    setLoading(true);
    api
      .get("/gallery/")          // GET http://127.0.0.1:8000/api/gallery/
      .then((res) => {
        // DRF returns [{ id, image, tour }, …]
        setImages(res.data.map((g) => g.image));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lang]);                      // Til o‘zgarsa — lokalizatsiya uchun yana fetch

  /* —— YARL slaydlari —— */
  const slides = images.map((src) => ({ src }));

  return (
    <div className="gallery-baseBox">
      <Header />

      <main className="gallery-page">
        <h1 className="gallery-title">{t("galleries.allPhotos")}</h1>

        {loading ? (
          <div className="gallery-loading">{t("common.loading")}</div>
        ) : (
          <div className="gallery-grid">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="gallery-item"
                onClick={() => setPhotoIdx(idx)}
              >
                <img src={src} alt={`Gallery image ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {/* —— Lightbox —— */}
        <Lightbox
          open={photoIdx >= 0}
          close={() => setPhotoIdx(-1)}
          index={photoIdx}
          slides={slides}
          plugins={[Thumbnails]}
        />
      </main>

      <Footer />
    </div>
  );
}