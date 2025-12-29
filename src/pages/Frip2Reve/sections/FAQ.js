import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Section — FAQ Boutique
 * Objectif : lever les doutes avant commande (mobile-first, accessible)
 */

const FAQ_ITEMS = [
  {
    q: "Puis-je retourner un article ?",
    a: (
      <>
        <p>Oui, sous conditions. Les retours sont acceptés sous <strong>7 jours après réception</strong>, uniquement si l’article n’a pas été porté et est dans son état d’origine.</p>
        <p className="text-xs text-gray-500 mt-2">Les frais de retour sont à la charge de l’acheteur.</p>
      </>
    ),
  },
  {
    q: "Puis-je échanger un article ?",
    a: (
      <>
        <p>Oui, si une autre pièce est disponible. L’échange se fait lors d’un retrait ou d’une prochaine vente, selon les stocks.</p>
        <p className="text-xs text-gray-500 mt-2">Les pièces sont uniques — l’échange dépend des disponibilités.</p>
      </>
    ),
  },
  {
    q: "Comment se passe la livraison ?",
    a: (
      <>
        <ul className="list-disc list-inside">
          <li>Retrait local (Beauvais) — gratuit</li>
          <li>Livraison — frais calculés lors de la confirmation</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">Livraison possible en France métropolitaine.</p>
      </>
    ),
  },
  {
    q: "Quels sont les délais ?",
    a: (
      <ul className="list-disc list-inside">
        <li>Retrait local : sous 2 à 5 jours après confirmation</li>
        <li>Livraison : 5 à 10 jours ouvrés</li>
      </ul>
    ),
  },
  {
    q: "Comment payer ?",
    a: (
      <>
        <ul className="list-disc list-inside">
          <li>Virement bancaire</li>
          <li>Lien de paiement sécurisé</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">Les instructions sont envoyées après la commande.</p>
      </>
    ),
  },
  {
    q: "Les vêtements sont-ils neufs ?",
    a: (
      <>
        <p>Non. Ce sont des vêtements africains de seconde main, triés, réparés et remis à neuf avec soin.</p>
        <p className="text-xs text-gray-500 mt-2">Chaque pièce est unique.</p>
      </>
    ),
  },
  {
    q: "Et si l’article n’est plus disponible ?",
    a: (
      <p>La disponibilité est confirmée manuellement. Si l’article est déjà réservé ou vendu, nous te proposons une alternative ou un remboursement.</p>
    ),
  },
];

export default function FAQBoutique({ whatsappNumber = '33123456789' }) {
  const [openIndex, setOpenIndex] = useState(0); // une question ouverte par défaut

  const toggle = (i) => setOpenIndex(prev => (prev === i ? -1 : i));

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Bonjour Frip2Rêve — J’ai une question avant de commander.'
  )}`;

  return (
    <section className="max-w-3xl mx-auto px-4 py-12" aria-labelledby="faq-title">
      <header className="mb-6">
        <h2 id="faq-title" className="text-2xl font-extrabold">Questions fréquentes</h2>
        <p className="text-sm text-gray-600 mt-1">Tout ce qu’il faut savoir avant de commander.</p>
      </header>

      <div className="divide-y border rounded-md">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                className="w-full flex justify-between items-center text-left px-4 py-4 focus:outline-none focus-visible:ring"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
              >
                <span className="font-medium">{item.q}</span>
                <span aria-hidden className="ml-4">{isOpen ? '−' : '+'}</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                className={`px-4 pb-4 text-sm text-gray-700 ${isOpen ? 'block' : 'hidden'}`}
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="font-medium mb-3">Une autre question ?</p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter Frip2Rêve via WhatsApp"
          className="inline-block px-5 py-3 bg-[#7B2D2D] text-white rounded-md"
        >
          Contacter via WhatsApp
        </a>
        <p className="text-xs text-gray-500 mt-2">Réponse rapide • humaine • sans robot</p>
      </div>
    </section>
  );
}

FAQBoutique.propTypes = {
  whatsappNumber: PropTypes.string,
};
