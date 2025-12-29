// EngagementSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Repeat,
  Calendar,
  Lock,
  CheckCircle,
  Info,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";



export default function EngagementSection({ onOpenDonate }) {
  const prefersReduced = useReducedMotion();
  const [confirming, setConfirming] = useState(false); // modal open
  const [toast, setToast] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  // fallback opener if user doesn't pass onOpenDonate
  const fallbackOpenDonate = ({ frequency } = { frequency: "monthly" }) => {
    try {
      localStorage.setItem("frip2reve_donation_pref", frequency);
    } catch (e) {}
    const target = document.getElementById("don");
    if (target) {
      // smooth unless prefersReduced
      target.scrollIntoView(prefersReduced ? {} : { behavior: "smooth", block: "start" });
      // focus first input for accessibility
      const first = target.querySelector("input, button, select, textarea, a[href]");
      first?.focus?.();
    } else {
      // fallback to hash
      window.location.hash = "#don";
    }
  };

  const openDonate = (opts) => {
    if (typeof onOpenDonate === "function") {
      try {
        onOpenDonate(opts);
      } catch (e) {
        fallbackOpenDonate(opts);
      }
    } else {
      fallbackOpenDonate(opts);
    }
  };

  // confirm modal flow for monthly subscription (reassuring microcopy)
  const onClickBecomeRegular = () => {
    // open small confirmation modal (non-blocking)
    setConfirming(true);
    // focus management handled by modal element (ref)
    setTimeout(() => modalRef.current?.focus?.(), 100);
  };

  const confirmAndOpen = () => {
    openDonate({ frequency: "monthly" });
    setConfirming(false);
    setToast("Formulaire ouvert — option mensuelle pré-sélectionnée");
  };

  const onClickOneTime = () => {
    openDonate({ frequency: "once" });
    setToast("Formulaire ouvert — don ponctuel");
  };

  return (
    <section id="engagement" aria-labelledby="engagement-title" className="bg-gray-50 px-4 md:px-10 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h2 id="engagement-title" className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <Repeat size={22} className="text-[#7B2D2D]" />
            S’engager durablement, à votre rythme
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Un don ponctuel aide aujourd’hui. Un engagement régulier permet d’agir toute l’année.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Left: Pourquoi + Comment */}
          <article className="space-y-4">
            <div className="bg-white border rounded-md p-5">
              <h3 className="text-lg font-medium flex items-center gap-2"><Calendar size={18} /> Pourquoi devenir donateur régulier</h3>

              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-inside">
                <li>Planifier les actions à l’avance</li>
                <li>Acheter les fournitures au bon moment</li>
                <li>Assurer la continuité des projets (Frip2Rêve, kits scolaires)</li>
              </ul>

              <p className="mt-3 text-sm text-gray-600">C’est la différence entre réagir et construire.</p>
            </div>

            <div className="bg-white border rounded-md p-5">
              <h3 className="text-lg font-medium flex items-center gap-2"><Info size={18} /> Comment ça fonctionne</h3>

              <ol className="mt-3 text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Vous choisissez un montant libre</li>
                <li>Le don est prélevé automatiquement chaque mois</li>
                <li>Vous pouvez modifier ou arrêter à tout moment</li>
              </ol>

              <p className="mt-3 text-sm text-gray-600">Aucun engagement caché. Aucun piège.</p>
            </div>
          </article>

          {/* Right: Ce que vous recevez + CTA */}
          <aside className="space-y-4">
            <div className="bg-white border rounded-md p-5">
              <h3 className="text-lg font-medium flex items-center gap-2"><CheckCircle size={18} /> Ce que vous recevez</h3>

              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>Un suivi régulier par e-mail</li>
                <li>Des nouvelles des actions soutenues</li>
                <li>Les mêmes reçus et preuves que pour un don ponctuel</li>
              </ul>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileTap={prefersReduced ? {} : { scale: 0.98 }}
                  onClick={onClickBecomeRegular}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#7B2D2D] text-white text-sm font-medium hover:bg-[#5a1f1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B2D2D]"
                  aria-label="Devenir donateur régulier — ouvre le formulaire avec mensuel pré-sélectionné"
                >
                  Devenir donateur régulier <ArrowRight size={16} />
                </motion.button>

                <button
                  onClick={onClickOneTime}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-md border text-sm bg-white hover:bg-gray-50"
                  aria-label="Faire un don ponctuel — retourne au formulaire de don ponctuel"
                >
                  Faire un don ponctuel <ArrowLeft size={16} />
                </button>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                <Lock size={12} className="inline-block mr-1" /> Engagement modifiable à tout moment — Don sécurisé — Association à taille humaine.
              </div>
            </div>

          </aside>
        </div>

        {/* Optional modal: confirmation + pedagogy */}
        {confirming && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              aria-hidden
              className="absolute inset-0 bg-black/40"
              onClick={() => setConfirming(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="engage-modal-title"
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.14 }}
              className="relative bg-white rounded-md max-w-md w-full p-6 shadow-lg"
              ref={modalRef}
              tabIndex={-1}
            >
              <h3 id="engage-modal-title" className="text-lg font-semibold">Devenir donateur régulier — quelques détails</h3>
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <p>Choisissez un montant libre. Le prélèvement s’effectue chaque mois. Vous pouvez modifier ou arrêter à tout moment, sans justification.</p>
                <p className="text-xs text-gray-500">Nous envoyons un e-mail de suivi régulier et les mêmes reçus que pour un don ponctuel.</p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={confirmAndOpen}
                  className="px-4 py-2 rounded-md bg-[#7B2D2D] text-white text-sm"
                >
                  Oui, ouvrir le formulaire
                </button>

                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 rounded-md border text-sm"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* short toast feedback */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.14 }}
            className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-50"
            role="status"
            aria-live="polite"
          >
            {toast}
          </motion.div>
        )}
      </div>
    </section>
  );
}
