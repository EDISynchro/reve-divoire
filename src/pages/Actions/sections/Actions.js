import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import frip2reveImg from '../../../assets/frip2reve/boutique.png'
/*
 SectionProjects.js
 Section "Nos projets sur le terrain"

 Objectif (simplement) :
 Montrer des projets réels, avec des preuves,
 et permettre d'agir tout de suite (voir, aider, s'inscrire).
*/

const PROJECTS = [
  {
    id: 1,
    title: "Frip2Rêve — Friperie solidaire",
    type: "Friperie",
    status: "Actif",
    partner: "Autre",
    hook: "Boutique associative — tri, revente et financement des projets.",
    details:
      "Gestion de la friperie, collecte et tri, ventes solidaires. Les recettes soutiennent les actions locales. Inventaire et comptes simplifiés disponibles.",
    image: frip2reveImg,
    alt: "Friperie Frip2Rêve — bénévoles et vêtements",
    ctas: [
      { label: "Voir la boutique", href: "/frip2reve" },
      { label: "Soutenir Frip2Rêve", href: "/don" },
    ],
  },
  {
    id: 2,
    title: "Lives Zoom — lundis & samedis",
    type: "Live",
    status: "Actif",
    partner: "Autre",
    hook:
      "Lives hebdomadaires pour présenter l’association, mobiliser et répondre aux questions.",
    details:
      "Planning, thèmes des sessions et lien d’inscription. Page dédiée avec calendrier.",
    image: "/media/live-zoom.jpg",
    alt: "Live Zoom Rêve d’Ivoire — atelier en ligne",
    ctas: [
      { label: "S’inscrire au live", href: "/lives" },
      { label: "Voir le calendrier", href: "/lives/calendrier" },
    ],
  },
  {
    id: 3,
    title: "Pack médias — photos & vidéos",
    type: "Média",
    status: "À venir",
    partner: "Autre",
    hook:
      "Sélection et montage des médias fournis pour le site et les réseaux.",
    details:
      "Choix de visuels et montage d’une courte vidéo de présentation. Fichiers originaux à traiter.",
    image: "/media/medias-selection.jpg",
    alt: "Sélection de photos et vidéos pour Rêve d’Ivoire",
    ctas: [
      { label: "Voir les médias", href: "/medias" },
      { label: "Télécharger les originaux", href: "/medias/originaux" },
    ],
  },
  {
    id: 4,
    title: "Partenariats & gouvernance",
    type: "Partenariat",
    status: "Actif",
    partner: "ACJC",
    hook:
      "ACJC partenaire — contacts, rôles et gouvernance en cours de structuration.",
    details:
      "Logos partenaires, vCard Natacha et vCard PasteurSam. Mise à jour prévue après restructuration des statuts.",
    image: "/media/logo-acjc.png",
    alt: "Logo ACJC",
    ctas: [
      { label: "Voir les partenaires", href: "/partenaires" },
      { label: "Télécharger vCard", href: "/vcard" },
    ],
  },
  {
    id: 5,
    title: "Vidéo partenaire — Mokobe 113",
    type: "Média",
    status: "À venir",
    partner: "Mokobe 113",
    hook:
      "Intégration potentielle d’une vidéo partenaire (à valider).",
    details:
      "Vérification de l’autorisation d’utilisation et emplacement partenaire média.",
    image: "/media/mokobe-113.jpg",
    alt: "Vidéo partenaire Mokobe 113",
    ctas: [
      { label: "Voir la vidéo", href: "/media/mokobe-113" },
      { label: "Valider l’intégration", href: "/admin/validation" },
    ],
  },
];

export default function SectionProjects() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Tous");
  const [status, setStatus] = useState("Tous");
  const [partner, setPartner] = useState("Tous");

  const resetFilters = () => {
    setQuery("");
    setType("Tous");
    setStatus("Tous");
    setPartner("Tous");
  };

  const filtered = PROJECTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(query.toLowerCase()) &&
      (type === "Tous" || p.type === type) &&
      (status === "Tous" || p.status === status) &&
      (partner === "Tous" || p.partner === partner)
    );
  });

  return (
    <section className="bg-white py-14" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Nos projets sur le terrain
          </h2>
          <p className="mt-3 text-gray-700">
            Choisis un projet, vois les preuves et participe : don, bénévolat, partage ou inscription aux lives.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            Frip2Rêve, campagnes locales, lives hebdo et actions média — tout ce que nous faisons est documenté et prêt à être partagé.
          </p>
        </div>

        {/* Filtres */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Recherche</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder='Rechercher un projet, ex. "Frip2Rêve"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <select onChange={(e) => setType(e.target.value)} className="border rounded-md py-2 text-sm">
            <option>Tous</option>
            <option>Friperie</option>
            <option>Événement</option>
            <option>Live</option>
            <option>Média</option>
            <option>Partenariat</option>
          </select>

          <select onChange={(e) => setStatus(e.target.value)} className="border rounded-md py-2 text-sm">
            <option>Tous</option>
            <option>Actif</option>
            <option>Terminé</option>
            <option>À venir</option>
          </select>

          <select onChange={(e) => setPartner(e.target.value)} className="border rounded-md py-2 text-sm">
            <option>Tous</option>
            <option>ACJC</option>
            <option>Mokobe 113</option>
            <option>Autre</option>
          </select>

          <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-gray-600">
            <X size={14} /> Effacer les filtres
          </button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="border rounded-lg overflow-hidden bg-white">
              <img src={p.image} alt={p.alt} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{p.hook}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.ctas.map((c, i) => (
                    <a
                      key={i}
                      href={c.href}
                      className="text-sm font-medium text-gray-900 underline"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
