// ImpactSection.jsx
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Users,
  MapPin,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
  Info,
} from "lucide-react";

/**
 * ImpactSection
 * - section id="impact" aria-labelledby="impact-title"
 * - responsive: grid 3 cols -> mobile stacked
 * - microcopy courtes, icônes, micro-animations (respect prefers-reduced-motion)
 * - tooltips légers pour micro-indicateurs
 * - CTA scroll vers #don (respect reduced-motion)
 */
export default function ImpactSection({ scrollToId = "don" }) {
  const prefersReduced = useReducedMotion();
  const [tooltip, setTooltip] = useState(null);
  const touchSupported = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  useEffect(() => {
    if (!touchSupported) return;
    // on mobile, hide tooltip on scroll
    const onScroll = () => setTooltip(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [touchSupported]);

  const handleScrollToDon = () => {
    const el = document.getElementById(scrollToId);
    if (!el) return;
    if (prefersReduced) {
      el.scrollIntoView();
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // focus form first focusable element if any
    const firstInput = el?.querySelector("input, button, select, textarea, a[href]");
    firstInput?.focus?.();
  };

  const smallCardAnim = prefersReduced ? {} : { whileHover: { y: -6 }, whileTap: { scale: 0.995 } };

  return (
    <section id="impact" aria-labelledby="impact-title" className="bg-gray-50 px-4 md:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="impact-title" className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <HeartHandshake size={22} className="text-[#7B2D2D]" />
            Ce que votre don change réellement
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Derrière chaque don, il y a une action visible et mesurable sur le terrain.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 items-start">
          {/* Bloc 1 — Enfants & éducation */}
          <motion.article
            {...smallCardAnim}
            className="bg-white border rounded-lg p-5 shadow-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            aria-labelledby="impact-edu-title"
          >
            <h3 id="impact-edu-title" className="text-lg font-medium flex items-center gap-2">
              <BookOpen size={18} /> Enfants & éducation
            </h3>

            <ul className="mt-3 text-sm space-y-2 text-gray-700">
              <li>Des kits scolaires distribués directement aux enfants</li>
              <li>Des fournitures adaptées à leur âge</li>
              <li>Un allègement réel pour les familles</li>
            </ul>

            <p className="mt-3 text-sm text-gray-600">Résultat visible : un enfant équipé suit mieux l’école.</p>
          </motion.article>

          {/* Bloc 2 — Friperie solidaire */}
          <motion.article
            {...smallCardAnim}
            className="bg-white border rounded-lg p-5 shadow-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.04 }}
            aria-labelledby="impact-friperie-title"
          >
            <h3 id="impact-friperie-title" className="text-lg font-medium flex items-center gap-2">
              <Users size={18} /> Frip2Rêve — friperie solidaire
            </h3>

            <ul className="mt-3 text-sm space-y-2 text-gray-700">
              <li>Collecte et tri des vêtements</li>
              <li>Remise en état avant redistribution ou vente solidaire</li>
              <li>Soutien financier indirect aux actions sociales</li>
            </ul>

            <p className="mt-3 text-sm text-gray-600">Résultat visible : vêtements utiles et économie solidaire qui tourne.</p>
          </motion.article>

          {/* Bloc 3 — Actions locales & terrain */}
          <motion.article
            {...smallCardAnim}
            className="bg-white border rounded-lg p-5 shadow-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.08 }}
            aria-labelledby="impact-terrain-title"
          >
            <h3 id="impact-terrain-title" className="text-lg font-medium flex items-center gap-2">
              <MapPin size={18} /> Actions locales & terrain
            </h3>

            <ul className="mt-3 text-sm space-y-2 text-gray-700">
              <li>Logistique (transport, stockage, matériel)</li>
              <li>Organisation d’événements solidaires</li>
              <li>Soutien aux familles accompagnées</li>
            </ul>

            <p className="mt-3 text-sm text-gray-600">Résultat visible : des actions concrètes, pas des idées sur papier.</p>
          </motion.article>
        </div>

        {/* Mini-indicateurs d'impact */}
        <div className="mt-8 bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-sm">
              <CheckCircle size={16} /> 1 don = 1 action traçable
            </span>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-full text-sm"
              onMouseEnter={() => !touchSupported && setTooltip("projects")}
              onMouseLeave={() => !touchSupported && setTooltip(null)}
              onFocus={() => !touchSupported && setTooltip("projects")}
              onBlur={() => !touchSupported && setTooltip(null)}
              onClick={() => touchSupported && setTooltip((t) => (t === "projects" ? null : "projects"))}
              aria-haspopup="true"
              aria-expanded={tooltip === "projects"}
              aria-controls="tooltip-projects"
            >
              Projets documentés
              <Info size={14} />
            </button>

            {/* tooltip */}
            <div className="relative">
              {tooltip === "projects" && (
                <div id="tooltip-projects" role="tooltip" className="absolute left-0 mt-2 z-50 w-64 rounded-md bg-black/90 text-white text-xs px-3 py-2">
                  Photos, rapports et suivis disponibles pour chaque projet — clairs et datés.
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Suivi envoyé par e-mail après contribution</span>
            <motion.button
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
              onClick={handleScrollToDon}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#7B2D2D] text-white text-sm hover:bg-[#5a1f1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B2D2D]"
              aria-label="Je veux avoir un impact maintenant — aller au formulaire de don"
            >
              Je veux avoir un impact maintenant <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
