import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Clock, Users, Package, AlertCircle } from 'lucide-react';

/**
 * SectionMetricsImpact
 * - Version "pro" : design épuré, hiérarchie visuelle forte, responsive
 * - Conçu pour s'intégrer dans le flux de la page (pas de sticky/floating)
 * - Utilise TailwindCSS (v3+) et lucide-react pour les icônes
 *
 * Props principaux:
 *  - metrics: tableau d'objets { key, label, value, micro, icon, confirmed }
 *  - showTag: afficher ou non le badge "chiffrés à confirmer"
 *  - animate: si true, tentera d'animer les nombres (tolérant aux textes non numériques)
 *  - className: conteneur optionnel
 */

function parseNumberFromText(text) {
  // Extrait un nombre (entier ou float) depuis un texte du type "~1,5 t" ou "120"
  if (!text || typeof text !== 'string') return null;
  // remplacer virgule par point, retirer espaces et unité
  const cleaned = text.replace(/,/g, '.').replace(/\s+/g, '').replace(/[a-zA-Z°%€£₽kgmt]+/g, '');
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

function useAnimatedValue(targetText, enabled) {
  // Si enabled et targetText contient un number, anime la valeur
  const [display, setDisplay] = useState(targetText);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setDisplay(targetText);
      return;
    }

    const targetNum = parseNumberFromText(targetText);
    if (targetNum === null) {
      setDisplay(targetText);
      return;
    }

    const duration = 900; // ms
    const start = performance.now();
    const startVal = 0;

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = startVal + (targetNum - startVal) * eased;

      // Format: garder 1 décimale si targetNum non entier
      const formatted = Number.isInteger(targetNum) ? Math.round(current).toString() : (Math.round(current * 10) / 10).toString();
      setDisplay(formatted + targetText.replace(/^[\-\d.,\s]+/, ''));

      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetText, enabled]);

  return display;
}

function MetricCard({ Icon, label, value, micro, confirmed, showTag, animate }) {
  const animated = useAnimatedValue(value, animate);

  return (
    <article
      role="group"
      aria-label={`${label}: ${value}`}
      className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Accent stripe */}
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-l-2xl bg-gradient-to-b from-[#7B2D2D] to-[#9B4B4B]" aria-hidden="true" />

      <div className="flex items-start gap-4 ml-3">
        <div className="flex-none">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-50 to-white border border-gray-100">
            <Icon className="w-7 h-7 text-[#7B2D2D]" aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-700 truncate">{label}</h3>

         
          </div>

          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">{animated}</div>
            {micro && <p className="mt-1 text-sm text-gray-500">{micro}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

MetricCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  micro: PropTypes.string,
  confirmed: PropTypes.bool,
  showTag: PropTypes.bool,
  animate: PropTypes.bool,
};

export default function SectionMetricsImpact({
  metrics,
  className = '',
  showTag = true,
  animate = false,
  id = 'metrics-impact',
}) {
  const defaults = [
    {
      key: 'created',
      label: 'Année de création',
      value: 'Depuis 2016 — actif',
      micro: "Association en activité depuis sa création",
      icon: Clock,
      confirmed: true,
    },
    {
      key: 'families',
      label: 'Familles aidées',
      value: '~120 familles aidées',
      micro: 'Estimation à confirmer',
      icon: Users,
      confirmed: false,
    },
    {
      key: 'clothes',
      label: 'Vêtements redistribués',
      value: '~1,5 t vêtements redistribués',
      micro: 'Estimation à confirmer',
      icon: Package,
      confirmed: false,
    },
  ];

  const list = Array.isArray(metrics) && metrics.length > 0 ? metrics : defaults;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`w-full ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 id={`${id}-title`} className="text-xl sm:text-2xl font-bold text-gray-800">
              Métriques & impact
            </h2>
          
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Données : état actuel</span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((m) => (
            <MetricCard
              key={m.key}
              Icon={m.icon}
              label={m.label}
              value={m.value}
              micro={m.micro}
              confirmed={!!m.confirmed}
              showTag={showTag}
              animate={animate}
            />
          ))}
        </div>
  </div>
    </section>
  );
}

SectionMetricsImpact.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      micro: PropTypes.string,
      icon: PropTypes.elementType,
      confirmed: PropTypes.bool,
    })
  ),
  className: PropTypes.string,
  showTag: PropTypes.bool,
  animate: PropTypes.bool,
  id: PropTypes.string,
};
