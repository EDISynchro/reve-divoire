// src/components/HeroAbout.jsx
import React from "react";
import { Heart, Users, BookOpen } from "lucide-react";
import heroImg from '../../../assets/revedivoire/image3.png';
export default function HeroAbout() {
  return (
    <section className="relative bg-white py-12 mt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* Texte principal */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Chaque geste compte, chaque sourire construit l’avenir
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Depuis 2016, Rêve d’Ivoire transforme de petites actions en grands impacts : réemploi de matériel, soutien scolaire, et projets éducatifs co-construits avec les familles et les communautés locales.
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Chaque action contribue à changer la vie des enfants et de leurs familles. Nous mesurons et partageons les résultats concrets pour que chacun puisse voir l’impact réel de l’engagement de l’association.
          </p>

          {/* Micro-confiance */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <Heart className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Transparence</p>
                <p className="text-gray-600 text-xs">Preuves terrain et comptes-rendus clairs.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Collaboration locale</p>
                <p className="text-gray-600 text-xs">Projets co-construits avec les communautés.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-900">Impact mesurable</p>
                <p className="text-gray-600 text-xs">Statistiques et mini-cas concrets.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end relative mt-4 lg:mt-0">
         
          <img
            src= {heroImg} // à remplacer par votre image réelle
            alt="Bénévoles souriants distribuant des fournitures scolaires"
            className="rounded shadow-lg object-cover w-full  relative"
          />
        </div>

      </div>
    </section>
  );
}
