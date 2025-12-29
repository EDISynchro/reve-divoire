import React, { useState, useEffect } from "react";
import { BarChart2, ArrowRight, DownloadCloud } from "lucide-react";

// Section "Impact mesuré" — .js standard, React pur, prêt prod

export default function ImpactMesureSection() {
  const [openModal, setOpenModal] = useState(null); // null | 'methodo' | { type: 'project', id }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenModal(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* -------------------------
     Données
  -------------------------- */
  const stats = [
    {
      id: "children",
      value: "520+",
      label: "Enfants accompagnés",
      note: "Mesures : suivi individuel, présences scolaires.",
      dataSource: "SuiviProjet_2024"
    },
    {
      id: "clothes",
      value: "4 200 kg",
      label: "Vêtements revalorisés",
      note: "Mesure : kg collectés et remis en vente ou redistribués.",
      dataSource: "Collecte_Frip2Reve_2024"
    },
    {
      id: "schools",
      value: "10",
      label: "Écoles soutenues",
      note: "Mesure : fournitures distribuées + activités pédagogiques.",
      dataSource: "Projets_Ecoles_2024"
    }
  ];

  const miniCases = [
    {
      id: 1,
      title: "Bibliothèque villageoise",
      before: "0 livre",
      after: "Bibliothèque publique et ateliers hebdomadaires",
      img: "/images/biblio-avant-apres.jpg",
      alt: "Avant/après bibliothèque villageoise — enfants lisant",
      proof: ["Photos avant/après", "Liste des ouvrages", "Fréquentation mensuelle"]
    },
    {
      id: 2,
      title: "Kits scolaires — 3 écoles",
      before: "Présences irrégulières",
      after: "Kits + sessions pédagogiques, assiduité renforcée",
      img: "/images/kits-scolaires.jpg",
      alt: "Distribution de kits scolaires — enfants recevant des fournitures",
      proof: ["Rapport projet", "Témoignage enseignant"]
    }
  ];

  const testimonial = {
    quote: "Grâce au kit scolaire, ma fille va à l’école tous les jours.",
    author: "Fatoumata — bénéficiaire",
    metric: "+32 % d’assiduité mesurée sur 6 mois"
  };

  /* -------------------------
     UI
  -------------------------- */
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="bg-white py-16 px-4 sm:px-6 lg:px-8"
      role="region"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <h2
            id="impact-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Impact mesuré
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Chiffres simples, mini-cas concrets et preuves terrain pour chaque action soutenue.
          </p>
        </header>

        {/* Chiffres clés */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <article
              key={s.id}
              className="bg-gray-50 rounded-lg p-6 text-center shadow-sm"
              data-source={s.dataSource}
            >
              <BarChart2 className="mx-auto mb-3 w-6 h-6 text-[#7B2D2D]" />

              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {s.value}
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {s.label}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {s.note}
              </p>

              <p className="mt-3 text-[11px] text-gray-400">
                Données vérifiables — rapports et photos disponibles sur demande
              </p>
            </article>
          ))}
        </div>

        {/* Mini-cas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {miniCases.map((c) => (
              <article
                key={c.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={c.img}
                  alt={c.alt}
                  className="w-full h-40 object-cover rounded-md"
                />

                <div className="mt-3 flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {c.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    <strong>Avant :</strong> {c.before}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Après :</strong> {c.after}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#7B2D2D] text-white text-sm font-medium rounded-lg shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#7B2D2D]/50"
                  onClick={() => setOpenModal({ type: "project", id: c.id })}
                  aria-label={`Voir le projet ${c.title}`}
                >
                  Voir le projet
                  <ArrowRight className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>

          {/* Témoignage + transparence */}
          <aside className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-6 shadow-md flex flex-col justify-between">
            <div>
              <blockquote className="italic text-gray-800">
                “{testimonial.quote}”
              </blockquote>
              <p className="mt-3 text-sm text-gray-600">
                — {testimonial.author}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#7B2D2D]">
                {testimonial.metric}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href="/pdfs/rapport-2024.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium underline"
                aria-label="Télécharger le rapport 2024"
              >
                <DownloadCloud className="w-4 h-4" />
                Télécharger le rapport 2024 (PDF)
              </a>

              <button
                type="button"
                className="block text-sm text-[#7B2D2D] font-medium"
                onClick={() => setOpenModal("methodo")}
              >
                Voir la méthodologie
              </button>

              <a
                href="/galerie"
                className="block text-sm text-gray-600 hover:underline"
              >
                Voir la galerie photos / témoignages
              </a>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="/soutenir"
            className="inline-block w-full sm:w-auto bg-[#7B2D2D] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D2D]/50"
            aria-label="Soutenir un projet concret — Rêve d’Ivoire"
          >
            Soutenir un projet concret
          </a>
          <p className="mt-2 text-xs text-gray-500">
            Choisissez un projet et suivez son avancement.
          </p>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenModal(null)}
          />

          <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 z-10">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setOpenModal(null)}
              aria-label="Fermer"
            >
              ✕
            </button>

            {openModal === "methodo" && (
              <>
                <h3 className="text-xl font-bold text-[#7B2D2D]">
                  Méthodologie & sources
                </h3>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  Les indicateurs sont issus des registres projet, feuilles de présence
                  et bilans de collecte. Chaque chiffre est traçable par projet.
                </p>
              </>
            )}

            {openModal.type === "project" && (() => {
              const project = miniCases.find(p => p.id === openModal.id);
              if (!project) return null;

              return (
                <>
                  <h3 className="text-xl font-bold text-[#7B2D2D]">
                    {project.title}
                  </h3>
                  <img
                    src={project.img}
                    alt={project.alt}
                    className="w-full h-48 object-cover rounded-md mt-4"
                  />
                  <p className="mt-3 text-sm"><strong>Avant :</strong> {project.before}</p>
                  <p className="text-sm"><strong>Après :</strong> {project.after}</p>
                  <p className="mt-3 text-sm text-gray-600">
                    Preuves : {project.proof.join(", ")}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
