import React from "react";
import PropTypes from "prop-types";

/**
 * Frip2Reve - Section "Frip2Rêve — Boutique solidaire"
 *
 * Objectif : mettre en avant la boutique solidaire (produits, horaires, lieu),
 * relier ventes → financement des projets et orienter vers CTAs (shop / don / bénévole / Instagram).
 *
 * Principes :
 *  - Sémantique accessible (h2, figure, list, address)
 *  - Grid responsive / carrousel léger (si tu veux un vrai carrousel, intégrer un composant dédié)
 *  - Badges d'impact, micro-copy légale (RGPD, reçu fiscal conditionnel)
 *  - Handlers pour tracker évènements : shop_cta_click, instagram_cta_click, don_cta_click
 *
 * Usage :
 * <Frip2Reve
 *   products={[{id, title, price, image, alt, href}]}
 *   hours="Du mardi au samedi, 10h–18h"
 *   address="35 avenue Hector Berlioz, Bruyères-sur-Oise"
 *   mapsHref="https://maps.google.com/..."
 *   statsText="Chaque vente permet de financer X familles"
 *   onShop={() => analytics.track('shop_cta_click')}
 *   onInstagram={() => analytics.track('instagram_cta_click')}
 *   onDonate={() => analytics.track('don_cta_click')}
 * />
 */

const noop = () => {};

