import React from "react";
import { Users, Award, HeartHandshake } from "lucide-react";

const partnersData = [
  {
    name: "ACJC",
    logo: "/media/logo-acjc.png",
    type: "Institution",
  },
  {
    name: "Concept Paradise France",
    logo: "/media/logo-concept-paradise.png",
    type: "Entreprise partenaire",
  },
  {
    name: "Stesso",
    logo: "/media/logo-stesso.png",
    type: "Partenaire identifié",
  },
  // Ajouter d'autres partenaires si nécessaire
];

export default function Partners() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* TITRE */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Ils nous accompagnent pour agir ensemble
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Rêve d’Ivoire et Frip2Rêve travaillent main dans la main avec des associations, institutions et entreprises engagées pour maximiser l’impact sur le terrain.
        </p>

        {/* GRILLE PARTENAIRES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {partnersData.map((partner, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="h-16 object-contain mb-2"
              />
              <span className="text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition absolute bottom-2 bg-white px-2 py-1 rounded shadow text-center">
                {partner.name} — {partner.type}
              </span>
            </div>
          ))}
        </div>

        {/* DESCRIPTION COURTE */}
        <p className="mt-8 text-gray-600 max-w-3xl mx-auto">
          Ces collaborations nous permettent de toucher davantage d’enfants, d’organiser des événements et de sécuriser les actions sur le long terme.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact-partenaire"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Devenir partenaire
          </a>
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Voir toutes nos actions
          </a>
        </div>
      </div>
    </section>
  );
}
