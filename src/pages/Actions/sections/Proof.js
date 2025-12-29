import React from "react";
import { Play, Download, Mail, ExternalLink, FileText, Image as ImageIcon } from "lucide-react";

/*
 SectionImpactPreuves.js
 Section "Impact & preuves"

 Objectif simple :
 Montrer ce qui a été fait, avec des preuves vérifiables.
 Médias, documents et accès au suivi — rien de flou.
*/

export default function SectionImpactPreuves({
  dashboardHref = "/dashboard",
  contactEmail = "frip2reve@gmail.com",
}) {
  return (
    <section className="bg-gray-50 py-16" id="impact-preuves">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Impact & preuves — ce qu’on a fait et comment vérifier
          </h2>
          <p className="mt-3 text-gray-700">
            Chaque action est documentée : photos, vidéos, rapports et fiches projet — transparence
            et traçabilité sont au cœur de notre travail.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            Tu veux savoir exactement où va ton soutien ? Ici tu trouveras les médias envoyés, les
            rapports et le lien vers le tableau de bord de suivi. Si un document manque, il est indiqué
            « en cours de validation ».
          </p>
        </div>

        {/* Grid 3 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne 1 — Médias */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Médias & galerie</h3>

            <div className="rounded-md overflow-hidden bg-gray-100 mb-4">
              <button className="relative w-full h-40 flex items-center justify-center text-gray-700">
                <Play size={32} />
                <span className="sr-only">Lire la vidéo de présentation</span>
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Photos originales fournies par Natacha — sélection en cours.
            </p>

            <div className="flex flex-wrap gap-2">
              <a href="/medias" className="text-sm font-medium underline">
                Voir la galerie
              </a>
              <a href="/api/media/export" className="text-sm font-medium underline">
                Télécharger l’archive médias
              </a>
              <a href={`mailto:${contactEmail}`} className="text-sm font-medium underline">
                Proposer un visuel
              </a>
            </div>
          </div>

          {/* Colonne 2 — Rapports */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Rapports & comptes</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FileText size={16} />
                <div>
                  <p className="font-medium">Rapport d’activité 2024</p>
                  <p className="text-gray-500">PDF — en cours de validation</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FileText size={16} />
                <div>
                  <p className="font-medium">Compte Frip2Rêve</p>
                  <p className="text-gray-500">Inventaire & ventes — PDF</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FileText size={16} />
                <div>
                  <p className="font-medium">Registre de collecte</p>
                  <p className="text-gray-500">Données internes — accès sur demande</p>
                </div>
              </li>
            </ul>

            <p className="mt-4 text-xs text-gray-600">
              Les documents fournis permettent de retracer l’utilisation des fonds et l’impact des
              actions.
            </p>

            <div className="mt-4 flex gap-3">
              <a href="/rapports" className="text-sm font-medium underline">
                Télécharger les rapports
              </a>
              <a href={`mailto:${contactEmail}`} className="text-sm font-medium underline">
                Demander une preuve
              </a>
            </div>
          </div>

          {/* Colonne 3 — Dashboard */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Suivi & tableau de bord</h3>

            <p className="text-sm text-gray-600 mb-3">
              Tableau de bord : inventaire Frip2Rêve, suivi des campagnes et calendrier des lives.
            </p>

            <a
              href={dashboardHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium"
            >
              Voir le tableau de bord
              <ExternalLink size={14} />
            </a>

            <p className="mt-3 text-xs text-gray-600">
              Tableau de bord prêt — accès sur demande.
            </p>

            <div className="mt-4 text-sm">
              <p className="font-medium">Contacts rapides</p>
              <a href={`mailto:${contactEmail}`} className="underline">
                Natacha — {contactEmail}
              </a>
              <p className="mt-1">
                Pasteur Nelson — vCard disponible
              </p>
            </div>
          </div>
        </div>

        {/* Note transparence */}
        <p className="mt-10 text-sm text-gray-600">
          Si un document n’est pas encore en ligne, il est en cours de validation — contacte-nous à
          <a href={`mailto:${contactEmail}`} className="underline ml-1">
            {contactEmail}
          </a>.
        </p>
      </div>
    </section>
  );
}
