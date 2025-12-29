// TransparencyResponsive.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Download,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  FolderOpen,
  Image,
  Video,
  X,
} from "lucide-react";

/**
 * TransparencyResponsive
 * - desktop / mobile behavior in same component (matchMedia)
 * - very clean GAFAM-like layout, minimal microcopy
 * - tooltips: hover/focus on desktop, tap-toggle on mobile
 * - modal animated and pedagogical
 * - semantic: section / header / article / aside / time / ul / li
 * - accessible: aria attributes, keyboard, reduced-motion support
 *
 * Props: (optional)
 *  - contactEmail, contactPhone, reports (array), onRequestProof(payload)
 *
 * Usage: <TransparencyResponsive />
 */

/* -------------------- Helpers -------------------- */
const DownloadIcon = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Lightweight tooltip component.
   - On desktop: shows on hover/focus.
   - On mobile (touch): controlled by parent (tap to toggle).
*/
function Tooltip({ children, visible, id }) {
  const prefersReduced = useReducedMotion();
  if (!visible) return null;
  return (
    <motion.div
      id={id}
      role="tooltip"
      initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
      animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.12 }}
      className="absolute z-50 max-w-xs rounded-md bg-black/90 text-white text-xs px-3 py-1"
      style={{ transform: "translateX(-50%)" }}
    >
      {children}
    </motion.div>
  );
}

