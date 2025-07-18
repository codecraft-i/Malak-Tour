import { NavLink, useParams } from "react-router-dom";

// src/Pages/Base/NotFound/NotFound.jsx
export default function NotFound() {
  const { lang = "de" } = useParams();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404</h1>
      <p>Sahifa topilmadi.</p>
      <NavLink to={`/${lang}`}>Bosh sahifaga qaytish</NavLink>
    </div>
  );
}