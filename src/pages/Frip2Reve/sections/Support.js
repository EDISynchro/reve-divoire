import React from "react";
import { ArrowRight, HeartHandshake, Users } from "lucide-react";

export default function SupportSection() {
  return (
    <section className="w-full bg-green-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* TITRE */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Agissez dès aujourd’hui pour changer des vies
        </h2>

        {/* SOUS-TITRE */}
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Chaque don, chaque achat ou chaque partage contribue directement à offrir des opportunités aux enfants et aux familles que nous accompagnons.
        </p>

        {/* INTRO COURTE */}
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Votre soutien permet de financer des kits scolaires, des ateliers éducatifs et des actions durables sur le terrain. Ensemble, nous pouvons faire la différence.
        </p>

        {/* CTA PRINCIPAUX */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <a
            href="/don"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            aria-label="Faire un don sécurisé"
          >
            Faire un don
            <ArrowRight size={16} />
          </a>
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
            aria-label="Soutenir un projet concret"
          >
            Soutenir un projet
            <Users size={16} />
          </a>
          <a
            href="/communaute"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700"
            aria-label="Rejoindre la communauté Rêve d’Ivoire"
          >
            Rejoindre la communauté
            <HeartHandshake size={16} />
          </a>
        </div>

        {/* ILLUSTRATION / IMAGE D’IMPACT */}
        <div className="mb-12">
          <img
            src="/media/impact-frip2reve.jpg"
            alt="Enfants et familles bénéficiant des actions de Rêve d’Ivoire"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* CONTACT RAPIDE */}
        <div className="text-gray-700 space-y-1 text-sm">
          <p>Email : <a href="mailto:frip2reve@gmail.com" className="underline">frip2reve@gmail.com</a></p>
          <p>Téléphone : <a href="tel:+33662034759" className="underline">06 62 03 47 59</a></p>
          <p>Adresse : 6 rue de la Mairie, 95820 Bruyères sur Oise</p>
        </div>

        {/* MICROCOPY CONFIANCE */}
        <p className="mt-6 text-gray-500 text-xs">
          Chaque action est transparente, traçable et documentée. Vos dons et soutiens vont directement aux projets de terrain.
        </p>
      </div>
    </section>
  );
}
