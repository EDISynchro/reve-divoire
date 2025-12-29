import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Phone } from 'lucide-react';

/**
 * SectionFAQDonBenevole.js
 * Section — FAQ Don & Bénévolat
 * - Accordéon accessible (1 question ouverte à la fois)
 * - Vouvoyement dans tous les textes
 * - Mobile-first, full-width
 */

const FAQ_ITEMS = [
  {
    group: 'Don',
    items: [
      {
        q: 'Le paiement est‑il sécurisé ?',
        a: (
          <>
            <p>Oui. Les paiements par carte bancaire sont traités via Stripe, une plateforme sécurisée et reconnue. Aucune donnée bancaire n’est stockée par Frip2Rêve.</p>
          </>
        ),
      },
      {
        q: 'Puis‑je donner sans carte bancaire ?',
        a: (
          <>
            <p>Oui. Vous pouvez faire un don par virement bancaire, par chèque ou en don en nature (vêtements).</p>
          </>
        ),
      },
      {
        q: 'Puis‑je donner un petit montant ?',
        a: (
          <>
            <p>Oui. Chaque don, même modeste, a un impact réel sur nos actions solidaires.</p>
          </>
        ),
      },
      {
        q: 'Vais‑je recevoir un reçu ?',
        a: (
          <>
            <p>Un reçu ou justificatif est envoyé par email après validation du don. Un reçu fiscal est fourni si applicable.</p>
          </>
        ),
      },
    ],
  },
  {
    group: 'Bénévolat',
    items: [
      {
        q: "Faut‑il s’engager sur la durée ?",
        a: (
          <>
            <p>Non. Vous pouvez aider ponctuellement ou régulièrement, selon votre temps et vos disponibilités.</p>
          </>
        ),
      },
      {
        q: 'Quelles compétences sont utiles ?',
        a: (
          <>
            <p>Vente, logistique, communication ou aide générale. Toutes les bonnes volontés sont les bienvenues.</p>
          </>
        ),
      },
      {
        q: 'Où se déroulent les actions ?',
        a: (
          <>
            <p>Les actions ont lieu principalement en France (collectes, ventes, logistique) et sur des projets terrain en Côte d’Ivoire.</p>
          </>
        ),
      },
      {
        q: 'Comment se passe le premier contact ?',
        a: (
          <>
            <p>Après votre inscription, nous vous recontactons par email pour vous expliquer la suite, simplement.</p>
          </>
        ),
      },
    ],
  },
];

export default function SectionFAQDonBenevole({ whatsappNumber = '33123456789' }) {
  const [open, setOpen] = useState({ group: 0, index: 0 }); // group idx, question idx (one open at a time)
  const controlRefs = useRef([]);
  const containerRef = useRef(null);

  // keyboard navigation within the accordion: up/down to move between questions, enter/space to toggle
  useEffect(() => {
    function onKey(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(document.activeElement)) return;

      const flat = controlRefs.current.filter(Boolean);
      const idx = flat.indexOf(document.activeElement);
      if (idx === -1) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (idx + 1) % flat.length;
        flat[next].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (idx - 1 + flat.length) % flat.length;
        flat[prev].focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleToggle = (gIdx, qIdx) => {
    setOpen(prev => (prev.group === gIdx && prev.index === qIdx ? { group: -1, index: -1 } : { group: gIdx, index: qIdx }));
  };

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour Frip2Rêve — J’ai une question au sujet des dons / du bénévolat.')}`;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12" aria-labelledby="faq-don-title" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-8">
          <h2 id="faq-don-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">Questions fréquentes</h2>
          <p className="mt-2 text-gray-600">Réponses claires pour lever les doutes avant de donner ou de proposer votre aide.</p>
        </header>

        <div className="space-y-8">
          {FAQ_ITEMS.map((group, gIdx) => (
            <div key={group.group}>
              <h3 className="text-lg font-semibold mb-3">{group.group}</h3>

              <div className="border rounded-md overflow-hidden">
                {group.items.map((it, qIdx) => {
                  const isOpen = open.group === gIdx && open.index === qIdx;
                  const controlId = `faq-${gIdx}-${qIdx}-control`;
                  const panelId = `faq-${gIdx}-${qIdx}-panel`;
                  const refIndex = controlRefs.current.length;

                  return (
                    <div key={it.q} className="">
                      <button
                        id={controlId}
                        ref={el => { controlRefs.current[refIndex] = el; }}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(gIdx, qIdx)}
                        className="w-full flex items-center justify-between px-4 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring"
                      >
                        <span className="font-medium text-gray-800">{it.q}</span>
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden />
                      </button>

                      <div id={panelId} role="region" aria-labelledby={controlId} className={`${isOpen ? 'block' : 'hidden'} px-4 pb-4 text-sm text-gray-700 bg-white border-t`}> 
                        {it.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-medium mb-3">Une question supplémentaire ?</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-[#7B2D2D] text-white rounded-md" aria-label="Contacter Frip2Rêve via WhatsApp">
            <Phone className="w-4 h-4" /> Contacter via WhatsApp
          </a>
          <p className="text-xs text-gray-500 mt-2">Réponse humaine • Rapide • Sans engagement</p>
        </div>
      </div>
    </section>
  );
}

SectionFAQDonBenevole.propTypes = {
  whatsappNumber: PropTypes.string,
};