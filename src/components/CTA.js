import React, { useState, useEffect } from "react";

/**
 * CTA — Agis maintenant (avec animations légères)
 * Ajouts :
 * - transitions et micro-transforms sur boutons & cartes
 * - modal animation fade + scale (avec mount/unmount animé)
 * - motion-reduce respecté via classes Tailwind (motion-reduce:*)
 *
 * Props
 * - onDonate(payload)
 * - onVolunteer()
 * - onVisitShop()
 * - onContact()
 * - logos: [{src, alt}]
 * - defaultAmounts: [10,25,50,100]
 */

export default function CTAAgisMaintenant({
  onDonate = () => {},
  onVolunteer = () => {},
  onVisitShop = () => {},
  onContact = () => {},
  logos = [],
  defaultAmounts = [10, 25, 50, 100],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false); // contrôle l'animation d'apparition
  const [selectedAmount, setSelectedAmount] = useState(defaultAmounts[1] || 25);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Ouvre la modale et lance l'animation
  function openModal(amount) {
    setSelectedAmount((amount ?? defaultAmounts[1]) || 25);
    setCustomAmount("");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
    // petit délai pour permettre au DOM de monter, puis déclencher la classe active
    window.requestAnimationFrame(() => {
      // protect against SSR or test env lacking window
      setTimeout(() => setModalActive(true), 20);
    });
    safeTrack("don_modal_open", { source: "cta_section" });
  }

  // Ferme la modale avec animation
  function closeModal() {
    setModalActive(false);
    // la durée doit correspondre à la classe duration (ex: duration-300 -> 300ms)
    setTimeout(() => setIsModalOpen(false), 320);
  }

  // Calcul montant
  function amountValue() {
    const val = customAmount ? Number(customAmount) : Number(selectedAmount);
    return Number.isFinite(val) && val > 0 ? Math.round(val) : null;
  }

  function validateForm() {
    const amt = amountValue();
    if (!amt) return "Veuillez sélectionner ou saisir un montant valide.";
    if (!firstName.trim()) return "Le prénom est requis.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Adresse e-mail invalide.";
    return null;
  }

  async function handleDonate(e) {
    e && e.preventDefault();
    setErrorMsg("");
    const err = validateForm();
    if (err) {
      setErrorMsg(err);
      safeTrack("don_form_error", { reason: err });
      return;
    }

    const payload = {
      id: `don_${Date.now()}`,
      amount: amountValue(),
      monthly: !!isMonthly,
      firstName: firstName.trim(),
      email: email.trim(),
      source: "cta_agis_maintenant",
    };

    setIsSubmitting(true);
    safeTrack("don_submitted", { amount: payload.amount, monthly: payload.monthly });

    try {
      const res = onDonate(payload);
      if (res && typeof res.then === "function") await res;

      setSuccessMsg("Merci ! Un e-mail de confirmation vous sera envoyé si éligible au reçu fiscal.");
      safeTrack("don_success", { amount: payload.amount, monthly: payload.monthly });
      setFirstName("");
      setEmail("");
      setCustomAmount("");
      setTimeout(() => {
        setIsSubmitting(false);
        closeModal();
      }, 900);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors du paiement. Veuillez réessayer ou nous contacter.");
      safeTrack("don_failure", { message: String(err) });
      setIsSubmitting(false);
    }
  }

  function safeTrack(event, data = {}) {
    if (typeof window !== "undefined" && window?.dataLayer) {
      window.dataLayer.push({ event, ...data });
    }
    console.log("track:", event, data);
  }

  // ensure modalActive resets when modal is forcibly unmounted from outside
  useEffect(() => {
    if (!isModalOpen) setModalActive(false);
  }, [isModalOpen]);

  return (
    <section className="w-full bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Gauche — pourquoi agir */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 transition-opacity duration-300">{`Soutenez Rêve d’Ivoire — agissez maintenant`}</h2>
            <p className="mt-0 text-base text-slate-700 max-w-xl transition-opacity duration-300">
              Aidez-nous à transformer des dons en actions durables, en France et en Côte d’Ivoire.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700 list-inside">
              <li className="transform transition duration-200 motion-reduce:transition-none hover:-translate-y-0.5">• Chaque contribution permet des maraudes, la scolarisation et la création d’emplois.</li>
              <li className="transform transition duration-200 motion-reduce:transition-none hover:-translate-y-0.5">• Frip2Rêve finance nos projets pour garantir l’autonomie.</li>
              <li className="transform transition duration-200 motion-reduce:transition-none hover:-translate-y-0.5">• Transparence : statuts déposés depuis 2016, reconnus par le FORIM.</li>
            </ul>

            {/* Bloc bénévolat court */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-shadow duration-200 hover:shadow-lg motion-reduce:transition-none">
              <h3 className="text-sm font-semibold text-slate-900">Donner du temps</h3>
              <p className="text-xs text-slate-600 mt-1">Tu veux aider sur les collectes, la boutique ou les actions terrain ? Remplis le formulaire et on te propose une mission adaptée.</p>
              <div className="mt-3">
                <button
                  onClick={() => { safeTrack("volunteer_click"); onVolunteer(); }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:translate-y-[-2px] transform transition duration-150 ease-out motion-reduce:transition-none"
                >
                  S’inscrire comme bénévole
                </button>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-slate-100 transition-shadow duration-200 hover:shadow-sm motion-reduce:transition-none">
              <h4 className="text-sm font-semibold">Restez informé</h4>
              <p className="text-xs text-slate-600 mt-1">Recevez nos actions et événements (1 mail/mois).</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  safeTrack("newsletter_subscribe");
                  setSuccessMsg("Merci, vous êtes inscrit.e !");
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input id="newsletter-email" type="email" required placeholder="votre@email.com" className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-shadow duration-150 motion-reduce:transition-none" />
                <button type="submit" className="rounded-md px-4 py-2 bg-slate-900 text-white text-sm transform transition hover:-translate-y-0.5 duration-150 motion-reduce:transition-none">S’inscrire</button>
              </form>
            </div>
          </div>

          {/* Droite — CTAs */}
          <div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm transition-shadow duration-200 hover:shadow-lg motion-reduce:transition-none">
              <p className="text-sm text-slate-600">Faites un geste concret</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Votre don aide aujourd’hui</h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {defaultAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => openModal(amt)}
                    aria-label={`Don ${amt} euros`}
                    className="rounded-lg px-4 py-3 bg-white border border-slate-200 text-sm font-medium hover:shadow-sm transform hover:-translate-y-0.5 transition duration-150 motion-reduce:transition-none"
                  >
                    {amt} €
                  </button>
                ))}

                <button
                  onClick={() => openModal(null)}
                  className="rounded-lg px-4 py-3 bg-white border border-slate-200 text-sm font-medium hover:shadow-sm transform hover:-translate-y-0.5 transition duration-150 motion-reduce:transition-none"
                >
                  Autre
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => openModal(null)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transform hover:-translate-y-0.5 transition duration-150 motion-reduce:transition-none"
                >
                  Faire un don
                </button>

                <div className="mt-3 flex gap-3">
                  <button onClick={() => { safeTrack("volunteer_cta"); onVolunteer(); }} className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-800 text-sm hover:shadow-sm transform hover:-translate-y-0.5 transition duration-150 motion-reduce:transition-none">Devenir bénévole</button>
                  <button onClick={() => { safeTrack("visit_shop_cta"); onVisitShop(); }} className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-800 text-sm hover:shadow-sm transform hover:-translate-y-0.5 transition duration-150 motion-reduce:transition-none">Visiter Frip2Rêve</button>
                </div>

                <div className="mt-3 text-center">
                  <button onClick={() => { safeTrack("contact_cta"); onContact(); }} className="text-xs text-slate-600 underline transform transition duration-150 motion-reduce:transition-none">Nous contacter</button>
                </div>

                <p className="mt-4 text-xs text-slate-500">Paiement sécurisé · Reçu fiscal si applicable · Vos données sont protégées.</p>
              </div>
            </div>

            {/* Logos confiance */}
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              {logos.length ? (
                logos.map((l, i) => (
                  <img key={i} src={l.src} alt={l.alt} className="h-8 object-contain transition-transform duration-200 hover:scale-105 motion-reduce:transition-none" />
                ))
              ) : (
                <div className="text-xs text-slate-500">FORIM · Frip2Rêve · AFD</div>
              )}
            </div>

            {/* FAQ rapide */}
            <div className="mt-6 space-y-2">
              <details className="bg-white border border-slate-100 rounded-lg p-3 transition-shadow duration-150 hover:shadow-sm motion-reduce:transition-none">
                <summary className="text-sm font-medium">Comment est utilisé mon don ?</summary>
                <p className="mt-2 text-xs text-slate-600">Directement sur les actions (maraudes, fournitures, formation). Les coûts administratifs sont minimisés.</p>
              </details>

              <details className="bg-white border border-slate-100 rounded-lg p-3 transition-shadow duration-150 hover:shadow-sm motion-reduce:transition-none">
                <summary className="text-sm font-medium">Puis-je obtenir un reçu ?</summary>
                <p className="mt-2 text-xs text-slate-600">Oui, reçu envoyé par e-mail pour les dons éligibles.</p>
              </details>

              <details className="bg-white border border-slate-100 rounded-lg p-3 transition-shadow duration-150 hover:shadow-sm motion-reduce:transition-none">
                <summary className="text-sm font-medium">Comment devenir partenaire ?</summary>
                <p className="mt-2 text-xs text-slate-600">Contactez-nous via le formulaire “Nous contacter”.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Micro-texte légal */}
        <div className="mt-8 text-xs text-slate-500 transition-opacity duration-300">
          Association déclarée — statuts depuis le 26 juin 2016. Rapports et bilans disponibles sur demande. Mentions légales · Politique de confidentialité · Politique de cookies
        </div>
      </div>

      {/* Modal Don (mount/unmount animé) */}
      {isModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${modalActive ? "pointer-events-auto" : "pointer-events-none"}`}>
          {/* overlay */}
          <div
            onClick={closeModal}
            aria-hidden
            className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${modalActive ? "opacity-100" : "opacity-0"} motion-reduce:transition-none`}
          />

          {/* modal content */}
          <div
            role="dialog"
            aria-modal="true"
            className={`relative max-w-md w-full bg-white rounded-2xl p-6 z-10 transform transition-all duration-300 ease-out
              ${modalActive ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-3"} motion-reduce:transition-none`}
          >
            <h3 className="text-lg font-semibold text-slate-900">Faire un don</h3>
            <p className="text-xs text-slate-600 mt-1">Montant rapide — choisissez ou saisissez un montant.</p>

            <form className="mt-4 space-y-3" onSubmit={handleDonate}>
              <div className="grid grid-cols-4 gap-2">
                {defaultAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-2 rounded-md text-sm transition transform duration-150 ${selectedAmount === amt && !customAmount ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200'} motion-reduce:transition-none`}
                  >
                    {amt} €
                  </button>
                ))}
                <input
                  aria-label="Montant personnalisé"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value.replace(/[^0-9]/g, '')); setSelectedAmount(null); }}
                  placeholder="Autre"
                  className="py-2 px-3 rounded-md border border-slate-200 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 mt-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={isMonthly} onChange={() => setIsMonthly((s) => !s)} className="w-4 h-4" />
                  <span className="text-sm">Don mensuel</span>
                </label>
                <div className="text-xs text-slate-500">(Annulable à tout moment)</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
              </div>

              {errorMsg && <div className="text-xs text-rose-600">{errorMsg}</div>}
              {successMsg && <div className="text-xs text-emerald-600">{successMsg}</div>}

              <div className="flex items-center gap-3">
                <button type="submit" disabled={isSubmitting} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-sm font-semibold transform transition duration-150 motion-reduce:transition-none">
                  {isSubmitting ? 'Traitement...' : `Payer ${amountValue() ? amountValue() + ' €' : ''}`}
                </button>
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-full border border-slate-200 text-sm">Annuler</button>
              </div>

              <p className="text-xs text-slate-500 mt-2">Paiement sécurisé · Reçu fiscal si applicable · Vos données sont protégées.</p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
