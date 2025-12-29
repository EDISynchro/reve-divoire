import React from 'react';
import PropTypes from 'prop-types';
import { Archive, Repeat, Tag, Truck, Heart } from 'lucide-react';

// CeQueNousFaisons.js
// Section "Ce que nous faisons — Actions concrètes" — courte, lisible, pensée UI/UX
export default function CeQueNousFaisons({
  title = "Ce que nous faisons",
  subtitle = "Actions concrètes au quotidien",
  actions = [
    {
      key: 'collectes',
      title: 'Collectes régulières',
      text: "Nous organisons des points de collecte en région pour récupérer vêtements, chaussures et articles utiles auprès de particuliers et partenaires locaux.",
      micro: "Donnez près de chez vous, on s’occupe du reste.",
      Icon: Archive,
    },
    {
      key: 'tri',
      title: 'Tri & revalorisation',
      text: "Chaque article est trié, nettoyé et vérifié. Les pièces récupérables sont réparées ou revalorisées pour une seconde vie.",
      micro: "Rien ne se perd, tout est trié avec soin.",
      Icon: Repeat,
    },
    {
      key: 'ventes',
      title: 'Ventes solidaires — Frip2Rêve',
      text: "Les meilleures pièces sont mises en vente à petits prix afin de financer les actions sociales et les envois humanitaires.",
      micro: "Acheter solidaire, c’est aider directement.",
      Icon: Tag,
    },
    {
      key: 'envois',
      title: "Envois & distributions en Côte d'Ivoire",
      text: "Les dons triés sont acheminés vers nos relais locaux, puis distribués aux familles et communautés qui en ont le plus besoin.",
      micro: "Une aide qui arrive réellement sur le terrain.",
      Icon: Truck,
    },
    {
      key: 'accompagnement',
      title: 'Accompagnement social ponctuel',
      text: "Nous intervenons auprès de familles en difficulté, en apportant soutien matériel ou mise en relation avec des partenaires sociaux.",
      micro: "Une aide humaine, pas seulement matérielle.",
      Icon: Heart,
    },
  ],
}) {
  return (
    <section aria-labelledby="actions-title" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="actions-title" className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((a) => {
            const Icon = a.Icon || (() => null);
            return (
              <article key={a.key} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow" aria-labelledby={`action-${a.key}-title`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow">
                      <Icon aria-hidden="true" size={18} className="text-[#D6453A]" />
                    </div>
                  </div>

                  <div>
                    <h3 id={`action-${a.key}-title`} className="text-sm font-semibold text-gray-900">{a.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">{a.text}</p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500 italic">{a.micro}</div>
              </article>
            );
          })}
        </div>

       </div>
    </section>
  );
}

CeQueNousFaisons.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      micro: PropTypes.string,
      Icon: PropTypes.any,
    })
  ),
};
