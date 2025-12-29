import React from "react";
import PropTypes from "prop-types";

/**
 * Actualites - Section "Actualités & Événements"
 *
 * Objectif : mettre en avant événements passés et à venir, galerie photo, et CTAs
 * pour engager (participer, donner, s'inscrire).
 *
 * Principes :
 *  - Titre H2 + accroche
 *  - Liste / mini-calendrier des événements à venir
 *  - Galerie lightbox pour photos d'événements passés
 *  - CTA visibles et handlers pour tracking
 *  - Accessibilité : alt text, focus, aria labels
 *
 * Usage :
 * <Actualites
 *   events={[{id,title,date,location,description,image,alt,href}]}
 *   gallery={[{id,image,alt}]}
 *   statsText="X événements • Y participants"
 *   onDonate={() => analytics.track('event_cta_don_click')}
 *   onParticipate={() => analytics.track('event_cta_participate_click')}
 * />
 */

const noop = () => {};

export default function Actualites({
  title = "Actualités & Événements",
  accroche = "Restez informé des actions, collectes et événements organisés par Rêve d’Ivoire en France et en Côte d’Ivoire.",
  events = null,
  gallery = null,
  statsText = "",
  ctaAllHref = "/actualites",
  ctaParticipateHref = "/evenements/inscription",
  ctaDonateHref = "/faire-un-don",
  ctaAllLabel = "Voir toutes les actualités",
  ctaParticipateLabel = "Participer à un événement",
  ctaDonateLabel = "Faire un don",
  rgpdLink = "/rgpd",
  showFiscalReceiptCopy = false,
  onDonate = noop,
  onParticipate = noop,
  onAll = noop,
}) {
  // Defaults (si l'appelant ne fournit rien)
  const defaultEvents = [
    {
      id: "collecte-rentree-2025",
      title: "Collecte spéciale rentrée scolaire",
      date: "2025-09-15",
      dateLabel: "15 septembre 2025",
      location: "35 avenue Hector Berlioz, Bruyères-sur-Oise",
      description: "Points de collecte, tri et remise en état pour les familles en besoin.",
      image: "/images/events/collecte-rentree-2025.jpg",
      alt: "Bénévoles triant des fournitures lors d'une collecte de rentrée.",
      href: "/actualites/collecte-rentree-2025",
    },
    {
      id: "vente-frip2reve-oct-2025",
      title: "Vente Frip2Rêve en ligne",
      date: "2025-10-10",
      dateLabel: "10–12 octobre 2025",
      location: "Instagram / Boutique en ligne",
      description: "Sélection d'articles solidaires vendus via Instagram et notre boutique en ligne.",
      image: "/images/events/vente-oct-2025.jpg",
      alt: "Sélection d'articles Frip2Rêve prêts pour la vente en ligne.",
      href: "/actualites/vente-frip2reve-oct-2025",
    },
    {
      id: "atelier-artistique-nov-2025",
      title: "Atelier artistique pour enfants",
      date: "2025-11-20",
      dateLabel: "20 novembre 2025",
      location: "Maison de quartier",
      description: "Atelier créatif pour enfants — inscriptions ouvertes.",
      image: "/images/events/atelier-nov-2025.jpg",
      alt: "Enfants participant à un atelier artistique soutenu par Rêve d’Ivoire.",
      href: "/actualites/atelier-artistique-nov-2025",
    },
  ];

  const defaultGallery = [
    {
      id: "tri-distribution",
      image: "/images/gallery/tri-distribution.jpg",
      alt: "Bénévoles triant des vêtements lors d’une collecte à Bruyères-sur-Oise",
    },
    {
      id: "boutique-frip2reve",
      image: "/images/gallery/boutique-frip2reve.jpg",
      alt: "Intérieur de la boutique Frip2Rêve avec clients et bénévoles",
    },
    {
      id: "atelier-culturel",
      image: "/images/gallery/atelier-culturel.jpg",
      alt: "Atelier artistique pour enfants soutenu par Rêve d’Ivoire",
    },
  ];

  const items = Array.isArray(events) && events.length ? events : defaultEvents;
  const images = Array.isArray(gallery) && gallery.length ? gallery : defaultGallery;

  // Lightbox state simple
  const [lightboxIndex, setLightboxIndex] = React.useState(null);
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  // Partition upcoming vs past (simple date compare)
  const now = new Date();
  const withParsedDate = items.map((ev) => ({
    ...ev,
    _dateObj: ev.date ? new Date(ev.date) : null,
  }));

  const upcoming = withParsedDate.filter((e) => e._dateObj && e._dateObj >= now);
  const past = withParsedDate.filter((e) => !e._dateObj || e._dateObj < now);

  const handleCTA = (handler, name) => (e) => {
    try {
      handler(e);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Actualites: CTA ${name} handler error`, err);
    }
  };

  return (
    <section aria-labelledby="actualites-heading" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-6">
          <h2 id="actualites-heading" className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">{accroche}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: calendrier / événements */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Upcoming events */}
              {upcoming && upcoming.length ? (
                <div>
                  <h3 className="text-lg font-semibold">Événements à venir</h3>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {upcoming.map((ev) => (
                      <li key={ev.id} className="p-4 bg-gray-50 rounded-lg border flex gap-4 items-start">
                        <time className="text-xs font-semibold text-[#7B2D2D] w-28 flex-shrink-0">{ev.dateLabel || (ev._dateObj ? ev._dateObj.toLocaleDateString() : ev.date)}</time>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{ev.title}</h4>
                          <p className="mt-1 text-sm text-gray-700">{ev.description}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <a href={ev.href} className="text-sm underline text-[#7B2D2D]" onClick={handleCTA(onAll, 'event_cta_news_click')}>Détails</a>
                            <a href={ctaParticipateHref} className="inline-flex items-center px-3 py-1 rounded-md text-sm border border-[#7B2D2D] text-[#7B2D2D] bg-white" onClick={handleCTA(onParticipate, 'event_cta_participate_click')}>S'inscrire</a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">Aucun événement à venir pour le moment</h3>
                  <p className="mt-2 text-sm text-gray-700">Suivez-nous sur Instagram ou inscrivez-vous à la newsletter pour être informé.</p>
                </div>
              )}

              {/* Past events / gallery teaser */}
              {past && past.length ? (
                <div>
                  <h3 className="text-lg font-semibold">Événements récents</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                    {past.slice(0, 6).map((ev) => (
                      <li key={ev.id} className="bg-gray-50 rounded overflow-hidden border">
                        <figure className="h-28 w-full bg-gray-100 overflow-hidden">
                          <img src={ev.image} alt={ev.alt || ev.title} className="w-full h-full object-cover object-center" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}} />
                        </figure>
                        <div className="p-2 text-xs text-gray-700">
                          <div className="font-medium">{ev.title}</div>
                          <div className="text-xs text-gray-600">{ev.dateLabel || (ev._dateObj ? ev._dateObj.toLocaleDateString() : ev.date)} • {ev.location}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: galerie + CTAs + stats */}
          <aside className="space-y-6">
            {/* Stats banner */}
            {statsText ? (
              <div className="rounded-lg overflow-hidden shadow-sm">
                <div className="bg-[#7B2D2D] text-white px-4 py-3 text-sm font-medium">{statsText}</div>
              </div>
            ) : null}

            {/* Gallery thumbnails */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Galerie</h3>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <button key={img.id} onClick={() => openLightbox(idx)} className="h-20 w-full overflow-hidden rounded bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label={`Ouvrir image ${img.alt}`}>
                    <img src={img.image} alt={img.alt} className="w-full h-full object-cover object-center" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}} />
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="rounded-lg bg-white border p-4">
              <div className="flex flex-col gap-3">
                <a href={ctaAllHref} onClick={handleCTA(onAll, 'event_cta_news_click')} className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white" style={{ backgroundColor: '#7B2D2D' }} aria-label={ctaAllLabel}>{ctaAllLabel}</a>

                <a href={ctaParticipateHref} onClick={handleCTA(onParticipate, 'event_cta_participate_click')} className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white" aria-label={ctaParticipateLabel}>{ctaParticipateLabel}</a>

                <a href={ctaDonateHref} onClick={handleCTA(onDonate, 'event_cta_don_click')} className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 underline bg-transparent" aria-label={ctaDonateLabel}>{ctaDonateLabel}</a>

                <div className="mt-2 text-xs text-gray-600">
                  <a href={rgpdLink} className="underline">Politique RGPD</a>
                  <span className="mx-2">·</span>
                  {showFiscalReceiptCopy ? (
                    <span>Reçu fiscal disponible sur demande.</span>
                  ) : (
                    <span>Reçu fiscal : à confirmer avec le comptable.</span>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Lightbox modal */}
        {lightboxIndex !== null ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" role="dialog" aria-modal="true">
            <div className="max-w-3xl w-full p-4">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative">
                  <button onClick={closeLightbox} className="absolute right-2 top-2 p-2 rounded bg-white text-gray-700 focus:outline-none focus-visible:ring-2">Fermer</button>
                  <img src={images[lightboxIndex].image} alt={images[lightboxIndex].alt} className="w-full h-auto object-contain" />
                </div>
                <div className="p-3 text-sm text-gray-700">{images[lightboxIndex].alt}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

Actualites.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, title: PropTypes.string, date: PropTypes.string, dateLabel: PropTypes.string, location: PropTypes.string, description: PropTypes.string, image: PropTypes.string, alt: PropTypes.string, href: PropTypes.string })
  ),
  gallery: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, image: PropTypes.string, alt: PropTypes.string })),
  statsText: PropTypes.string,
  ctaAllHref: PropTypes.string,
  ctaParticipateHref: PropTypes.string,
  ctaDonateHref: PropTypes.string,
  ctaAllLabel: PropTypes.string,
  ctaParticipateLabel: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  rgpdLink: PropTypes.string,
  showFiscalReceiptCopy: PropTypes.bool,
  onDonate: PropTypes.func,
  onParticipate: PropTypes.func,
  onAll: PropTypes.func,
};
