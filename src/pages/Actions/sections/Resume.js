import React from 'react';
import { Package, ShoppingBag, MapPin } from 'lucide-react';

// SectionRésumé.js — résumé rapide des actions & projets
export default function SectionResume() {
  const bullets = [
    {
      icon: <MapPin size={32} aria-hidden="true" />,
      title: 'Collectes locales régulières',
      text: 'Collectes organisées en région pour récupérer des vêtements en bon état.',
    },
    {
      icon: <ShoppingBag size={32} aria-hidden="true" />,
      title: 'Frip2Rêve — boutique solidaire',
      text: 'Ventes solidaires pour financer directement les actions terrain.',
    },
    {
      icon: <Package size={32} aria-hidden="true" />,
      title: 'Envois & distributions',
      text: 'Acheminement et remise des dons en Côte d’Ivoire via des relais locaux.',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {bullets.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-[#D6453A] mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-gray-500">
          Tout est traçable : photos, listes et récépissés.
        </div>
      </div>
    </section>
  );
}
