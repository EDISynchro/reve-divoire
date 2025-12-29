import React from "react";
import PropTypes from "prop-types";

/**
 * APropos - Section "À propos" (contenu informatif, non-HERO)
 *
 * Principes :
 *  - Section sémantique et accessible (heading, <dl> pour chiffres, figure pour image)
 *  - Tonnalité informative / rassurante (mission, actions, preuve sociale)
 *  - CTAs modestes mais visibles (don / bénévolat / projets)
 *
 * Usage : même props que l'ancien composant. N'hésitez pas à passer `stats` (array)
 * pour afficher plusieurs métriques individuelles.
 */

export default function APropos({
  title = "Qui sommes‑nous ?",
  accroche = "Rêve d’Ivoire agit depuis 2016 pour lutter contre la pauvreté en France et en Côte d’Ivoire grâce à des collectes, une boutique solidaire et le soutien à des projets locaux.",
  texte = "Nous mettons en relation des dons, des compétences et des ressources pour accompagner des familles et des micro-projets. Transparence, ancrage local et accompagnement durable sont au cœur de notre action.",
  image = "/images/apropos-fallback.jpg",
  alt = "Bénévoles Rêve d’Ivoire en action triant des vêtements pour distribution locale et internationale.",
  proofText = "Depuis 2016 • 5 tonnes collectées • 200 familles aidées",
  stats = null, // tableau optionnel [{label: 'Tonnes collectées', value: '5 t'}, ...]
  siren = "",
  rgpdLink = "/rgpd",
  ctaDonateHref = "/faire-un-don",
  ctaVolunteerHref = "/devenir-benevole",
  ctaProjectsHref = "/projets",
  ctaDonateLabel = "Faire un don",
  ctaVolunteerLabel = "Devenir bénévole",
  ctaProjectsLabel = "Voir nos projets",
  showFiscalReceiptCopy = false,
  onDonate = null,
  onVolunteer = null,
  onProjects = null,
}) {
  const handleClick = (handler) => (e) => {
    try {
      if (handler) handler(e);
    } catch (err) {
      // don't break UX on analytics error
      // eslint-disable-next-line no-console
      console.warn("APropos: handler error", err);
    }
  };

  // Si l'appelant n'a pas fourni de stats détaillées, on essaye de parser proofText
  const parsedStats = React.useMemo(() => {
    if (Array.isArray(stats) && stats.length) return stats;
    if (typeof proofText === "string") {
      return proofText.split("•").map((s) => {
        const trimmed = s.trim();
        // heuristique simple : trouve la première suite de chiffres
        const match = trimmed.match(/^(.+?)\s*:\s*(.+)$/) || [null, trimmed, ""]; // fallback
        return {
          label: match[1] ? match[1].trim() : trimmed,
          value: match[2] ? match[2].trim() : "",
        };
      });
    }
    return [];
  }, [stats, proofText]);

  return (
    <section
      aria-labelledby="apropos-heading"
      className="bg-white text-gray-900"
      role="region"
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">

          {/* Texte principal */}
          <div className="lg:col-span-2">
            <h2 id="apropos-heading" className="text-2xl md:text-3xl font-semibold">
              {title}
            </h2>

            <p className="mt-4 text-base text-gray-700 leading-relaxed">
              <strong className="block text-gray-900">{accroche}</strong>
              <span className="mt-2 block">{texte}</span>
            </p>

            {/* Mission + Valeurs */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-sm font-semibold">Notre mission</h3>
                <p className="mt-2 text-sm text-gray-700">Accompagner durablement des familles et des initiatives locales grâce au don, à la formation et à la mise en réseau.</p>
              </article>

              <article className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-sm font-semibold">Nos valeurs</h3>
                <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Transparence financière</li>
                  <li>Ancrage local</li>
                  <li>Impact durable</li>
                </ul>
              </article>
            </div>

            {/* CTA row (discrète) */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={ctaDonateHref}
                onClick={handleClick(onDonate)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: "#7B2D2D" }}
                aria-label={ctaDonateLabel}
              >
                {ctaDonateLabel}
              </a>

              <a
                href={ctaVolunteerHref}
                onClick={handleClick(onVolunteer)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white"
                aria-label={ctaVolunteerLabel}
              >
                {ctaVolunteerLabel}
              </a>

              <a
                href={ctaProjectsHref}
                onClick={handleClick(onProjects)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 underline bg-transparent"
                aria-label={ctaProjectsLabel}
              >
                {ctaProjectsLabel}
              </a>
            </div>

            {/* Micro-copy légal & preuve sociale */}
            <div className="mt-6 text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-3">
                {parsedStats && parsedStats.length ? (
                  <dl className="flex flex-wrap gap-2 items-center" aria-hidden>
                    {parsedStats.map((s, i) => (
                      <div key={i} className="inline-flex items-baseline gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                        <dt className="font-medium text-gray-800">{s.value || s.label}</dt>
                        {s.value ? <dd className="text-gray-600 ml-1">{s.label}</dd> : null}
                      </div>
                    ))}
                  </dl>
                ) : (
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-800">{proofText}</span>
                )}

                {siren ? (
                  <span className="text-sm">· SIREN {siren}</span>
                ) : null}
              </div>

              <div className="mt-3">
                <a href={rgpdLink} className="underline mr-2">Politique RGPD</a>
                <span className="mr-2">·</span>
                <span>Paiement sécurisé (Stripe / HTTPS)</span>
                {showFiscalReceiptCopy ? (
                  <span className="block mt-1">Reçu fiscal disponible sur demande.</span>
                ) : (
                  <span className="block mt-1 text-amber-700">Reçu fiscal : à confirmer avec le comptable.</span>
                )}
              </div>
            </div>
          </div>

          {/* Image (figure) */}
          <figure className="w-full rounded-lg overflow-hidden border bg-gray-50">
            <img
              src={image}
              alt={alt}
              className="w-full h-56 object-cover object-center"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const el = e.currentTarget.parentNode;
                if (el) el.style.background = "linear-gradient(180deg,#f7f3ef,#efe7df)";
              }}
            />
            <figcaption className="p-3 text-xs text-gray-600">{alt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

APropos.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  texte: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  proofText: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  siren: PropTypes.string,
  rgpdLink: PropTypes.string,
  ctaDonateHref: PropTypes.string,
  ctaVolunteerHref: PropTypes.string,
  ctaProjectsHref: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  ctaVolunteerLabel: PropTypes.string,
  ctaProjectsLabel: PropTypes.string,
  showFiscalReceiptCopy: PropTypes.bool,
  onDonate: PropTypes.func,
  onVolunteer: PropTypes.func,
  onProjects: PropTypes.func,
};
