import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Article.js — Section Article (template)
 * Version mise à jour : FULL-WIDTH desktop (hero full-bleed + layout 2-col étalé), mobile-first behavior
 * - Desktop : hero full-bleed, contenu en grille deux colonnes (contenu principal large + sidebar fixe/sticky)
 * - Mobile  : images en haut, CTA sticky bas, galerie swipe
 * - Accessible, SEO-friendly, tailwind utility classes
 *
 * Props:
 *  - article: objet (voir defaults)
 *  - onParticipate, onReminder: callbacks facultatifs
 *  - whatsappNumber
 */

export default function Article({ article: articleProp, onParticipate, onReminder, whatsappNumber = '33123456789' }) {
  const defaultArticle = {
    id: 'live-vente-beauvais',
    title: 'Live-vente solidaire Frip2Rêve à Beauvais',
    date: '2025-12-21T20:00:00',
    tag: 'evenement',
    tagLabel: 'Événement',
    location: 'Beauvais / Instagram Live (@frip2reve)',
    intro: 'Nous organisons une nouvelle live-vente solidaire pour présenter des pièces africaines uniques, remises à neuf avec soin. Chaque achat soutient directement nos actions solidaires.',
    content: [
      { type: 'p', text: 'Présentation rapide de l’événement — format, déroulé, intervenants.' },
      { type: 'p', text: "Pourquoi c’est important : soutien local et international, réemploi textile." },
      { type: 'p', text: "À qui ça s’adresse : toute personne intéressée par la mode responsable et solidaire." },
    ],
    infos: {
      when: 'Samedi 21 décembre à 20h00',
      where: 'Instagram Live — @frip2reve',
      what: 'Vente de pièces uniques, quantités limitées',
    },
    status: 'upcoming',
    images: [
      { src: 'https://picsum.photos/seed/art1/1600/900', alt: 'Live-vente Frip2Rêve — vêtements africains solidaires', caption: 'Aperçu des pièces proposées' },
      { src: 'https://picsum.photos/seed/art2/1200/900', alt: 'Détail tissu wax', caption: 'Détail du tissu' },
      { src: 'https://picsum.photos/seed/art3/1200/900', alt: 'Préparation colis solidaires', caption: 'Préparation des colis' },
    ],
  };

  const [article] = useState(articleProp || defaultArticle);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => setIndex(0), [article.images]);

  const next = () => setIndex(i => (i + 1) % article.images.length);
  const prev = () => setIndex(i => (i - 1 + article.images.length) % article.images.length);

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    setTouchStartX(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox && e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const isPast = article.status === 'past' || new Date(article.date) < new Date();
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour Frip2Rêve — Question sur "${article.title}"`)}`;

  const handleParticipate = (e) => { e?.preventDefault?.(); if (typeof onParticipate === 'function') onParticipate(); else alert('Participer — implémente onParticipate'); };
  const handleReminder = (e) => { e?.preventDefault?.(); if (typeof onReminder === 'function') onReminder(); else alert('Rappel — implémente onReminder'); };

  return (
    <article className="w-full">
      {/* HERO FULL-WIDTH */}
      <header className="relative w-full">
        <div className="w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden" style={{ position: 'relative' }}>
      <div className="relative h-40 sm:h-56 lg:h-64">
      <img
              src={article.images[0]?.src}
              alt={article.images[0]?.alt || article.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-7xl mx-auto w-full px-4 py-6 lg:py-8">
                <div className="max-w-3xl text-white">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                    <span>🏷️ {article.tagLabel}</span>
                    <time dateTime={new Date(article.date).toISOString()} className="ml-2 text-xs opacity-80">📅 {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  </div>

                  <h1 id="article-title" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">{article.title}</h1>
                  <div className="mt-3 text-sm sm:text-base opacity-90">📍 {article.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN GRID : content + sidebar */}
      <main className="max-w-7xl mx-auto px-4 -mt-4 lg:-mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">

          {/* LEFT: MAIN ARTICLE */}
          <div>
            <div className="bg-white rounded-md shadow-sm p-5 mt-5">
              {/* Intro */}
              <p className="text-gray-700 leading-relaxed mb-4">{article.intro}</p>

              {/* Content blocks */}
              <div className="prose prose-base max-w-none text-gray-800">
                {article.content.map((block, idx) => {
                  if (block.type === 'p') return <p key={idx}>{block.text}</p>;
                  if (block.type === 'h2') return <h2 key={idx}>{block.text}</h2>;
                  if (block.type === 'ul') return (
                    <ul key={idx} className="list-disc list-inside">
                      {block.items.map((it, i) => <li key={i}>{it}</li>)}
                    </ul>
                  );
                  return null;
                })}

                {/* Inline CTA in content (desktop visible) */}
                {!isPast && (
                  <div className="mt-6 hidden lg:block">
                    <div className="p-4 bg-[#F9FAFB] border rounded-md">
                      <h3 className="font-semibold">Participe au live</h3>
                      <p className="text-sm text-gray-600">Inscris-toi pour recevoir le lien et un rappel.</p>
                      <div className="mt-3 flex gap-3">
                        <button onClick={handleParticipate} aria-label={`Participer au live ${article.title}`} className="px-4 py-2 bg-[#7B2D2D] text-white rounded-md">Participer au live</button>
                        <button onClick={handleReminder} aria-label={`Recevoir un rappel ${article.title}`} className="px-4 py-2 border rounded-md">Recevoir un rappel</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Gallery (mobile carousel then grid) */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Galerie</h3>

                {/* Mobile carousel */}
                <div
                  ref={galleryRef}
                  className="sm:hidden relative overflow-hidden rounded-md"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  aria-roledescription="carousel"
                  aria-label="Galerie photos"
                >
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                    <img src={article.images[index].src} alt={article.images[index].alt} loading="lazy" className="w-full h-full object-cover" onClick={() => setLightbox(true)} />
                  </div>
                  {article.images.length > 1 && (
                    <>
                      <button aria-label="Image précédente" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full" onClick={prev}>‹</button>
                      <button aria-label="Image suivante" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full" onClick={next}>›</button>
                    </>
                  )}
                </div>

                {/* Desktop grid */}
                <div className="hidden sm:grid sm:grid-cols-3 sm:gap-3">
                  {article.images.map((img, i) => (
                    <button key={i} className="overflow-hidden rounded-md" onClick={() => { setIndex(i); setLightbox(true); }} aria-label={`Ouvrir image ${i + 1}`}>
                      <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-40 object-cover" />
                      {img.caption && <div className="text-xs text-gray-500 mt-1">{img.caption}</div>}
                    </button>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: SIDEBAR (sticky on desktop) */}
          <aside className="lg:relative">
            <div className="lg:sticky top-24">
              <div className="bg-white rounded-md shadow-sm p-5">
                <h4 className="font-semibold">Infos pratiques</h4>
                <dl className="mt-3 text-sm text-gray-700">
                  <div className="flex justify-between py-1"><dt className="font-medium">Quand ?</dt><dd>{article.infos.when}</dd></div>
                  <div className="flex justify-between py-1"><dt className="font-medium">Où ?</dt><dd>{article.infos.where}</dd></div>
                  <div className="flex justify-between py-1"><dt className="font-medium">Quoi ?</dt><dd>{article.infos.what}</dd></div>
                </dl>

                <div className="mt-4">
                  {!isPast ? (
                    <>
                      <button onClick={handleParticipate} aria-label={`Participer au live ${article.title}`} className="w-full px-4 py-3 bg-[#7B2D2D] text-white rounded-md">Participer au live</button>
                      <button onClick={handleReminder} aria-label={`Recevoir un rappel ${article.title}`} className="w-full mt-3 px-4 py-3 border rounded-md">Recevoir un rappel</button>
                      <div className="text-xs text-gray-500 mt-3">Gratuit • Sans engagement • Désinscription facile</div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold">Cet événement est terminé.</div>
                      <a href="/actualites" className="text-indigo-600 underline mt-3 inline-block">Voir les prochains événements</a>
                      <a href={whatsappHref} className="block mt-2 text-sm">Contacter via WhatsApp</a>
                    </>
                  )}
                </div>

                {/* Reassurance */}
                <div className="mt-6 text-xs text-gray-600">
                  <div>✅ Live accessible</div>
                  <div>✅ Pièces limitées</div>
                  <div>✅ Soutien solidaire</div>
                </div>
              </div>

              {/* Optional small module for sharing */}
              <div className="mt-4 hidden lg:block">
                <div className="bg-white rounded-md p-4 text-sm text-gray-700 shadow-sm">
                  <div className="font-medium mb-2">Partager</div>
                  <div className="flex gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window?.location?.href || '/')}`} className="underline">Facebook</a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + (window?.location?.href || '/'))}`} className="underline">WhatsApp</a>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* STICKY MOBILE CTA */}
      {!isPast && (
        <div className="sm:hidden fixed left-0 right-0 bottom-0 bg-white border-t p-3 z-50">
          <div className="max-w-7xl mx-auto px-4 flex gap-3">
            <button onClick={handleParticipate} aria-label={`Participer au live ${article.title}`} className="flex-1 px-4 py-3 bg-[#7B2D2D] text-white rounded-md">Participer</button>
            <button onClick={handleReminder} aria-label={`Recevoir un rappel ${article.title}`} className="px-3 py-3 border rounded-md">Rappel</button>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setLightbox(false)}>
          <div className="max-w-5xl w-full p-4" onClick={e => e.stopPropagation()}>
            <img src={article.images[index].src} alt={article.images[index].alt} className="w-full h-auto object-contain rounded-md" />
            {article.images[index].caption && <div className="mt-2 text-sm text-white text-center">{article.images[index].caption}</div>}
            <button aria-label="Fermer" onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white bg-black/40 rounded-full px-2 py-1">✕</button>
          </div>
        </div>
      )}

    </article>
  );
}

Article.propTypes = {
  article: PropTypes.object,
  onParticipate: PropTypes.func,
  onReminder: PropTypes.func,
  whatsappNumber: PropTypes.string,
};
