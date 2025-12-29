import React, { useState } from "react";
import { Video, Image, Calendar, Users, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const articlesData = [
  {
    id: 1,
    title: "Vidéo présentation de Natacha",
    short: "La vidéo officielle — Natacha présente Rêve d'Ivoire (20–30s)",
    published_at: "2025-04-01",
    source: "Natacha",
    media: [{ type: "video", url: "/media/video-natacha-intro.mp4", alt: "Vidéo de présentation — Natacha présente Rêve d'Ivoire" }],
    tags: ["vidéo", "fondateur", "fourni_par_natacha"],
    download_allowed: true,
    featured: true,
  },
  {
    id: 2,
    title: "Live Zoom — Sessions régulières",
    short: "Lives Zoom — rendez-vous hebdo, lundi et samedi",
    published_at: "2025-04-01",
    source: "Natacha",
    media: [{ type: "image", url: "/images/live-placeholder.jpg", alt: "Live Zoom prochain enregistrement" }],
    tags: ["live", "événement", "fourni_par_natacha"],
    download_allowed: false,
  },
  {
    id: 3,
    title: "Galerie médias",
    short: "Une grande sélection de photos et vidéos fournies par Natacha",
    published_at: "2025-04-01",
    source: "Natacha",
    media: [{ type: "image", url: "/images/gallery/thumb1.jpg", alt: "Photos d'actions - fournies par Natacha" }],
    tags: ["photo", "galerie", "frip2reve"],
    download_allowed: true,
  },
  {
    id: 4,
    title: "Actualité Frip2Rêve",
    short: "Nouvelles de la friperie Frip2Rêve — photos & posts",
    published_at: "2025-04-02",
    source: "Natacha",
    media: [{ type: "image", url: "/images/frip2reve-update.jpg", alt: "Frip2Rêve — mises à jour visuelles" }],
    tags: ["frip2reve", "boutique", "fourni_par_natacha"],
    download_allowed: false,
  },
  {
    id: 5,
    title: "Annonce partenaire ACJC",
    short: "Partenariat mentionné : ACJC",
    published_at: "2025-04-03",
    source: "Natacha",
    media: [{ type: "image", url: "/images/partner-acjc.jpg", alt: "Partenaire ACJC" }],
    tags: ["partenaire", "ACJC"],
    download_allowed: false,
  },
  {
    id: 6,
    title: "Mise à jour équipe — Pasteur Nelson",
    short: "Équipe : Pasteur Nelson — trésorier",
    published_at: "2025-04-04",
    source: "Natacha",
    media: [{ type: "image", url: "/images/team/pasteur-nelson.jpg", alt: "Pasteur Nelson" }],
    tags: ["équipe", "pasteur_nelson"],
    download_allowed: false,
  },
];

export default function FluxActualites() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSource, setFilterSource] = useState(false);
  const [filterTag, setFilterTag] = useState("");

  const filteredArticles = articlesData.filter((article) => {
    if (search && !article.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && !article.tags.includes(filterType)) return false;
    if (filterSource && article.source !== "Natacha") return false;
    if (filterTag && !article.tags.includes(filterTag)) return false;
    return true;
  });

  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TITRE */}
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
          Actualités récentes & médias fournis par Natacha
        </h2>
        <p className="text-gray-700 max-w-xl">
          Vidéos, photos et comptes-rendus fournis par l’équipe : suivez les lives, la présentation de Natacha et l’activité de la friperie Frip2Rêve.
        </p>

        {/* BARRE DE FILTRES */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            placeholder="Rechercher une actu…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-48"
          >
            <option value="">Type</option>
            <option value="vidéo">Vidéo</option>
            <option value="photo">Photo</option>
            <option value="live">Live</option>
            <option value="partenaire">Partenariat</option>
            <option value="équipe">Équipe</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filterSource}
              onChange={() => setFilterSource(!filterSource)}
              className="rounded border-gray-300"
            />
            Fourni par Natacha
          </label>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-48"
          >
            <option value="">Tag</option>
            <option value="frip2reve">Frip2Rêve</option>
            <option value="ACJC">ACJC</option>
            <option value="équipe">Équipe</option>
          </select>
          <button
            onClick={() => {
              setSearch(""); setFilterType(""); setFilterSource(false); setFilterTag("");
            }}
            className="px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Réinitialiser les filtres
          </button>
        </div>

        {/* GRILLE D'ARTICLES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Media */}
              {article.media[0].type === "video" ? (
                <video
                  src={article.media[0].url}
                  controls
                  muted
                  playsInline
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src={article.media[0].url}
                  alt={article.media[0].alt}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Contenu */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900">{article.title}</h3>
                <p className="text-gray-600 text-sm flex-grow">{article.short}</p>

                {/* Micro UX: Source et badges */}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Source : {article.source}</span>
                  {article.featured && (
                    <span className="bg-yellow-200 px-2 py-0.5 rounded-full text-yellow-800 font-medium text-xs">
                      En vedette
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.media[0].type === "video" && article.download_allowed && (
                    <a
                      href={article.media[0].url}
                      download
                      className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm flex items-center gap-1 hover:bg-gray-800"
                    >
                      <Download size={14} /> Télécharger
                    </a>
                  )}
                  <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-700">
                    <Share2 size={14} /> Lire
                  </button>
                  {article.tags.includes("live") && (
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-700">
                      <Calendar size={14} /> S'inscrire
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
