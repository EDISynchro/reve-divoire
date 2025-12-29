import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Facebook,
  Instagram,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export default function TopNav({
  announcement = 'Prochaine collecte : 14 décembre — Déposez vos dons à Frip2Rêve',
  showAnnouncement = true,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  /* ===== Scroll detection ===== */
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* ================= TOPBAR ================= */}
      {showAnnouncement && announcement && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            bg-[#F5E7D3] text-[#222222] text-sm
            ${atTop
              ? 'max-h-20 opacity-100 py-2'
              : 'max-h-0 opacity-0 py-0'}
          `}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="truncate">{announcement}</p>
          </div>
        </div>
      )}

      {/* ================= TOPNAV (TOUJOURS COLLÉ EN HAUT) ================= */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img
                src={require('../assets/logo.png')}
                alt="Logo Rêves d'Ivoire"
                className="w-20 h-20 object-contain"
              />
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/a-propos">À propos</NavLink>
              <NavLink to="/actions">Actions</NavLink>
              <NavLink to="/frip2reve">Frip2Rêve</NavLink>
              <NavLink to="/actualites">Actualités</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex p-2 rounded-md hover:bg-gray-100"
                aria-label="Rechercher"
              >
                <Search size={18} />
              </button>

              <div className="hidden md:flex items-center gap-2">
                <a href="https://www.facebook.com/revedivoire225">
                  <Facebook size={16} />
                </a>
                <a href="https://www.instagram.com/reve_divoire">
                  <Instagram size={16} />
                </a>
                <a href="https://www.tiktok.com/@revedivoire">
                  <SiTiktok size={16} />
                </a>
              </div>

              <a
                href="/don"
                className="hidden md:inline-block px-4 py-2 text-sm font-semibold rounded-md text-white bg-[#7B2D2D]"
              >
                Faire un don
              </a>

              <button
                className="md:hidden p-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          fixed inset-0 bg-white z-50 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src={require('../assets/logo.png')}
            alt="Logo"
            className="w-16 h-16"
          />
          <button onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>Accueil</NavLink>
          <NavLink to="/a-propos" onClick={() => setMobileOpen(false)}>À propos</NavLink>
          <NavLink to="/actions" onClick={() => setMobileOpen(false)}>Actions</NavLink>
          <NavLink to="/frip2reve" onClick={() => setMobileOpen(false)}>Frip2Rêve</NavLink>
          <NavLink to="/actualites" onClick={() => setMobileOpen(false)}>Actualités</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>

          <a
            href="/don"
            className="block text-center py-2 rounded-md bg-[#7B2D2D] text-white"
          >
            Faire un don
          </a>
        </div>
      </div>
    </header>
  );
}
