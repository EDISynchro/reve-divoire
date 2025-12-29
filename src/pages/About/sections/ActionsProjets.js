import React from "react";
import PropTypes from "prop-types";

/**
 * ActionsProjets - Section "Nos actions & projets"
 *
 * Objectif : présenter les actions concrètes depuis 2016, montrer l'impact,
 * rassurer et orienter vers les CTA (don, bénévolat, boutique / projets).
 *
 * Principes :
 *  - Sémantique accessible (h2, article, figure, dl)
 *  - Grille responsive pour projets, bandeau de chiffres, témoignage bref
 *  - CTAs visibles et keyboard-focusables
 *  - Props pour personnaliser les projets, stats et témoignages
 *
 * Usage :
 * <ActionsProjets
 *   projects={[{title, description, image, alt, href}]}
 *   statsText="Depuis 2016 • 5 tonnes..."
 *   testimonials={[{quote, author, image, alt}]}
 *   onDonate={() => analytics.track('action_cta_don_click')}
 *   onVolunteer={() => analytics.track('action_cta_volunteer_click')}
 *   onProjects={() => analytics.track('action_cta_projects_click')}
 * />
 */

const noop = () => {};

export default function ActionsProjets({
  title = "Nos actions & projets",
  accroche = "Depuis 2016, Rêve d’Ivoire transforme les dons et le bénévolat en actions concrètes qui changent des vies.",
  projects = null,
  statsText = "Depuis 2016 • 5 tonnes de vêtements collectés • 200 familles aidées • 50 bénévoles mobilisés chaque année",
  testimonials = null,
  ctaDonateHref = "/faire-un-don",
  ctaVolunteerHref = "/devenir-benevole",
  ctaProjectsHref = "/projets",
  ctaDonateLabel = "Faire un don",
  ctaVolunteerLabel = "Devenir bénévole",
  ctaProjectsLabel = "Voir tous nos projets",
  imageAltDefault = "Volontaires Rêve d’Ivoire préparant des vêtements pour distribution locale et internationale.",
  rgpdLink = "/rgpd",
  showFiscalReceiptCopy = false,
  onDonate = noop,
  onVolunteer = noop,
  onProjects = noop,
}) {
  const defaultProjects = [
    {
      id: "collectes-locales",
      title: "Collectes locales de vêtements",
      description:
        "Organisation de points de collecte dans la région de Beauvais, tri et remise en état pour distribution.",
      image: "/images/projects/collectes.jpg",
      alt: "Bénévoles triant des vêtements avant distribution.",
      href: "/projets/collectes-locales",
    },
    {
      id: "boutique-solidaire",
      title: "Boutique solidaire Frip2Rêve",
      description:
        "Vente de vêtements et objets remis en état ; les recettes financent nos actions humanitaires.",
      image: "/images/projects/boutique.jpg",
      alt: "Intérieur de la boutique Frip2Rêve avec vêtements exposés.",
      href: "/boutique",
    },
    {
      id: "envois-humanitaires",
      title: "Envois humanitaires en Côte d’Ivoire",
      description:
        "Kits scolaires et vêtements envoyés chaque année pour soutenir familles et écoles locales.",
      image: "/images/projects/envois.jpg",
      alt: "Préparation de colis humanitaires pour l'envoi en Côte d’Ivoire.",
      href: "/projets/envois-humanitaires",
    },
    {
      id: "soutien-entrepreneurs",
      title: "Soutien aux entrepreneurs",
      description:
        "Accompagnement de projets culturels et artisanaux pour développer l’économie locale.",
      image: "/images/projects/entrepreneurs.jpg",
      alt: "Artisan présentant ses créations soutenu par Rêve d’Ivoire.",
      href: "/projets/soutien-entrepreneurs",
    },
  ];

  const items = Array.isArray(projects) && projects.length ? projects : defaultProjects;

  // Parse stats into small badges if possible
  const statBadges = React.useMemo(() => {
    if (!statsText) return [];
    return statsText.split("•").map((s) => s.trim());
  }, [statsText]);

  const testimonialItem = testimonials && testimonials.length ? testimonials[0] : {
    quote: "Grâce à Rêve d’Ivoire, ma famille a reçu tout le nécessaire pour la rentrée scolaire.",
    author: "— Fatou, bénéficiaire en Côte d’Ivoire",
    image: "/images/testimonials/fatou.jpg",
    alt: "Portrait de Fatou, bénéficiaire en Côte d’Ivoire.",
  };

  const handleCTA = (handler, analyticsName) => (e) => {
    try {
      handler(e);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("ActionsProjets: CTA handler error", err);
    }
  };

  return (
    <section aria-labelledby="actions-projets-heading" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-6">
          <h2 id="actions-projets-heading" className="text-2xl md:text-3xl font-semibold">
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">{accroche}</p>
        </header>

        {/* Projets grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {items.map((p) => (
              <article key={p.id || p.title} className="flex flex-col bg-gray-50 rounded-lg overflow-hidden border" aria-labelledby={`proj-${p.id}`}>
                <figure className="h-40 sm:h-44 md:h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.alt || imageAltDefault}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const el = e.currentTarget.parentNode;
                      if (el) el.style.background = "linear-gradient(180deg,#f7f3ef,#efe7df)";
                    }}
                  />
                </figure>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 id={`proj-${p.id}`} className="text-sm font-semibold text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-700 flex-1">{p.description}</p>
                  <div className="mt-4">
                    <a
                      href={p.href || ctaProjectsHref}
                      className="inline-flex items-center text-sm font-medium underline text-[#7B2D2D]"
                      aria-label={`En savoir plus sur ${p.title}`}
                      onClick={handleCTA(onProjects)}
                    >
                      En savoir plus
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right column: chiffres clés + témoignage + CTAs */}
          <aside className="space-y-6">
            {/* Chiffres clés bandeau */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <div className="bg-[#7B2D2D] text-white px-4 py-3 flex flex-wrap gap-2 items-center" role="status" aria-live="polite">
                {statBadges.map((s, i) => (
                  <span key={i} className="text-xs md:text-sm font-medium" title={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Témoignage */}
            <blockquote className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-800">
              <div className="flex items-start gap-3">
                <img src={testimonialItem.image} alt={testimonialItem.alt} className="w-12 h-12 rounded-full object-cover" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}} />
                <div>
                  <p className="italic">“{testimonialItem.quote}”</p>
                  <cite className="mt-2 block text-xs text-gray-600">{testimonialItem.author}</cite>
                </div>
              </div>
            </blockquote>

            {/* CTAs */}
            <div className="rounded-lg bg-white border p-4">
              <div className="flex flex-col gap-3">
                <a
                  href={ctaDonateHref}
                  onClick={handleCTA(onDonate)}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: "#7B2D2D" }}
                  aria-label={ctaDonateLabel}
                >
                  {ctaDonateLabel}
                </a>

                <a
                  href={ctaVolunteerHref}
                  onClick={handleCTA(onVolunteer)}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white"
                  aria-label={ctaVolunteerLabel}
                >
                  {ctaVolunteerLabel}
                </a>

                <a
                  href={ctaProjectsHref}
                  onClick={handleCTA(onProjects)}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 underline bg-transparent"
                  aria-label={ctaProjectsLabel}
                >
                  {ctaProjectsLabel}
                </a>

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
      </div>
    </section>
  );
}

ActionsProjets.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
      alt: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  statsText: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({ quote: PropTypes.string, author: PropTypes.string, image: PropTypes.string, alt: PropTypes.string })
  ),
  ctaDonateHref: PropTypes.string,
  ctaVolunteerHref: PropTypes.string,
  ctaProjectsHref: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  ctaVolunteerLabel: PropTypes.string,
  ctaProjectsLabel: PropTypes.string,
  imageAltDefault: PropTypes.string,
  rgpdLink: PropTypes.string,
  showFiscalReceiptCopy: PropTypes.bool,
  onDonate: PropTypes.func,
  onVolunteer: PropTypes.func,
  onProjects: PropTypes.func,
};
