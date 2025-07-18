// -------------------- src/Components/Header/Header.jsx --------------------
import {
  FaInstagram, FaFacebookF, FaTelegramPlane, FaWhatsapp, FaPhoneAlt,
  FaBars, FaTimes, FaViber, FaHeadphones, FaChevronDown,
} from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';            // ➊ NEW
import { useTranslation } from 'react-i18next';
import useAxios from '../../utils/useAxios';
import { tField } from '../../utils/i18nField';

import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import logo from '/logo.png';
import './Header.css';

import PhoneLink from '../PhoneLink/PhoneLink';

export default function Header() {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams();          // /:lang/…
  const api = useAxios();

  /* ———  State  ——— */
  const [showMobile, setShowMobile] = useState(false);
  const [open, setOpen] = useState({ contact: false, more: false, uz: false, world: false });
  const [width, setWidth] = useState(window.innerWidth);

  const [worldTours,  setWorld]  = useState([]);   // international
  const [uzTours,     setUz]     = useState([]);   // national
  const loadingTours = !worldTours.length && !uzTours.length;

  /* ———  Refs (close on click‑outside)  ——— */
  const refs = {
    contact: useRef(null), more: useRef(null),
    uz: useRef(null),      world: useRef(null),
  };

  /* ———  Fetch tours once (lang‑aware)  ——— */
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const [intl, nat] = await Promise.all([
          api.get('/tours/', { params: { tour_type: 'international' } }),
          api.get('/tours/', { params: { tour_type: 'national' } }),
        ]);
        setWorld(intl.data);
        setUz(nat.data);
      } catch (e) {
        console.error('Tour fetch error', e);
      }
    };
    fetchTours();
  }, [lang]);

  /* ———  Resize & click‑outside  ——— */
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    const outside = (e) => {
      if (Object.values(refs).every(r => r.current && !r.current.contains(e.target)))
        setOpen({ contact: false, more: false, uz: false, world: false });
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('mousedown', outside);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousedown', outside);
    };
  }, []);

  /* ———  Menyu prioriteti  ——— */
  const baseItems = [
    { label: t('header.home')  || 'Bosh sahifa',        key: 'home',  href: `/${lang}` , pr: 1 },
    { label: t('header.about') || 'Kompaniya haqida',   key: 'about', href: `/${lang}#about`, pr: 2 },
    {
      label: t('header.international_tours') || "Butun dunyo bo'ylab sayohatlar",
      key:'world', pr:3, isDD:true,
      items: worldTours.map(t => ({
        label:tField(t,'title',lang), slug:t.slug
      })),
    },
  ];

  const extra = [
  {
    label: t('header.national_tours') || "O'zbekiston bo'ylab turlar",
    key:'uz', isDD:true,
    items: uzTours.map(t=>({
      label:tField(t,'title',lang), slug:t.slug
    })),
  },
  { label: t('header.pic_gallary') || 'Suratlar galereyasi', href: `/${lang}/gallery` },
  { label: t('header.contacts')   || 'Kontaktlar', href: `/${lang}/contacts` },
];

  const mobileBreakpoint = 1050;

  // ❶ RESPONSIVE: nechta menyu item ko‘rsatamiz?
  const maxVisible =
      width < mobileBreakpoint ? 0
    : width < 1200            ? 1
    : width < 1450            ? 2
    :                            3;

  useEffect(() => {
    if (width >= mobileBreakpoint && showMobile) setShowMobile(false);
  }, [width]);

  const sorted     = [...baseItems].sort((a,b)=>a.pr-b.pr);
  const visible    = sorted.slice(0, maxVisible);
  const moreItems  = sorted.slice(maxVisible);

  /* ———  Helper: close others & toggle  ——— */
  const toggle = (k) => setOpen(p=>({ ...{contact:false,more:false,uz:false,world:false}, [k]:!p[k] }));

  /* ———  Element renderer (desktop)  ——— */
  const renderTopItem = (item) => {
    // ABOUT – hash‑link smooth‑scroll
    if (item.key === 'about') {
      return (
        <HashLink smooth to={item.href} key="about">
          {item.label}
        </HashLink>
      );
    }

    return !item.isDD ? (
      <Link to={item.href} key={item.key}>{item.label}</Link>
    ) : (
      <div
        className={`dropdown-wrapper ${open[item.key] ? 'active' : ''}`}
        ref={refs[item.key]} key={item.key}
        onMouseEnter={() => setOpen(p => ({ ...p, [item.key]: true }))}
        onMouseLeave={() => setOpen(p => ({ ...p, [item.key]: false }))}
      >
        <NavLink
          to={`/${lang}/tours/international`}
          className="dropdown-title"
          onClick={() => toggle(item.key)}
        >
          {item.label} <FaChevronDown style={{ marginLeft: 8 }} />
        </NavLink>
        <div className="dropdown-before" />
        {open[item.key] && (
          <div className="dropdown-content">
            {item.items.map(o => (
              <Link key={o.slug} to={`/${lang}/tours/${o.slug}`}>{o.label}</Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const navigate = useNavigate();
  const [mobDD, setMobDD] = useState({ world: false, uz: false });

  const handleMobLabel = (key, targetPath) => {
    setMobDD(prev => {
      if (!prev[key]) return { ...prev, [key]: true };   // 1‑chi bosish — ochish
      setShowMobile(false);                              // 2‑chi bosish — navigatsiya
      navigate(targetPath);
      return prev;
    });
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ———  JSX  ——— */
  return (
    <header className={`header ${scrolled ? 'glass' : ''}`}>
      <div className="header-left">
        <Link to={`/${lang}`}>
          <img src={logo} alt="Malak Tour" className="logo" />
        </Link>
      </div>

      {/* ———  NAV  ——— */}
      <nav className={`nav-links ${showMobile ? 'show' : ''}`}>
        {/* —— Desktop visible —— */}
        {!showMobile && visible.map(renderTopItem)}

        {/* —— “Yana” dropdown —— */}
        {!showMobile && (
          <div
            className={`dropdown-wrapper ${open.more ? 'active' : ''}`}
            ref={refs.more}
            onMouseEnter={() => setOpen(p => ({ ...p, more: true }))}
            onMouseLeave={() => setOpen(p => ({ ...p, more: false, uz: false }))}
          >
            <span className="dropdown-title" onClick={() => toggle('more')}>
              {t('header.more') || 'Yana'} <FaChevronDown style={{ marginLeft: 8 }} />
            </span>
            <div className="dropdown-before" />
            {open.more && (
              <div className="dropdown-content multi-column">
                <div className="column">
                  {moreItems.map(renderTopItem)}
                  {/* —— Extra items (incl. uz dropdown) —— */}
                  {extra.map((ex, i) =>
                    ex.isDD ? (
                      <div
                        className="nested-dropdown"
                        key={`ex-${i}`} ref={refs.uz}
                        onMouseEnter={() => setOpen(p => ({ ...p, uz: true }))}
                        onMouseLeave={() => setOpen(p => ({ ...p, uz: false }))}
                      >
                        {/* ➋ NOW A LINK */}
                        <NavLink
                          to={`/${lang}/tours/national`}
                          className="nested-title"
                        >
                          {ex.label} <FaChevronDown />
                        </NavLink>
                        <div className="nested-before" />
                        {open.uz && (
                          <div className="nested-submenu">
                            {ex.items.map(o => (
                              <Link
                                key={o.slug}
                                to={`/${lang}/tours/${o.slug}`}
                                style={{ paddingLeft: '8px' }}
                              >
                                {o.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={`ex-${i}`} to={ex.href}>{ex.label}</Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* —— Mobile menu —— */}
        {showMobile && (
          <div className="mobile-menu">
            {/* Cancel tugmasi */}
            <button
              className="mobile-cancel"
              onClick={() => setShowMobile(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            {/* Bosh sahifa va About */}
            <Link
              to={`/${lang}`}
              className="mobile-link"
              onClick={() => setShowMobile(false)}
            >
              {t('header.home') || 'Bosh sahifa'}
            </Link>

            <HashLink
              smooth
              to={`/${lang}#about`}
              className="mobile-link"
              onClick={() => setShowMobile(false)}
            >
              {t('header.about') || 'Biz haqimizda'}
            </HashLink>

            {/* —— International Tours —— */}
            <div className="mobile-dropdown">
              <div
                className="mobile-label"
                onClick={() => handleMobLabel('world', `/${lang}/tours/international`)}
              >
                {t('header.international_tours') || 'Xalqaro sayohatlar'}
                <FaChevronDown
                  className={mobDD.world ? 'rotated' : ''}
                  style={{ marginLeft: 6 }}
                />
              </div>

              {mobDD.world && worldTours.map(o => (
                <Link
                  key={o.slug}
                  to={`/${lang}/tours/${o.slug}`}
                  className="mobile-subitem"
                  onClick={() => setShowMobile(false)}
                >
                  {tField(o, 'title', lang)}
                </Link>
              ))}
            </div>

            {/* —— National Tours —— */}
            <div className="mobile-dropdown">
              <div
                className="mobile-label"
                onClick={() => handleMobLabel('uz', `/${lang}/tours/national`)}
              >
                {t('header.national_tours') || "O'zbekiston bo'ylab turlar"}
                <FaChevronDown
                  className={mobDD.uz ? 'rotated' : ''}
                  style={{ marginLeft: 6 }}
                />
              </div>

              {mobDD.uz && uzTours.map(o => (
                <Link
                  key={o.slug}
                  to={`/${lang}/tours/${o.slug}`}
                  className="mobile-subitem"
                  onClick={() => setShowMobile(false)}
                >
                  {tField(o, 'title', lang)}
                </Link>
              ))}
            </div>

            {/* Galereya va Kontaktlar */}
            <Link
              to={`/${lang}/gallery`}
              className="mobile-link"
              onClick={() => setShowMobile(false)}
            >
              {t('header.pic_gallary') || 'Suratlar galereyasi'}
            </Link>

            <Link
              to={`/${lang}/contacts`}
              className="mobile-link"
              onClick={() => setShowMobile(false)}
            >
              {t('header.contacts') || 'Kontaktlar'}
            </Link>

            {/* Social icons */}
            <div className="mobile-social">
              <Link to="https://www.instagram.com/malak_tour_?utm_source=qr&igsh=MXF1cDJrZjJ5NG1hcg%3D%3D" className="cb-headNavs2 i-cb-ins2"><FaInstagram/></Link>
              <Link to="https://t.me/malak_tour" className="cb-headNavs2 i-cb-tg2"><FaTelegramPlane/></Link>
            </div>
          </div>
        )}
      </nav>

      {/* ———  RIGHT SIDE ——— */}
      <div className="header-right">
        <Link to="https://www.instagram.com/malak_tour_?utm_source=qr&igsh=MXF1cDJrZjJ5NG1hcg%3D%3D" className="cb-headNavs i-cb-ins"><FaInstagram/></Link>
        <Link to="https://t.me/malak_tour" className="cb-headNavs i-cb-tg"><FaTelegramPlane/></Link>

        <div
          className={`contact-wrapper ${open.contact ? 'active' : ''}`}
          ref={refs.contact}
          onMouseEnter={() => setOpen(p => ({ ...p, contact: true }))}
          onMouseLeave={() => setOpen(p => ({ ...p, contact: false }))}
        >
          <div className="circle-button contact-btn" onClick={() => toggle('contact')}>
            <FaPhoneAlt style={{ marginRight: 8 }} /> {t('header.contacts') || 'Kontaktlar'}
          </div>
          {open.contact && (
            <div className="contact-popup">
              <p className="phone">+998 (91) 977-77-35</p>
              <div className="icons"><FaTelegramPlane/><FaWhatsapp/><FaViber/></div>
              <p className="address">Toshkent, Chilonzor 19‑kv 60‑dom</p>
              <div className="callback-btn"><FaHeadphones/><span>{t('header.call_me')}</span></div>
            </div>
          )}
        </div>

        <PhoneLink number="+998919777735" />

        <LanguageDropdown/>

        <button className="menu-toggle" onClick={() => setShowMobile(!showMobile)}>
          {showMobile ? <FaTimes/> : <FaBars/>}
        </button>
      </div>
    </header>
  );
}