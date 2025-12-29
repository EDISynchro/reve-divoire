import React from 'react';
import PropTypes from 'prop-types';
import { Users, Globe, Zap } from 'lucide-react';

// Partenaires.js
// Section "Partenaires & remerciements" — UI/UX courte, chaleureuse et crédible.

export default function Partenaires({
  title = "Partenaires & remerciements",
  lead = "Rien ne se fait seul. Merci à ceux qui rendent ce projet vivant.",
  items = [
    {
      key: 'benevoles',
      title: 'Bénévoles locaux',
      text: "Merci aux bénévoles qui collectent, trient, préparent et soutiennent l'association au quotidien.",
      micro: 'Votre temps transforme des vies.',
      Icon: Users,
    },
    {
      key: 'partenaires_ci',
      title: 'Partenaires associatifs en Côte d\'Ivoire',
      text: "Merci aux relais locaux qui assurent les distributions sur le terrain et l'accompagnement des familles.",
      micro: 'Une chaîne solidaire, des deux côtés de la mer.',
      Icon: Globe,
    },
    {
      key: 'edisynchro',
      title: 'Partenaire technique — EDISYNCHRO',
      text: "Merci à EDISYNCHRO pour l'accompagnement digital et le support technique du projet.",
      micro: 'Un appui pro pour aller plus loin.',
      Icon: Zap,
      logo: null, // optional url to logo image
      url: 'https://edisynchro.com',
    },
  ],
  className = '',
}) {
  return (
    <section aria-labelledby="partenaires-title" className={`py-12 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="partenaires-title" className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{lead}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.slice(0,3).map((it) => {
            const Icon = it.Icon || (() => null);
            return (
              <article key={it.key} className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow">
                  {it.logo ? (
                    <img src={it.logo} alt={`${it.title} logo`} className="w-10 h-10 object-contain" />
                  ) : (
                    <Icon size={18} aria-hidden="true" className="text-[#D6453A]" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{it.title}</div>
                  <div className="mt-1 text-xs text-gray-600">{it.text}</div>
                  <div className="mt-2 text-xs text-gray-500 italic">{it.micro}</div>
                </div>

                {it.url && (
                  <div className="flex-shrink-0">
                    <a href={it.url} className="text-xs font-semibold text-[#D6453A] hover:underline" aria-label={`Voir ${it.title}`}>
                      Voir
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

Partenaires.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string,
      micro: PropTypes.string,
      Icon: PropTypes.elementType,
      logo: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};
