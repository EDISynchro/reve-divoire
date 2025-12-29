// DonateFormSection.WithIcons.jsx
import React, { useState, useEffect, useRef, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  HeartHandshake,
  Camera,
  ShieldCheck,
  CreditCard,
  User,
  Mail,
  Phone,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

/**
 * Accessible Tooltip (lightweight)
 * - Trigger must pass aria-describedby to associate
 * - Shows on hover/focus, hides on blur/mouseleave
 */
function Tooltip({ id, label }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      id={id}
      role="tooltip"
      initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
      animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="pointer-events-none absolute z-50 mt-2 -translate-x-1/2 transform rounded-md bg-gray-900/95 text-white text-xs px-2 py-1"
      style={{ left: "50%" }}
    >
      {label}
    </motion.div>
  );
}

/**
 * Modal (animated)
 * - animated open/close
 * - closes on ESC and backdrop click
 */
function Modal({ open, onClose, title, children }) {
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keyup", onKey);
    return () => window.removeEventListener("keyup", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-w-lg w-full bg-white rounded-md shadow-lg p-6"
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
        animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-700">{children}</div>
      </motion.div>
    </div>
  );
}

/**
 * Main component: DonateFormSectionWithIcons
 * - sémantique, accessible
 * - icônes Lucide & tooltips pédagogiques courts
 * - animations légères (respect reduced-motion)
 */
