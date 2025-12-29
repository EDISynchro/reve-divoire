import React from "react";
import PropTypes from "prop-types";

/**
 * ContactAcces - Section "Contact & Accès"
 *
 * Objectifs : fournir les coordonnées, formulaire de contact, carte et liens
 * réseaux sociaux. Le composant expose des callbacks pour gérer l'envoi côté
 * serveur / CMS / email (onContactSubmit) et pour tracker les interactions.
 *
 * IMPORTANT : Ce composant n'envoie pas d'email seul — implémentez l'envoi
 * côté serveur via la callback onContactSubmit.
 *
 * Usage :
 * <ContactAcces
 *   address="35 avenue Hector Berlioz, Bruyères-sur-Oise"
 *   phone="0600000000"
 *   email="contact@frip2reve.com"
 *   mapsHref="https://www.google.com/maps/place/..."
 *   socials={{ instagram: 'https://instagram.com/..', facebook: 'https://facebook.com/..' }}
 *   onContactSubmit={(payload) => api.sendContact(payload)}
 *   onDonateClick={() => analytics.track('cta_don_click')}
 *   onVolunteerClick={() => analytics.track('cta_volunteer_click')}
 *   onSocialClick={(network) => analytics.track('social_click', {network})}
 * />
 */

export default function ContactAcces({
  title = "Contact & Accès",
  accroche = "N’hésitez pas à nous écrire, nous rendre visite ou nous suivre sur nos réseaux sociaux pour rester connectés.",
  address = "35 avenue Hector Berlioz, Bruyères-sur-Oise",
  phone = "",
  email = "contact@frip2reve.com",
  mapsHref = "#",
  mapEmbedSrc = null, // iframe src (Google Maps embed). Si null, on montre un fallback image.
  mapAlt = "Localisation de Rêve d’Ivoire, Bruyères-sur-Oise",
  socials = { facebook: "", instagram: "", tiktok: "", youtube: "" },
  ctaDonateHref = "/faire-un-don",
  ctaVolunteerHref = "/devenir-benevole",
  ctaDonateLabel = "Faire un don",
  ctaVolunteerLabel = "Devenir bénévole",
  rgpdLink = "/rgpd",
  onContactSubmit = null, // async (payload) => Promise
  onDonateClick = null,
  onVolunteerClick = null,
  onSocialClick = null,
}) {
  const [name, setName] = React.useState("");
  const [emailField, setEmailField] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [newsletter, setNewsletter] = React.useState(false);
  const [consent, setConsent] = React.useState(false); // RGPD for message processing
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const validate = () => {
    if (!name.trim()) return "Merci d'indiquer votre nom complet.";
    if (!emailField.trim() || !emailField.includes("@")) return "Merci d'indiquer un email valide.";
    if (!message.trim()) return "Merci d'indiquer un message.";
    if (!consent) return "Veuillez accepter la politique de confidentialité (RGPD).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const payload = {
      name: name.trim(),
      email: emailField.trim(),
      message: message.trim(),
      newsletter,
      date: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      if (!onContactSubmit) throw new Error("Aucun handler configuré pour l'envoi du formulaire. Implémentez onContactSubmit.");
      await onContactSubmit(payload);
      setSuccess("Merci — votre message a été envoyé. Nous vous répondrons sous 48h ouvrées.");
      // reset
      setName("");
      setEmailField("");
      setMessage("");
      setNewsletter(false);
      setConsent(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("ContactAcces: submit error", err);
      setError(err?.message || "Erreur lors de l'envoi. Réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialClick = (network) => (e) => {
    try {
      if (onSocialClick) onSocialClick(network);
    } catch (err) {
      // ignore
    }
  };

  const handleDonateClick = (e) => {
    try {
      if (onDonateClick) onDonateClick(e);
    } catch (err) {
      // ignore
    }
  };

  const handleVolunteerClick = (e) => {
    try {
      if (onVolunteerClick) onVolunteerClick(e);
    } catch (err) {
      // ignore
    }
  };

  return (
    <section aria-labelledby="contact-acces-heading" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-6">
          <h2 id="contact-acces-heading" className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">{accroche}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Formulaire */}
          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border" aria-describedby="contact-desc">
              <p id="contact-desc" className="sr-only">Formulaire de contact — nom, email, message et option newsletter.</p>

              <label className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1" required />

              <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
              <input type="email" value={emailField} onChange={(e) => setEmailField(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1" required />

              <label className="block text-sm font-medium text-gray-700 mt-4">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1" required />

              <div className="mt-4 flex items-center gap-3">
                <input id="newsletter" type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                <label htmlFor="newsletter" className="text-sm text-gray-700">S’inscrire à la newsletter (optionnel)</label>
              </div>

              <div className="mt-3 flex items-start gap-2">
                <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                <label htmlFor="consent" className="text-sm text-gray-700">J’accepte la <a href={rgpdLink} className="underline">politique de confidentialité</a></label>
              </div>

              {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
              {success ? <div className="mt-3 text-sm text-green-700">{success}</div> : null}

              <div className="mt-6 flex gap-3">
                <button type="submit" disabled={submitting} className="inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2" style={{ backgroundColor: '#7B2D2D' }}>
                  {submitting ? 'Envoi…' : 'Envoyer le message'}
                </button>

                <a href={ctaDonateHref} onClick={handleDonateClick} className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white">{ctaDonateLabel}</a>

                <a href={ctaVolunteerHref} onClick={handleVolunteerClick} className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white">{ctaVolunteerLabel}</a>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <p>Nous traitons vos données conformément à notre <a href={rgpdLink} className="underline">politique de confidentialité</a>. Les informations transmises via ce formulaire sont utilisées uniquement pour répondre à votre demande.</p>
              </div>
            </form>

            {/* Coordonnées */}
            <div className="mt-6 bg-white border rounded-lg p-4">
              <h3 className="text-sm font-semibold">Coordonnées</h3>
              <address className="not-italic mt-2 text-sm text-gray-700">
                <div>{address}</div>
                {phone ? <div>Téléphone : <a href={`tel:${phone}`} className="underline">{phone}</a></div> : <div>Téléphone : à renseigner</div>}
                <div>Email : <a href={`mailto:${email}`} className="underline">{email}</a></div>
              </address>
            </div>
          </div>

          {/* Carte et réseaux */}
          <aside>
            <div className="bg-gray-50 rounded-lg border overflow-hidden">
              {mapEmbedSrc ? (
                <iframe src={mapEmbedSrc} title="Carte — Rêve d’Ivoire" width="100%" height="320" loading="lazy" className="border-0" />
              ) : (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                  <img src="/images/map-fallback.png" alt={mapAlt} className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>

            <div className="mt-4 bg-white border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Suivez-nous</h3>
              <div className="flex items-center gap-3">
                {socials.facebook ? (
                  <a href={socials.facebook} aria-label="Facebook" onClick={handleSocialClick('facebook')} className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.3V12h2.3V9.7c0-2.3 1.4-3.6 3.4-3.6.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42V12h2.5l-.4 2.9h-2.1v7A10 10 0 0022 12z" />
                    </svg>
                  </a>
                ) : null}

                {socials.instagram ? (
                  <a href={socials.instagram} aria-label="Instagram" onClick={handleSocialClick('instagram')} className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4 4 0 1016 12a4 4 0 00-4-3.5zM18.5 6a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </a>
                ) : null}

                {socials.tiktok ? (
                  <a href={socials.tiktok} aria-label="TikTok" onClick={handleSocialClick('tiktok')} className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2v6a4 4 0 004 4h2v2a6 6 0 11-6-6V2h0z" />
                    </svg>
                  </a>
                ) : null}

                {socials.youtube ? (
                  <a href={socials.youtube} aria-label="YouTube" onClick={handleSocialClick('youtube')} className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M10 15l5-3-5-3v6zm11-6.5s-.1-1-.4-1.5c-.4-.9-1.5-1.6-3-1.6C14.1 5 12.1 5 12.1 5H12 12c0 0-2 .1-5.5.4C4.5 5.8 3.4 6.5 3 7.4 2.6 8 2.5 9 2.5 9S2 10.9 2 12v0c0 1.1.1 3 .5 3.6.4.9 1.5 1.6 3 1.6C7.9 17 10 17 10 17h0c0 0 2-.1 5.5-.4 2.5-.3 3.6-1 4-1.9.3-.7.4-1.8.4-1.8v-3.4z" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Small CTA / microcopy */}
            <div className="mt-4 text-sm text-gray-600">
              <p>Vous pouvez aussi soutenir nos actions : <a href={ctaDonateHref} onClick={handleDonateClick} className="underline">faire un don</a> ou <a href={ctaVolunteerHref} onClick={handleVolunteerClick} className="underline">devenir bénévole</a>.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

ContactAcces.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  mapsHref: PropTypes.string,
  mapEmbedSrc: PropTypes.string,
  mapAlt: PropTypes.string,
  socials: PropTypes.object,
  ctaDonateHref: PropTypes.string,
  ctaVolunteerHref: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  ctaVolunteerLabel: PropTypes.string,
  rgpdLink: PropTypes.string,
  onContactSubmit: PropTypes.func,
  onDonateClick: PropTypes.func,
  onVolunteerClick: PropTypes.func,
  onSocialClick: PropTypes.func,
};
