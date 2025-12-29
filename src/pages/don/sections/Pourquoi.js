import React from 'react';
import { CreditCard, Users, Sparkles, HeartHandshake } from 'lucide-react';

export default function SectionPourquoiDon() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Votre aide change des choses. Vraiment.
          </h2>
          <p className="mt-4 text-gray-700">
            Ce ne sont pas des promesses.<br />
            Ce sont des actions concrètes rendues possibles par des personnes comme vous.
          </p>
        </div>

        {/* Impact immédiat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border p-5">
            <div className="text-3xl font-extrabold text-[#7B2D2D]">10 €</div>
            <p className="mt-2 text-sm text-gray-700">
              Un vêtement africain récupéré, nettoyé et remis à neuf.
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-3xl font-extrabold text-[#7B2D2D]">30 €</div>
            <p className="mt-2 text-sm text-gray-700">
              Plusieurs pièces prêtes à être vendues pour financer une action solidaire.
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-3xl font-extrabold text-[#7B2D2D]">60 €</div>
            <p className="mt-2 text-sm text-gray-700">
              Une action locale soutenue directement.
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-3xl font-extrabold text-[#7B2D2D]">1 bénévole</div>
            <p className="mt-2 text-sm text-gray-700">
              Des dizaines de vêtements sauvés et redistribués.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-10">
          Vous voyez exactement où va votre aide.
        </p>

        {/* Urgence douce */}
        <div className="max-w-3xl mb-12">
          <p className="text-gray-800">
            Chaque jour sans aide, ce sont des vêtements perdus et des actions repoussées.<br />
            Chaque don ou coup de main permet d’agir tout de suite.
          </p>
        </div>

        {/* Donner ou s’engager */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-bold mb-3">Faire un don</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Impact immédiat</li>
              <li className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> En 30 secondes</li>
              <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> 100 % utile</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-bold mb-3">Devenir bénévole</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Users className="w-4 h-4" /> Zéro obligation</li>
              <li className="flex items-center gap-2"><Users className="w-4 h-4" /> Selon votre temps</li>
              <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> Impact humain direct</li>
            </ul>
          </div>
        </div>

        {/* Texte fort */}
        <p className="text-center font-semibold text-gray-900 mb-8">
          Pas besoin de faire beaucoup. Il faut juste commencer.
        </p>

        {/* Preuve sociale */}
        <p className="text-center text-sm text-gray-600 mb-10">
          Déjà soutenu par des donateurs et bénévoles engagés.
        </p>
      </div>
    </section>
  );
}