export default function DonateFormSectionWithIcons({
  contactEmail = "frip2reve@gmail.com",
  contactPhone = "06 62 03 47 59",
  reportsLink = "/rapport-2024.pdf",
  showBankTransfer = true,
  onDonate,
}) {
  const projects = [
    { id: "all", label: "Soutenir l’ensemble", subtitle: "Soutien global", kpi: "Actions transverses" },
    { id: "friperie", label: "Frip2Rêve — friperie solidaire", subtitle: "Insertion & vente solidaire", kpi: "520+ enfants accompagnés" },
    { id: "kits-scolaires", label: "Kits scolaires — distributions", subtitle: "Fournitures pour enfants", kpi: "1 kit ≈ 25 €" },
    { id: "collecte-tri", label: "Collecte & Tri", subtitle: "Revalorisation textile", kpi: "4 200 kg revalorisés" },
    { id: "paix-2025", label: "Campagne « Promotion de la paix » — avril 2025", subtitle: "Actions éducatives", kpi: "Campagne 2025" },
  ];

  const suggested = [10, 25, 50, 100];

  // form state
  const [amountPreset, setAmountPreset] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [project, setProject] = useState("all");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState(null);
  const [showIBAN, setShowIBAN] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastPayload, setLastPayload] = useState(null);

  const prefersReduced = useReducedMotion();
  const tooltipId = useId(); // single tooltip id generator base

  // effective amount
  const effectiveAmount = () => {
    const v = Number(customAmount || amountPreset || 0);
    return Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0;
  };

  // validation (brief, accessible)
  const validate = () => {
    const e = {};
    const a = effectiveAmount();
    if (!a || a < 1) e.amount = "Choisis un montant valide (≥ 1 €).";
    if (!firstName.trim()) e.firstName = "Prénom requis.";
    if (!lastName.trim()) e.lastName = "Nom requis.";
    if (!email.trim()) e.email = "Email requis.";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) e.email = "Email invalide.";
    }
    if (!rgpd) e.rgpd = "La case RGPD est requise.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setSubmitMessage({ type: "error", text: "Corrige les champs en erreur." });
      return;
    }

    const payload = {
      amount: effectiveAmount(),
      frequency,
      project,
      contact: { firstName, lastName, email, phone },
      rgpd,
      newsletter,
      date: new Date().toISOString(),
    };

    setLastPayload(payload);
    setShowModal(true);
    setSubmitMessage({ type: "success", text: "Merci — reçu en cours d’envoi." });

    if (typeof onDonate === "function") {
      try { onDonate(payload); } catch (err) { /* caller handles */ }
    }
  };

  // small input group helper (icon + input)
  function IconInput({ icon: Icon, id, label, value, onChange, type = "text", required = false, placeholder = "", errorId }) {
    return (
      <div>
        <label htmlFor={id} className="text-sm flex items-center gap-2">
          <Icon size={16} aria-hidden className="text-gray-600" />
          <span>{label}{required && <span className="text-red-600"> *</span>}</span>
        </label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-required={required || undefined}
          aria-invalid={!!errorId}
          aria-describedby={errorId || undefined}
          className="mt-1 px-3 py-2 border rounded-md w-full"
        />
      </div>
    );
  }

  return (
    <section aria-labelledby="don-title" className="bg-white px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="don-title" className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <HeartHandshake size={20} className="text-[#7B2D2D]" /> Soutenez un projet — donnez maintenant
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Choisissez un montant, affectez votre don — vous recevrez un reçu et un suivi par e-mail.
          </p>
        </header>

        {/* Bandeau confiance */}
        <div className="rounded-md border bg-gray-50 p-3 mb-6 flex items-start justify-between gap-4">
          <div className="text-sm text-gray-700 flex gap-3 items-start">
            <ShieldCheck size={18} className="mt-1 text-gray-600" />
            <div>
              <strong>Reçu fiscal et suivi envoyés par e-mail.</strong>
              <div className="mt-1">Transparence : rapports disponibles sur chaque fiche projet. Contact : <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a></div>
            </div>
          </div>

          <div className="text-right text-sm">
            <span className="inline-flex items-center gap-2 px-2 py-1 bg-white border rounded text-xs">
              <CheckCircle size={14} /> Confirmé par Natacha
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Formulaire principal */}
          <main aria-label="Formulaire de don" className="space-y-4">
            {/* Montant */}
            <fieldset className="space-y-2" aria-labelledby="amount-legend">
              <legend id="amount-legend" className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <span>Montant</span>
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-describedby={`${tooltipId}-amount`}
                  onMouseEnter={() => {}}
                >
                  <HelpCircle size={16} />
                </button>
              </legend>

              <div className="relative">
                {/* amount buttons (animated) */}
                <div className="flex gap-2 flex-wrap">
                  {suggested.map((s) => (
                    <motion.label
                      key={s}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`inline-flex items-center px-3 py-2 rounded-full border text-sm cursor-pointer select-none
                        ${!customAmount && amountPreset === s ? "bg-[#7B2D2D] text-white border-[#7B2D2D]" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"}`}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setAmountPreset(s); setCustomAmount(""); } }}
                    >
                      <input
                        name="amount-preset"
                        type="radio"
                        className="sr-only"
                        value={s}
                        checked={!customAmount && amountPreset === s}
                        onChange={() => { setAmountPreset(s); setCustomAmount(""); }}
                        aria-checked={!customAmount && amountPreset === s}
                      />
                      <span>{s} €</span>
                    </motion.label>
                  ))}

                  <label className="inline-flex items-center px-3 py-2 border rounded-md bg-white">
                    <input
                      id="custom-amount"
                      name="custom-amount"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      placeholder="Autre"
                      value={customAmount}
                      onChange={(ev) => {
                        const v = ev.target.value.replace(/[^\d]/g, "");
                        setCustomAmount(v);
                        if (v) setAmountPreset(null);
                      }}
                      aria-label="Montant libre en euros"
                      className="w-28 text-sm outline-none placeholder-gray-400"
                    />
                  </label>
                </div>

                {errors.amount && (
                  <div id="error-amount" role="alert" className="text-xs text-red-600 mt-2 flex items-center gap-2">
                    <AlertCircle size={14} /> {errors.amount}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Fréquence */}
            <fieldset className="flex items-center gap-6" aria-label="Fréquence du don">
              <legend className="sr-only">Fréquence</legend>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="frequency"
                  value="once"
                  checked={frequency === "once"}
                  onChange={() => setFrequency("once")}
                />
                Don ponctuel
              </label>

              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="frequency"
                  value="monthly"
                  checked={frequency === "monthly"}
                  onChange={() => setFrequency("monthly")}
                />
                Don mensuel
              </label>
            </fieldset>

            {/* Projet */}
            <div>
              <label htmlFor="project" className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Camera size={16} /> Affecter au projet
                <span className="text-xs text-gray-500 ml-2">(mini-KPI visible à droite)</span>
              </label>
              <select
                id="project"
                name="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="mt-2 px-3 py-2 border rounded-md text-sm w-full max-w-md"
                aria-describedby={`${tooltipId}-project`}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>

              {/* tooltip court pédagogique */}
              <div className="relative mt-1">
                <button
                  type="button"
                  aria-describedby={`${tooltipId}-project`}
                  className="inline-flex items-center gap-1 text-xs text-gray-500"
                >
                  <HelpCircle size={14} /> Pourquoi choisir un projet ?
                </button>

                <div className="sr-only" id={`${tooltipId}-project`}>Choisir permet d'affecter votre don à une action spécifique, visible sur la fiche projet.</div>
              </div>
            </div>

            {/* Contact fields with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <IconInput
                icon={User}
                id="firstName"
                label="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                errorId={errors.firstName ? "error-firstName" : undefined}
              />
              <IconInput
                icon={User}
                id="lastName"
                label="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                errorId={errors.lastName ? "error-lastName" : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <IconInput
                icon={Mail}
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                errorId={errors.email ? "error-email" : undefined}
              />
              <IconInput
                icon={Phone}
                id="phone"
                label="Téléphone (optionnel)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </div>

            {/* RGPD & newsletter */}
            <div className="flex flex-col gap-2 text-sm">
              <label className="inline-flex items-start gap-2">
                <input
                  id="rgpd"
                  name="rgpd"
                  type="checkbox"
                  checked={rgpd}
                  onChange={() => setRgpd((s) => !s)}
                  aria-required="true"
                />
                <span>
                  J’accepte que mes données soient utilisées pour l’envoi du reçu et du suivi. <a href="/privacy" className="underline">Politique de confidentialité</a>.
                </span>
              </label>
              {errors.rgpd && <div role="alert" className="text-xs text-red-600 flex items-center gap-2"><AlertCircle size={14} />{errors.rgpd}</div>}

              <label className="inline-flex items-start gap-2">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  checked={newsletter}
                  onChange={() => setNewsletter((s) => !s)}
                />
                <span>Je souhaite recevoir les actualités et invitations aux lives (lundi & samedi).</span>
              </label>
            </div>

            {/* CTA + secondary */}
            <div className="flex items-center gap-4 mt-3">
              <motion.button
                type="submit"
                aria-label="Faire un don maintenant"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#7B2D2D] text-white font-medium hover:bg-[#5a1f1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B2D2D]"
                whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
              >
                <CreditCard size={16} /> Don de {effectiveAmount()} €
              </motion.button>

              {showBankTransfer && (
                <button
                  type="button"
                  onClick={() => setShowIBAN((s) => !s)}
                  className="text-sm underline text-gray-700 inline-flex items-center gap-2"
                >
                  <HelpCircle size={14} /> Faire un don par virement
                </button>
              )}
            </div>

            {showIBAN && (
              <div className="mt-2 p-3 border rounded-md bg-gray-50 text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono">FR76 1234 5678 9012 3456 7890 123</span>
                </div>
                <div className="text-xs text-gray-600">Communication : Nom + DON + projet</div>
              </div>
            )}

            {submitMessage && (
              <div role={submitMessage.type === "error" ? "alert" : "status"} className={`text-sm mt-2 ${submitMessage.type === "error" ? "text-red-600" : "text-green-700"} flex items-center gap-2`}>
                {submitMessage.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />} {submitMessage.text}
              </div>
            )}
          </main>

          {/* RIGHT: confiance & détails rapides */}
          <aside aria-label="Confiance et détails rapides" className="space-y-4">
            <div className="bg-white border rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2"><Camera size={16} /> Ce que couvre</h3>
              <div className="mt-3 grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-sm">25€</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Ce que couvre 25 €</div>
                    <div className="text-xs text-gray-600">1 kit scolaire partiel</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-sm">50€</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Ce que couvre 50 €</div>
                    <div className="text-xs text-gray-600">Contribution à la revalorisation textile</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2"><ShieldCheck size={16} /> Transparence</h3>
              <div className="mt-2 text-sm">
                <a href={reportsLink} className="underline inline-flex items-center gap-2"><DownloadIconFallback /> Télécharger rapports</a>
                <div className="text-xs text-gray-600 mt-1">Rapports & preuves publiés pour chaque projet.</div>
              </div>
            </div>

            <div className="bg-white border rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2"><Mail size={16} /> Contact</h3>
              <div className="mt-2 text-sm text-gray-700">
                <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a><br />
                <span>{contactPhone}</span>
              </div>
            </div>

            <div className="bg-white border rounded-md p-3 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={16} /> Méthodes de paiement acceptées
              </div>
              <div className="text-xs text-gray-600">
                CB, Apple Pay, Google Pay{showBankTransfer ? ", virement" : ""}.
              </div>

              <div className="mt-3 text-xs text-gray-500">Don sécurisé — réception d’un reçu par e-mail.</div>
            </div>
          </aside>
        </form>

        {/* Confirmation modal */}
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Merci — confirmation"
        >
          {lastPayload ? (
            <>
              <p className="mb-3">Un e-mail de confirmation et le reçu vous seront envoyés.</p>

              <div className="text-sm text-gray-800 space-y-1">
                <div><strong>Montant :</strong> {lastPayload.amount} € ({lastPayload.frequency})</div>
                <div><strong>Projet :</strong> {projects.find(p => p.id === lastPayload.project)?.label || "Soutenir l’ensemble"}</div>
                <div><strong>Nom :</strong> {lastPayload.contact.firstName} {lastPayload.contact.lastName}</div>
                <div><strong>Email :</strong> {lastPayload.contact.email}</div>
              </div>

              <div className="mt-5 flex gap-3">
                <a href={`#project-${lastPayload.project}`} className="px-4 py-2 rounded-md border text-sm">Voir la fiche projet</a>
                <a href={reportsLink} className="px-4 py-2 rounded-md bg-[#7B2D2D] text-white text-sm">Télécharger rapports</a>
                <button onClick={() => setShowModal(false)} className="ml-auto text-sm underline">Fermer</button>
              </div>
            </>
          ) : null}
        </Modal>
      </div>
    </section>
  );
}

/**
 * DownloadIconFallback
 * - small inline icon fallback so we don't import another lucide icon separately.
 */
function DownloadIconFallback() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 21H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
