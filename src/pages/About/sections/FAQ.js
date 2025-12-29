import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

// FAQ.js
// Section "Questions fréquentes" — UI/UX : accordion simple, 3 items, lisible en 20 secondes.

export default function FAQ({
  title = "Questions fréquentes",
  lead = "Les réponses aux questions qu'on nous pose le plus souvent.",
  items = [
    {
      key: 'deposer',
      q: 'Où déposer un don ?',
      a: "Les points de collecte sont indiqués sur la page Contact / Boutique. Vous pouvez choisir le lieu le plus proche de vous.",
      micro: "Pensez à nous prévenir avant un dépôt.",
    },
    {
      key: 'financier',
      q: 'Recevez-vous des dons financiers ?',
      a: "Oui. Les dons financiers peuvent être faits par virement ou via un lien sécurisé. Un reçu peut être fourni lorsque c'est applicable.",
      micro: "Chaque euro est utilisé pour nos actions terrain.",
    },
    {
      key: 'suivi',
      q: "Comment suivez-vous la destination des dons ?",
      a: "Chaque envoi est documenté : photos, liste du contenu, confirmation de réception. Toutes les preuves sont archivées pour la transparence.",
      micro: "Vous savez où part votre aide.",
    },
  ],
  className = '',
}) {
  const [open, setOpen] = useState(null);

  function toggle(key) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <section aria-labelledby="faq-title" className={`py-12 px-4 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 text-center">
          <h2 id="faq-title" className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{lead}</p>
        </header>

        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.key} className="border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(it.key)}
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={open === it.key}
                aria-controls={`faq-panel-${it.key}`}
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900">{it.q}</div>
                </div>
                <ChevronDown className={`transform transition-transform ${open === it.key ? 'rotate-180' : ''}`} />
              </button>

              <div
                id={`faq-panel-${it.key}`}
                className={`px-4 pt-0 pb-4 text-sm text-gray-700 ${open === it.key ? 'block' : 'hidden'}`}
              >
                <div className="mt-2">{it.a}</div>
                <div className="mt-2 text-xs text-gray-500 italic">{it.micro}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a href="/contact" className="text-sm font-semibold text-[#D6453A] hover:underline">Contactez-nous</a>
        </div>
      </div>
    </section>
  );
}

FAQ.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      q: PropTypes.string.isRequired,
      a: PropTypes.string.isRequired,
      micro: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};
