import React from 'react';
import PropTypes from 'prop-types';
import { Heart, Users, Megaphone } from 'lucide-react';

// CommentVousPouvezAider.js
// Section "Comment vous pouvez aider" — UI/UX claire, lisible en 5 secondes.

export default function CommentVousPouvezAider({
  title = "Comment vous pouvez aider",
  lead = "Chaque geste compte. Le vôtre aussi.",
  ctaHref = '/don-contact',
  cards = [
    {
      key: 'donner',
      Icon: Heart,
      heading: 'Donnez ce que vous pouvez',
      desc: "Vêtements propres, en bon état, ou soutien financier.",
      micro: 'Votre don aide directement une famille.',
      cta: 'Je donne',
    },
    {
      key: 'benevole',
      Icon: Users,
      heading: 'Rejoignez nos bénévoles',
      desc: 'Aide au tri, aux collectes, aux ventes solidaires.',
      micro: 'Quelques heures peuvent changer beaucoup.',
      cta: "Je rejoins",
    },
    {
      key: 'partager',
      Icon: Megaphone,
      heading: "Parlez-en autour de vous",
      desc: "Suivez-nous et partagez nos actions sur Instagram & Facebook.",
      micro: "Une publication = plus de familles soutenues.",
      cta: 'Je partage',
    },
  ],
  className = '',
}) {
  return (
    <section aria-labelledby="aide-title" className={`py-12 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <h2 id="aide-title" className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{lead}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.Icon || (() => null);
            return (
              <a
                key={card.key}
                href={ctaHref}
                className="group block rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6453A]"
                aria-label={card.heading}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow">
                      <Icon size={20} aria-hidden="true" className="text-[#16A34A]" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{card.heading}</div>
                      <div className="text-xs text-gray-600 mt-1">{card.desc}</div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="text-xs text-gray-500 italic">{card.micro}</div>
                    <div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#F97316] px-3 py-2 rounded-lg group-hover:bg-[#FB923C]">
                        {card.cta}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

CommentVousPouvezAider.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  ctaHref: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      Icon: PropTypes.elementType,
      heading: PropTypes.string.isRequired,
      desc: PropTypes.string,
      micro: PropTypes.string,
      cta: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};