/* Modal with simple animation and focus trap basics */
function Modal({ open, title, children, onClose }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keyup", onKey);
    // focus
    const prev = document.activeElement;
    ref.current?.focus();
    return () => {
      window.removeEventListener("keyup", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.14 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transparency-modal-title"
        tabIndex={-1}
        ref={ref}
        className="relative w-full max-w-xl bg-white rounded-md shadow-xl p-6 focus:outline-none"
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
        animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.16 }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="transparency-modal-title" className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} aria-label="Fermer" className="p-1 rounded hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-700">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------- Main Component -------------------- */
export default function TransparencyResponsive({
  contactEmail = "frip2reve@gmail.com",
  contactPhone = "06 62 03 47 59",
  reports = [
    { name: "rapport-2024.pdf", updated: "22 déc. 2025", href: "/rapport-2024.pdf" },
    { name: "rapport-kits-2024.pdf", updated: "15 nov. 2025", href: "/rapport-kits-2024.pdf" },
  ],
  onRequestProof = (payload) => { console.log("request proof", payload); },
}) {
  const prefersReduced = useReducedMotion();

  // screen / pointer detection
  const [isSmallScreen, setIsSmallScreen] = useState(false); // width-based
  const [isTouchPointer, setIsTouchPointer] = useState(false); // pointer based (coarse)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqSmall = window.matchMedia("(max-width: 768px)");
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");

    const setAll = () => {
      setIsSmallScreen(mqSmall.matches);
      setIsTouchPointer(mqTouch.matches);
    };

    setAll();
    const onChangeSmall = () => setIsSmallScreen(mqSmall.matches);
    const onChangeTouch = () => setIsTouchPointer(mqTouch.matches);

    mqSmall.addEventListener?.("change", onChangeSmall);
    mqTouch.addEventListener?.("change", onChangeTouch);

    return () => {
      mqSmall.removeEventListener?.("change", onChangeSmall);
      mqTouch.removeEventListener?.("change", onChangeTouch);
    };
  }, []);

  // tooltip state for mobile (tap)
  const [tooltipOpen, setTooltipOpen] = useState(null); // id string or null
  // modal for request proof
  const [modalOpen, setModalOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // small microcopy helpers
  const micro = {
    where: "Reçu, dépenses par projet, preuves terrain (photos, PDF).",
    delay: "Reçu & suivi envoyés sous 72h ouvrées.",
    kpiNote: "Chaque document : date & vérification par le trésorier.",
  };

  // handle proof request submit
  const submitProofRequest = (e) => {
    e.preventDefault();
    if (!requestSubject || !requestEmail) return;
    onRequestProof({ subject: requestSubject, email: requestEmail, date: new Date().toISOString() });
    setRequestSent(true);
    setTimeout(() => {
      setModalOpen(false);
      setRequestSent(false);
      setRequestSubject("");
      setRequestEmail("");
    }, 1200);
  };

  // animations controlled by reduced motion and touch
  const cardHover = (prefersReduced || isTouchPointer) ? {} : { whileHover: { y: -4, scale: 1.01 }, whileTap: { scale: 0.995 } };

  // keyboard helper: close tooltip with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setTooltipOpen(null);
    };
    window.addEventListener("keyup", onKey);
    return () => window.removeEventListener("keyup", onKey);
  }, []);

  return (
    <section aria-labelledby="transparency-title" className="bg-white px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h2 id="transparency-title" className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
              <ShieldCheck size={22} className="text-[#7B2D2D]" /> Transparence & suivi — où va votre don
            </h2>
            <p className="text-sm text-gray-600 mt-1">{micro.where}</p>
          </div>

          <div className="text-sm text-gray-600">
            <div>{micro.delay}</div>
            <div className="text-xs text-gray-500 mt-1">{micro.kpiNote}</div>
          </div>
        </header>

        {/* Layout: two columns on desktop, single column on mobile */}
        <div className={`grid gap-6 ${isSmallScreen ? "grid-cols-1" : "grid-cols-3"}`}>
          {/* Main column (spans 2 cols on desktop) */}
          <article className={`${isSmallScreen ? "col-span-1" : "col-span-2"} space-y-5`}>
            <section className="bg-gray-50 border rounded-md p-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} /> Reçu & suivi — résumé
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Après paiement : email récapitulatif immédiat. Reçu fiscal et rapport sommaire envoyés sous 72h ouvrées.
              </p>

              {/* Micro-UX: transaction block */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 bg-white border rounded-md p-3 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 font-mono text-sm">TXN-9F3A</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Transaction ID</div>
                    <div className="text-xs text-gray-500">Téléchargez le reçu ou rendez-vous sur la fiche projet.</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm"
                    onClick={() => window.open("/recu-TXN-9F3A.pdf")}
                  >
                    <Download size={14} /> Télécharger le reçu
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#7B2D2D] text-white text-sm"
                    onClick={() => document.querySelector("#project-list")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <FolderOpen size={14} /> Voir la fiche projet
                  </button>
                </div>
              </div>
            </section>

            {/* Reports list */}
            <section className="bg-white border rounded-md p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center gap-2"><FileText size={16} /> Rapports</h3>
                <div className="text-xs text-gray-500">Mis à jour : voir fichier</div>
              </div>

              <ul className="mt-3 space-y-2" id="project-list">
                {reports.map((r) => (
                  <motion.li
                    key={r.name}
                    className="flex items-center justify-between gap-3 border rounded-md p-3"
                    {...cardHover}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <div className="flex items-center gap-3">
                      <Download size={16} />
                      <div className="text-sm">
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-500">Mis à jour : <time dateTime={r.updated}>{r.updated}</time></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a href={r.href} className="text-sm underline inline-flex items-center gap-2"><DownloadIcon className="inline-block" /> Télécharger</a>
                      <span className="text-xs text-gray-400">|</span>
                      <button
                        type="button"
                        className="text-sm underline"
                        onClick={() => window.open(r.href)}
                        aria-label={`Ouvrir ${r.name}`}
                      >
                        Ouvrir
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* Proofs & media quick preview */}
            <section className="bg-white border rounded-md p-4">
              <h3 className="text-sm font-medium flex items-center gap-2"><Image size={16} /> Preuves terrain</h3>
              <p className="text-sm text-gray-700 mt-2">Photos avant/après, rapports PDF et inventaires anonymisés quand pertinent.</p>

              <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {/* thumbnails (click -> open modal) */}
                {["photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg","photo5.jpg","photo6.jpg"].map((p, i) => (
                  <motion.button
                    key={p}
                    onClick={() => setModalOpen(true)}
                    className="h-20 w-full rounded-md overflow-hidden bg-gray-100 border"
                    aria-label={`Voir preuve ${i+1}`}
                    whileTap={prefersReduced ? {} : { scale: 0.98 }}
                  >
                    <img alt={`preuve ${i+1}`} src={`/images/${p}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </section>
          </article>

          {/* Aside column (desktop) or secondary blocks (mobile) */}
          <aside className="space-y-4">
            <motion.div
              className="bg-white border rounded-md p-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              {...cardHover}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center gap-2"><BadgeCheck size={16} /> Vérification</h4>
                <span className="text-xs text-gray-500">Validé</span>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                Documents financiers vérifiés par le trésorier — <strong>Pasteur Nelson</strong>.
                <div className="text-xs text-gray-500 mt-2">ACJC mentionné parmi les partenaires.</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white border rounded-md p-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14 }}
              {...cardHover}
            >
              <h4 className="text-sm font-medium flex items-center gap-2"><Mail size={16} /> Contact transparence</h4>
              <div className="mt-2 text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2"><Mail size={14} /> <a href={`mailto:${contactEmail}`} className="underline text-sm">{contactEmail}</a></div>
                <div className="flex items-center gap-2"><Phone size={14} /> <span className="text-sm">{contactPhone}</span></div>
                <div className="flex items-center gap-2"><MapPin size={14} /> <span className="text-sm">6 rue de la Mairie, 95820 Bruyères-sur-Oise</span></div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-3 py-2 rounded-md bg-[#7B2D2D] text-white text-sm inline-flex items-center gap-2"
                >
                  <HelpCircle size={14} /> Demander plus de preuves
                </button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 border rounded-md p-3 text-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              {...cardHover}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm">Micro-FAQ</div>
                <button
                  type="button"
                  onClick={() => setTooltipOpen((s) => s === "faq" ? null : "faq")}
                  aria-expanded={tooltipOpen === "faq"}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <HelpCircle size={16} />
                </button>
              </div>

              <ul className="mt-2 text-xs text-gray-700 space-y-2">
                <li><strong>Quand reçu ?</strong> Sous 72 h ouvrées.</li>
                <li><strong>Remboursement ?</strong> Oui si paiement non finalisé.</li>
                <li><strong>Identité bénéficiaires ?</strong> Données anonymisées.</li>
              </ul>

              {/* tooltip anchored to this block */}
              <div className="relative">
                {!isTouchPointer && tooltipOpen === "faq" && (
                  <Tooltip id="faq-tooltip" visible>
                    Appuie sur un bouton pour demander des documents supplémentaires.
                  </Tooltip>
                )}
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Mobile specific: when touch, show instructive compact help at bottom */}
        {isSmallScreen && (
          <div className="mt-6 flex flex-col gap-3">
            <div className="bg-white border rounded-md p-3 text-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#7B2D2D]" />
                <div>
                  <div className="font-medium">Transparence rapide</div>
                  <div className="text-xs text-gray-500">Rapports, photos, reçus.</div>
                </div>
              </div>

              <button
                className="px-3 py-2 rounded-md border text-sm"
                onClick={() => setModalOpen(true)}
              >
                Demander preuves
              </button>
            </div>
          </div>
        )}

        {/* Modal: request proofs / detail modal */}
        <Modal
          open={modalOpen}
          title="Demander des documents complémentaires"
          onClose={() => { setModalOpen(false); setRequestSent(false); }}
        >
          {!requestSent ? (
            <form onSubmit={submitProofRequest} className="space-y-3">
              <label className="text-sm">Objet (court)</label>
              <input
                required
                value={requestSubject}
                onChange={(e) => setRequestSubject(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Ex: Demande de rapports financiers - kits scolaires"
              />
              <label className="text-sm">Email</label>
              <input
                required
                type="email"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="votremail@exemple.com"
              />

              <div className="flex gap-2">
                <button type="submit" className="px-3 py-2 bg-[#7B2D2D] text-white rounded-md text-sm">Envoyer la demande</button>
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-2 rounded-md border text-sm">Annuler</button>
              </div>
            </form>
          ) : (
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-2"><BadgeCheck size={16} /> Demande envoyée</div>
              <div>Nous répondons sous 48 h ouvrées à l'adresse fournie.</div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