export default function Frip2Reve({
  title = "Frip2Rêve — Boutique solidaire",
  accroche = "Achetez solidaire et soutenez les actions de Rêve d’Ivoire en France et en Côte d’Ivoire.",
  description = "Frip2Rêve est notre boutique solidaire où chaque vêtement ou objet remis en état finance directement nos projets humanitaires et culturels. Les ventes soutiennent les familles, financent les envois humanitaires et développent des initiatives locales.",
  hours = "Ouvert du mardi au samedi, 10h–18h",
  address = "35 avenue Hector Berlioz, Bruyères-sur-Oise",
  mapsHref = "#",
  products = null,
  productsTitle = "Produits à la une",
  statsText = "Chaque vente permet de financer des projets locaux",
  ctaShopHref = "/boutique",
  ctaInstagramHref = "https://instagram.com/frip2reve",
  ctaDonateHref = "/faire-un-don",
  ctaVolunteerHref = "/devenir-benevole",
  ctaShopLabel = "Voir la boutique",
  ctaInstagramLabel = "Instagram Frip2Rêve",
  ctaDonateLabel = "Faire un don",
  ctaVolunteerLabel = "Devenir bénévole",
  imageAltDefault = "Intérieur Frip2Rêve, boutique solidaire de Rêve d’Ivoire.",
  rgpdLink = "/rgpd",
  showFiscalReceiptCopy = false,
  onShop = noop,
  onInstagram = noop,
  onDonate = noop,
  onVolunteer = noop,
}) {
  const defaultProducts = [
    {
      id: "veste-ethique",
      title: "Veste en denim recyclée",
      price: "25€",
      image: "/images/frip2reve/veste-denim.jpg",
      alt: "Veste en denim recyclée exposée dans la boutique Frip2Rêve.",
      href: "/boutique/veste-denim",
    },
    {
      id: "robe-femme",
      title: "Robe vintage",
      price: "18€",
      image: "/images/frip2reve/robe-vintage.jpg",
      alt: "Robe vintage sur mannequin, Frip2Rêve.",
      href: "/boutique/robe-vintage",
    },
    {
      id: "sac-artisanal",
      title: "Sac artisanal",
      price: "12€",
      image: "/images/frip2reve/sac-artisanal.jpg",
      alt: "Sac artisanal fabriqué par un créateur soutenu.",
      href: "/boutique/sac-artisanal",
    },
  ];

  const items = Array.isArray(products) && products.length ? products : defaultProducts;

  const handleClick = (handler, analyticsName) => (e) => {
    try {
      if (handler) handler(e);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Frip2Reve: handler ${analyticsName} error`, err);
    }
  };

  return (
    <section aria-labelledby="frip2reve-heading" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="md:flex md:items-start md:justify-between md:gap-6">
          <div>
            <h2 id="frip2reve-heading" className="text-2xl md:text-3xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm md:text-base text-gray-700">{accroche}</p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <a
              href={ctaShopHref}
              onClick={handleClick(onShop, 'shop_cta_click')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: '#7B2D2D' }}
              aria-label={ctaShopLabel}
            >
              {ctaShopLabel}
            </a>

            <a
              href={ctaInstagramHref}
              onClick={handleClick(onInstagram, 'instagram_cta_click')}
              className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white"
              aria-label={ctaInstagramLabel}
            >
              {ctaInstagramLabel}
            </a>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
          {/* Left: description + horaires + lieu + badge impact */}
          <div className="lg:col-span-1">
            <p className="text-gray-700">{description}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div>
                  <div className="text-sm font-semibold">Horaires</div>
                  <div className="text-sm text-gray-700">{hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div>
                  <div className="text-sm font-semibold">Lieu</div>
                  <address className="not-italic text-sm text-gray-700">
                    <a href={mapsHref} className="underline" aria-label={`Voir ${address} sur Google Maps`}>
                      {address}
                    </a>
                  </address>
                </div>
              </div>

              <div className="mt-4 inline-block bg-[#7B2D2D] text-white px-3 py-2 rounded-md text-sm font-medium">
                {statsText}
              </div>
            </div>

            {/* Legal micro-copy */}
            <div className="mt-6 text-sm text-gray-600">
              <a href={rgpdLink} className="underline">Politique RGPD</a>
              <span className="mx-2">·</span>
              {showFiscalReceiptCopy ? (
                <span>Reçu fiscal disponible sur demande.</span>
              ) : (
                <span>Reçu fiscal : à confirmer avec le comptable.</span>
              )}
            </div>

            {/* Secondary CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={ctaDonateHref}
                onClick={handleClick(onDonate, 'don_cta_click')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: '#7B2D2D' }}
                aria-label={ctaDonateLabel}
              >
                {ctaDonateLabel}
              </a>

              <a
                href={ctaVolunteerHref}
                onClick={handleClick(onVolunteer, 'volunteer_cta_click')}
                className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white"
                aria-label={ctaVolunteerLabel}
              >
                {ctaVolunteerLabel}
              </a>
            </div>
          </div>

          {/* Right: produits mise en avant (mini-grid) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-4">{productsTitle}</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
              {items.map((prod) => (
                <li key={prod.id} className="bg-gray-50 rounded-lg border overflow-hidden flex flex-col">
                  <figure className="h-40 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.alt || imageAltDefault}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; const el = e.currentTarget.parentNode; if (el) el.style.background = 'linear-gradient(180deg,#f7f3ef,#efe7df)'; }}
                    />
                  </figure>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{prod.title}</h4>
                      {prod.price ? <span className="text-sm text-gray-700">{prod.price}</span> : null}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <a href={prod.href || ctaShopHref} className="text-sm underline text-[#7B2D2D]" aria-label={`Voir ${prod.title}`} onClick={handleClick(onShop, 'shop_cta_click')}>
                        Voir
                      </a>
                      <a href={ctaShopHref} className="inline-flex items-center px-2 py-1 rounded text-sm bg-white border border-gray-200" aria-label={`Acheter ${prod.title}`} onClick={handleClick(onShop, 'shop_cta_click')}>
                        Acheter
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

Frip2Reve.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  description: PropTypes.string,
  hours: PropTypes.string,
  address: PropTypes.string,
  mapsHref: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, title: PropTypes.string, price: PropTypes.string, image: PropTypes.string, alt: PropTypes.string, href: PropTypes.string })
  ),
  productsTitle: PropTypes.string,
  statsText: PropTypes.string,
  ctaShopHref: PropTypes.string,
  ctaInstagramHref: PropTypes.string,
  ctaDonateHref: PropTypes.string,
  ctaVolunteerHref: PropTypes.string,
  ctaShopLabel: PropTypes.string,
  ctaInstagramLabel: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  ctaVolunteerLabel: PropTypes.string,
  imageAltDefault: PropTypes.string,
  rgpdLink: PropTypes.string,
  showFiscalReceiptCopy: PropTypes.bool,
  onShop: PropTypes.func,
  onInstagram: PropTypes.func,
  onDonate: PropTypes.func,
  onVolunteer: PropTypes.func,
};
