// src/pages/Frip2Reve/sections/Collections.js
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Collections — Section Collections & Catégories (mobile-first)
 * Objectif: aider rapidement un visiteur à trouver une pièce disponible.
 * - Filtres visibles (chips) : Taille, Style, Retrait
 * - Mobile: bouton "Filtrer" -> bottom-sheet
 * - Grille responsive: 2 cols mobile / 3-4 desktop
 * - Cartes produits avec badges (Disponible / Réservé / Vendu)
 * - CTA principal sur mobile plein largeur, sticky "Filtrer"
 * - Accessibilité: labels, focus-visible, aria-pressed pour chips
 * - SEO: H2 unique, contenu textuel
 *
 * Note d'intégration:
 *  - Ajuster `whatsappNumber` pour la redirection Commander.
 *  - Passer la prop `items` pour connecter à un backend ou CMS.
 */

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Taille unique"];
const STYLES = ["Traditionnel", "Moderne", "Mixte", "Enfant", "Accessoires"];
const LOCATIONS = ["Beauvais", "Autre point de retrait", "Livraison possible"];

function toggleSet(set, value) {
  const n = new Set(set);
  if (n.has(value)) n.delete(value);
  else n.add(value);
  return n;
}

export default function Collections({ items = defaultItems, whatsappNumber = "33123456789" }) {
  // filtres temporaires (non appliqués tant que l'utilisateur n'a pas cliqué sur Appliquer sur mobile)
  const [sizeFilter, setSizeFilter] = useState(new Set());
  const [styleFilter, setStyleFilter] = useState(new Set());
  const [locFilter, setLocFilter] = useState(new Set());

  // version temp pendant édition mobile
  const [tempSize, setTempSize] = useState(new Set());
  const [tempStyle, setTempStyle] = useState(new Set());
  const [tempLoc, setTempLoc] = useState(new Set());

  const [mobileOpen, setMobileOpen] = useState(false);

  // compteur et filtered list (temps réel pour desktop; pour mobile on applique à la validation)
  const filtered = useMemo(() => {
    return items.filter((it) => {
      // must be available to show
      if (!it.available) return false;
      if (sizeFilter.size && sizeFilter.size > 0 && !sizeFilter.has(it.size)) return false;
      if (styleFilter.size && styleFilter.size > 0 && !styleFilter.has(it.style)) return false;
      if (locFilter.size && locFilter.size > 0 && !locFilter.has(it.location)) return false;
      return true;
    });
  }, [items, sizeFilter, styleFilter, locFilter]);

  // Mobile: copy current filters into temp when opening
  const openMobile = () => {
    setTempSize(new Set(sizeFilter));
    setTempStyle(new Set(styleFilter));
    setTempLoc(new Set(locFilter));
    setMobileOpen(true);
    document.body.style.overflow = "hidden"; // lock scroll
  };
  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const applyMobileFilters = () => {
    setSizeFilter(new Set(tempSize));
    setStyleFilter(new Set(tempStyle));
    setLocFilter(new Set(tempLoc));
    closeMobile();
  };

  const resetAll = () => {
    setSizeFilter(new Set());
    setStyleFilter(new Set());
    setLocFilter(new Set());
    setTempSize(new Set());
    setTempStyle(new Set());
    setTempLoc(new Set());
  };

  const removeChip = (kind, value) => {
    if (kind === "size") setSizeFilter((s) => { const n = new Set(s); n.delete(value); return n; });
    if (kind === "style") setStyleFilter((s) => { const n = new Set(s); n.delete(value); return n; });
    if (kind === "loc") setLocFilter((s) => { const n = new Set(s); n.delete(value); return n; });
  };

  // sticky bottom filter button on mobile: only show when not open
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <section aria-labelledby="collections-h2" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header + info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="collections-h2" className="text-2xl sm:text-3xl font-extrabold">Trouve la pièce qui te correspond</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Filtre par taille, style ou lieu de retrait pour voir uniquement ce qui est dispo maintenant.</p>
            <p className="mt-1 text-xs text-gray-500">Seules les pièces disponibles s’affichent.</p>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              onClick={resetAll}
            >
              Réinitialiser
            </button>
            <div className="text-sm text-gray-700">{filtered.length} pièces disponibles</div>
          </div>
        </div>

        {/* Filters (desktop visible) */}
        <div className="mt-6 hidden sm:block">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Taille */}
            <div aria-label="Filtrer par taille" className="flex items-center gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSizeFilter((cur) => toggleSet(cur, s))}
                  className={`px-3 py-1 rounded-full text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${sizeFilter.has(s) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}
                  aria-pressed={sizeFilter.has(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Style */}
            <div aria-label="Filtrer par style" className="flex items-center gap-2 flex-wrap">
              {STYLES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStyleFilter((cur) => toggleSet(cur, st))}
                  className={`px-3 py-1 rounded-full text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${styleFilter.has(st) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}
                  aria-pressed={styleFilter.has(st)}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Location */}
            <div aria-label="Filtrer par retrait" className="flex items-center gap-2 flex-wrap">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocFilter((cur) => toggleSet(cur, loc))}
                  className={`px-3 py-1 rounded-full text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${locFilter.has(loc) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}
                  aria-pressed={locFilter.has(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Active chips */}
            <div className="ml-auto flex items-center gap-2">
              {Array.from(sizeFilter).map((v) => (
                <button key={`chip-size-${v}`} onClick={() => removeChip('size', v)} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {v} <span className="sr-only">— retirer filtre taille</span>
                </button>
              ))}
              {Array.from(styleFilter).map((v) => (
                <button key={`chip-style-${v}`} onClick={() => removeChip('style', v)} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {v} <span className="sr-only">— retirer filtre style</span>
                </button>
              ))}
              {Array.from(locFilter).map((v) => (
                <button key={`chip-loc-${v}`} onClick={() => removeChip('loc', v)} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {v} <span className="sr-only">— retirer filtre retrait</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile sticky Filter button */}
        <div className="sm:hidden">
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <button onClick={openMobile} className="flex-1 px-4 py-3 rounded-md bg-indigo-600 text-white text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">Filtrer</button>
              <button onClick={resetAll} className="px-4 py-3 rounded-md border text-base">Réinitialiser</button>
            </div>
            <div className="mt-3 text-sm text-gray-700">{filtered.length} pièces disponibles</div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base text-gray-600">Aucune pièce ne correspond à ces filtres pour le moment.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); resetAll(); }} className="mt-4 inline-block text-indigo-600 underline">Voir toutes les pièces</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((it) => (
                <ProductCard key={it.id} item={it} whatsappNumber={whatsappNumber} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom-sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeMobile} />
          <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-lg p-4 max-h-[85vh] overflow-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Filtrer</h3>
              <button onClick={closeMobile} className="px-3 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">Fermer</button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm font-semibold">Taille</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTempSize((cur) => toggleSet(cur, s))}
                      className={`px-3 py-2 rounded-md text-base w-full ${tempSize.has(s) ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
                      aria-pressed={tempSize.has(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Style</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {STYLES.map((st) => (
                    <button
                      key={st}
                      onClick={() => setTempStyle((cur) => toggleSet(cur, st))}
                      className={`px-3 py-2 rounded-md text-base w-full ${tempStyle.has(st) ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
                      aria-pressed={tempStyle.has(st)}
                    >{st}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Retrait</div>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setTempLoc((cur) => toggleSet(cur, loc))}
                      className={`px-3 py-2 rounded-md text-base w-full ${tempLoc.has(loc) ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
                      aria-pressed={tempLoc.has(loc)}
                    >{loc}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-4 left-4 right-4">
              <div className="flex gap-3">
                <button onClick={() => { setTempSize(new Set()); setTempStyle(new Set()); setTempLoc(new Set()); }} className="flex-1 px-4 py-3 rounded-md border">Réinitialiser</button>
                <button onClick={applyMobileFilters} className="flex-1 px-4 py-3 rounded-md bg-indigo-600 text-white">Appliquer les filtres</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Filter CTA on mobile when not open */}
      <div className="sm:hidden fixed left-4 right-4 bottom-4 z-40 pointer-events-auto">
        <div className="flex gap-3">
          <button onClick={openMobile} className="flex-1 px-4 py-3 rounded-md bg-white border">Filtres</button>
          <a href="#grid" className="flex-1 px-4 py-3 rounded-md bg-indigo-600 text-white text-center">Voir ({filtered.length})</a>
        </div>
      </div>

    </section>
  );
}

Collections.propTypes = {
  items: PropTypes.array,
  whatsappNumber: PropTypes.string,
};

/** ProductCard component */
function ProductCard({ item, whatsappNumber }) {
  const [idx, setIdx] = useState(0);
  const images = item.images && item.images.length ? item.images : [null];

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour%20Frip2R%C3%AAve%20-%20Je%20souhaite%20commander%20:"+item.title)}`;

  return (
    <article className={`border rounded-md overflow-hidden bg-white`} aria-labelledby={`p-${item.id}-title`}>
      <div className="relative bg-gray-100 h-44 flex items-center justify-center">
        {images[0] ? (
          <img src={images[idx]} alt={item.title} className="object-cover w-full h-44" />
        ) : (
          <div className="text-gray-400">Image</div>
        )}

        {images.length > 1 && (
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <button aria-label="Image précédente" onClick={prev} className="px-2 py-1 bg-white rounded focus:outline-none">‹</button>
            <button aria-label="Image suivante" onClick={next} className="px-2 py-1 bg-white rounded focus:outline-none">›</button>
          </div>
        )}

        {/* Badge */}
        <span className={`absolute left-2 top-2 px-2 py-1 text-xs font-semibold rounded ${item.status === 'sold' ? 'bg-gray-300 text-gray-700' : item.status === 'reserved' ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'}`}>
          {item.status === 'sold' ? 'Vendu' : item.status === 'reserved' ? 'Réservé' : 'Disponible'}
        </span>
      </div>

      <div className="p-3">
        <h3 id={`p-${item.id}-title`} className="text-sm font-semibold text-gray-900">{item.title}</h3>
        <div className="mt-1 text-xs text-gray-600">{item.size} • {item.style}</div>
        <div className="mt-2 text-sm font-medium text-gray-900">{item.price ? item.price + ' €' : ''}</div>

        {item.quantity === 1 && item.status === 'available' && (
          <div className="mt-2 text-xs text-red-600">Dernière pièce disponible</div>
        )}

        <div className="mt-3">
          {item.status === 'sold' ? (
            <button disabled className="w-full px-3 py-2 rounded-md bg-gray-200 text-gray-600">Vendu</button>
          ) : (
            <div className="flex gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 rounded-md bg-[#7B2D2D] text-white text-center">Commander</a>
              <button className="px-3 py-2 rounded-md border">Voir détails</button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  whatsappNumber: PropTypes.string,
};

// Exemple de données par défaut (12 pièces) — visibles sans JS uniquement si intégrées côté serveur
const defaultItems = [
  { id: 1, title: "Robe Wax rouge", size: "M", style: "Traditionnel", location: "Beauvais", available: true, status: 'available', quantity: 2, price: 35, images: [] },
  { id: 2, title: "Chemise Ankara homme", size: "L", style: "Moderne", location: "Amiens", available: true, status: 'available', quantity: 1, price: 45, images: [] },
  { id: 3, title: "Jupe vintage", size: "S", style: "Mixte", location: "Paris (point relais)", available: true, status: 'reserved', quantity: 1, price: 28, images: [] },
  { id: 4, title: "T-shirt casual", size: "M", style: "Moderne", location: "Beauvais", available: true, status: 'available', quantity: 3, price: 12, images: [] },
  { id: 5, title: "Veste chic", size: "XL", style: "Mixte", location: "Livraison possible", available: true, status: 'available', quantity: 1, price: 60, images: [] },
  { id: 6, title: "Ensemble enfant", size: "XS", style: "Enfant", location: "Beauvais", available: true, status: 'available', quantity: 4, price: 20, images: [] },
  { id: 7, title: "Sac accessoires", size: "Taille unique", style: "Accessoires", location: "Paris (point relais)", available: true, status: 'available', quantity: 2, price: 15, images: [] },
  { id: 8, title: "Robe Wax bleue", size: "L", style: "Traditionnel", location: "Amiens", available: true, status: 'available', quantity: 1, price: 40, images: [] },
  { id: 9, title: "Chemisette casual", size: "M", style: "Moderne", location: "Livraison possible", available: true, status: 'available', quantity: 2, price: 18, images: [] },
  { id: 10, title: "Gilet vintage", size: "XL", style: "Vintage", location: "Beauvais", available: true, status: 'sold', quantity: 0, price: 30, images: [] },
  { id: 11, title: "Pantalon Ankara", size: "S", style: "Traditionnel", location: "Amiens", available: true, status: 'available', quantity: 1, price: 25, images: [] },
  { id: 12, title: "Blouse chic", size: "M", style: "Mixte", location: "Paris (point relais)", available: true, status: 'available', quantity: 2, price: 32, images: [] },
];
