import React from "react";
import { Clock, ShieldCheck, Users } from "lucide-react";

export default function ContactHero() {
  const trustPoints = [
    {
      id: 1,
      icon: Clock,
      title: "Réponse rapide",
      text: "Nous répondons sous 48h ouvrées.",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Respect de vos données",
      text: "Vos informations sont protégées et confidentielles.",
    },
    {
      id: 3,
      icon: Users,
      title: "Équipe dédiée",
      text: "Un interlocuteur unique pour chaque demande.",
    },
  ];

  return (
    <section
      className="bg-[#7B2D2D] text-white py-48 px-4 md:px-16"
      aria-labelledby="contact-hero-title"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Texte principal */}
        <div className="flex-1">
          <h1
            id="contact-hero-title"
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Entrons en contact
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Une question, un projet ou simplement envie d’échanger ? Notre équipe
            vous répond dans les plus brefs délais.
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-white text-[#7B2D2D] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
          >
            Remplir le formulaire
          </a>
        </div>

        {/* Illustration / badge micro-confiance */}
        <div className="flex-1 flex flex-col gap-6">
          {trustPoints.map((point) => {
            const IconComponent = point.icon;
            return (
              <div
                key={point.id}
                className="flex items-center gap-4 bg-white bg-opacity-10 p-4 rounded-lg"
              >
                <IconComponent size={32} className="text-white flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="text-sm">{point.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
