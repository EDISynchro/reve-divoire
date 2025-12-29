import React from "react";
import PropTypes from "prop-types";

/**
 * Don - Section "Soutenez Rêve d’Ivoire"
 *
 * Objectif : convertir l'intérêt en don ou engagement bénévole. Formulaire
 * simplifié côté client. Intégrer votre backend / Stripe dans onSubmit.
 *
 * Usage :
 * <Don
 *   onDonateClick={() => analytics.track('don_cta_click')}
 *   onVolunteerClick={() => analytics.track('volunteer_cta_click')}
 *   onDonateSubmit={(formData) => api.donate(formData)}
 * />
 *
 * IMPORTANT : Ce composant ne réalise pas de paiement. Implémentez l'intégration
 * côté serveur / Stripe dans la callback `onDonateSubmit`.
 */

export default function Don({
  title = "Soutenez Rêve d’Ivoire",
  accroche = "Chaque don ou engagement bénévole aide directement les familles et soutient nos projets en France et en Côte d’Ivoire.",
  image = "/images/don-benevoles.jpg",
  alt = "Bénévoles Rêve d’Ivoire aidant des familles locales et internationales.",
  ctaVolunteerHref = "/devenir-benevole",
  ctaVolunteerLabel = "Devenir bénévole",
  ctaDonateLabel = "Faire un don",
  rgpdLink = "/rgpd",
  showFiscalReceiptCopy = false,
  onDonateClick = null,
  onVolunteerClick = null,
  onDonateSubmit = null, // (formData) => Promise
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState(25);
  const [customAmount, setCustomAmount] = React.useState("");
  const [method, setMethod] = React.useState("card");
  const [rgpd, setRgpd] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const predefined = [10, 25, 50, 100];

  const handleDonateClick = (e) => {
    try {
      if (onDonateClick) onDonateClick(e);
    } catch (err) {
      // don't block
      // eslint-disable-next-line no-console
      console.warn("Don: onDonateClick error", err);
    }
  };

  const handleVolunteerClick = (e) => {
    try {
      if (onVolunteerClick) onVolunteerClick(e);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Don: onVolunteerClick error", err);
    }
  };

  const validate = () => {
    setError("");
    if (!name.trim()) return "Merci d'indiquer votre nom complet.";
    if (!email.trim() || !email.includes("@")) return "Merci d'indiquer un email valide.";
    const amt = customAmount ? Number(customAmount) : Number(amount);
    if (!amt || Number.isNaN(amt) || amt <= 0) return "Merci d'indiquer un montant valide.";
    if (!rgpd) return "Veuillez accepter la politique de confidentialité (RGPD).";
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
      email: email.trim(),
      amount: customAmount ? Number(customAmount) : Number(amount),
      method,
      date: new Date().toISOString(),
    };

    // tracker
    try {
      if (onDonateClick) onDonateClick();
    } catch (err) {
      // ignore
    }

    if (!onDonateSubmit) {
      setError("Aucune action de paiement configurée. Implémentez onDonateSubmit.");
      return;
    }

    try {
      setSubmitting(true);
      await onDonateSubmit(payload);
      setSuccess("Merci — votre don a bien été enregistré. Nous vous avons envoyé un email de confirmation si vous avez fourni une adresse.");
      setName("");
      setEmail("");
      setAmount(25);
      setCustomAmount("");
      setRgpd(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Don: submit error", err);
      setError(err?.message || "Erreur lors du traitement du don. Réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="don-heading" className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="don-heading" className="text-2xl md:text-3xl font-semibold">{title}</h2>
            <p className="mt-4 text-base text-gray-700">{accroche}</p>

            <div className="mt-6">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border" aria-describedby="don-form-desc">
                <p id="don-form-desc" className="sr-only">Formulaire simplifié pour faire un don sécurisé.</p>

                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1" required />

                <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1" required />

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700">Montant du don</div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {predefined.map((p) => (
                      <button key={p} type="button" onClick={()=>{ setAmount(p); setCustomAmount(""); }} className={`px-3 py-1 rounded-md border ${amount === p && !customAmount ? 'bg-[#7B2D2D] text-white' : 'bg-white'}`}>{p}€</button>
                    ))}
                    <input type="number" min="1" placeholder="Montant personnalisé" value={customAmount} onChange={(e)=>{ setCustomAmount(e.target.value); }} className="ml-2 px-2 py-1 rounded-md border w-36" aria-label="Montant personnalisé en euros" />
                  </div>
                </div>

                <fieldset className="mt-4">
                  <legend className="text-sm font-medium text-gray-700">Moyen de paiement</legend>
                  <div className="mt-2 flex items-center gap-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="method" value="card" checked={method === 'card'} onChange={()=>setMethod('card')} className="mr-2" /> Carte
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="method" value="virement" checked={method === 'virement'} onChange={()=>setMethod('virement')} className="mr-2" /> Virement
                    </label>
                  </div>
                </fieldset>

                <div className="mt-4 flex items-start gap-2">
                  <input id="rgpd" type="checkbox" checked={rgpd} onChange={(e)=>setRgpd(e.target.checked)} className="mt-1" />
                  <label htmlFor="rgpd" className="text-sm text-gray-700">J’accepte la <a href={rgpdLink} className="underline">politique de confidentialité</a></label>
                </div>

                {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
                {success ? <div className="mt-3 text-sm text-green-700">{success}</div> : null}

                <div className="mt-6 flex gap-3">
                  <button type="submit" onClick={handleDonateClick} disabled={submitting} className="inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium focus:outline-none focus-visible:ring-2" style={{ backgroundColor: '#7B2D2D' }}>
                    {submitting ? 'Traitement…' : ctaDonateLabel}
                  </button>

                  <a href={ctaVolunteerHref} onClick={handleVolunteerClick} className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border border-[#7B2D2D] text-[#7B2D2D] bg-white">{ctaVolunteerLabel}</a>
                </div>

                <div className="mt-4 text-xs text-gray-600">
                  <p>Les dons collectés financent la collecte et redistribution de vêtements, les envois humanitaires, ainsi que les projets culturels et entrepreneuriaux. Les paiements sont sécurisés via Stripe ou virement bancaire.</p>
                  {showFiscalReceiptCopy ? (
                    <p>Reçu fiscal disponible sur demande.</p>
                  ) : (
                    <p>Reçu fiscal : à confirmer avec le comptable.</p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <figure className="w-full rounded-lg overflow-hidden border bg-gray-50">
            <img src={image} alt={alt} className="w-full h-72 object-cover object-center" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none'; const el = e.currentTarget.parentNode; if (el) el.style.background = 'linear-gradient(180deg,#f7f3ef,#efe7df)';}} />
            <figcaption className="p-3 text-xs text-gray-600">{alt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

Don.propTypes = {
  title: PropTypes.string,
  accroche: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  ctaVolunteerHref: PropTypes.string,
  ctaVolunteerLabel: PropTypes.string,
  ctaDonateLabel: PropTypes.string,
  rgpdLink: PropTypes.string,
  showFiscalReceiptCopy: PropTypes.bool,
  onDonateClick: PropTypes.func,
  onVolunteerClick: PropTypes.func,
  onDonateSubmit: PropTypes.func,
};
