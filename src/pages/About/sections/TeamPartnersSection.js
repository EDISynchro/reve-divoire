// src/components/TeamPartnersSection.jsx
import React from "react";
import natashaImg from "../../../assets/team/natasha.png";
import pasteursamImg from "../../../assets/team/pasteursam.png";
import acjcImg from "../../../../src/assets/partenaires/ACJC.png"
import frip2reveImg from "../../../../src/assets/frip2reve/logo.png"

import { Hourglass } from "lucide-react"; // exemple, remplacer par l'icône que tu veux

export default function TeamPartnersSection() {
  const teamMembers = [
    {
      name: "Natacha",
      role: "Fondatrice",
      bio: "Natacha est à l’origine du projet et pilote la vision globale.",
      img: natashaImg,
      linkedin: ""
    },
    {
      name: "Pasteur Nelson",
      role: "Trésorier",
      bio: "Pasteur Nelson gère les finances et veille à la bonne utilisation des ressources.",
      img: pasteursamImg,
      linkedin: ""
    }
  ];

  const partners = [
   {
  name: "Ambassade Céleste Jésus Christ (ACJC)",
  logo: acjcImg,
  description: "Ministère dirigé par le Pasteur Prince Nelson Udeh SAM, centré sur la prière et la croissance spirituelle"
},

 {
  name: "Frip2Rêve",
  logo: frip2reveImg,
  description: "Projet de friperie solidaire et boutique associative, soutenant les actions sociales de Rêve d’Ivoire"
}
  ];

  return (
    <section
      id="team-partners"
      aria-labelledby="team-partners-title"
      className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-12 flex justify-center"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">

        {/* Heading */}
        <header className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <h2
            id="team-partners-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center"
          >
            Notre équipe et nos partenaires
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
            Derrière chaque projet de Rêve d’Ivoire, une équipe passionnée et des partenaires engagés assurent la réussite et la transparence de nos actions.
          </p>
        </header>

        {/* Team Members */}
<div className="mt-12 flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
    {teamMembers.map((member, idx) => (
      <article
        key={idx}
        className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center w-80"
      >
        <img
          src={member.img}
          alt={`Photo de ${member.name}`}
          className="w-32 h-32 rounded-full object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.role}</p>
        <p className="mt-2 text-gray-600 text-sm">{member.bio}</p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[#7B2D2D] text-sm hover:underline"
          >
            LinkedIn
          </a>
        )}
      </article>
    ))}
  </div>
</div>




        {/* Partners */}
        <div className="mt-16 w-full flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Nos partenaires clés
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center w-full">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center max-w-xs"
              >
                <img
                  src={partner.logo}
                  alt={`Logo de ${partner.name}`}
                  className="h-16 object-contain"
                />
                <p className="mt-2 text-gray-500 text-xs">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration */}
<div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center gap-6 max-w-3xl mx-auto">
  <Hourglass className="w-14 h-14 text-[#7B2D2D] animate-pulse" />
  
  <p className="text-gray-700 text-base font-medium text-center">
    <strong>Chaque projet est le fruit d’une collaboration solide</strong> entre notre équipe et nos partenaires locaux et internationaux.
  </p>

  <div className="mt-4 flex justify-center gap-4">
    <span className="w-2 h-2 bg-[#7B2D2D] rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-[#7B2D2D] rounded-full animate-bounce delay-150"></span>
    <span className="w-2 h-2 bg-[#7B2D2D] rounded-full animate-bounce delay-300"></span>
  </div>
</div>

        {/* CTA */}
        <div className="mt-10 text-center flex justify-center w-full">
          <a
            href="#team-partners"
            className="inline-block bg-[#7B2D2D] text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D2D]/50 transition"
            aria-label="Découvrir l'équipe et les partenaires de Rêve d'Ivoire"
          >
            Rencontrer l’équipe / Nos partenaires
          </a>
        </div>

      </div>
    </section>
  );
}
