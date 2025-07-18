import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import './LanguageDropdown.css';

/* -- Til va bayroq ma’lumotlari markazlashgan holda: */
const LANGS = [
  { code: 'uz', label: "O'zbekcha", flag: 'https://flagcdn.com/w40/uz.png' },
  { code: 'en', label: 'English',  flag: 'https://flagpedia.net/data/flags/w580/gb.webp' },
  { code: 'ru', label: 'Русский',  flag: 'https://flagcdn.com/w40/ru.png' },
];

export default function LanguageDropdown() {
  const { lang } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  /* -- URL’ni yangi tilga almashtirish */
  const hrefFor = (newCode) => {
    const parts = location.pathname.split('/');
    parts[1] = newCode;                    //  "/de/about" ➜ "/en/about"
    return parts.join('/') + location.search + location.hash;
  };

  /* -- Dropdown tashqarisiga bosilganda yopish */
  useEffect(() => {
    const onClick = (e) => !e.target.closest('.lang-selector') && setOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  return (
    <div className="lang-selector">
      {/* -- Tugma: joriy bayroq + pastga strelka */}
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        <img src={current.flag} alt={current.code} className="lang-flag" />
        <span className={`caret ${open ? 'rotate' : ''}`}>▾</span>
      </button>

      {/* -- Dropdown ro'yxati */}
      <ul className={`lang-dropdown ${open ? 'show' : ''}`}>
        {LANGS.map(l => (
          <li key={l.code}>
            <Link
              to={hrefFor(l.code)}
              className={l.code === current.code ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <img src={l.flag} alt={l.code} className="lang-flag" />
              <span className="label">{l.label}</span>
              {l.code === current.code && <span className="check">✓</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}