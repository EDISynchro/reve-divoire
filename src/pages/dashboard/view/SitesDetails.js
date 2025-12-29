// SiteDetails.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ExternalLink, Key, Zap, Database, Users, FileText } from "lucide-react";

export default function SiteDetails({ siteId, fetchSite, onBack }) {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const s = await fetchSite(siteId); // should return site full object
      if (mounted) setSite(s);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, [siteId, fetchSite]);

  if (loading) return <div className="p-6">Chargement…</div>;
  if (!site) return <div className="p-6">Site introuvable</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">Détails</div>
          <h1 className="text-2xl font-semibold">{site.name}</h1>
          <div className="text-xs text-gray-500">{site.domain}</div>
        </div>

        <div className="flex items-center gap-2">
          <a href={site.domain.startsWith('http')?site.domain:`https://${site.domain}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 border rounded-md inline-flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Accéder
          </a>
          <a href={site.adminUrl || '#'} target="_blank" rel="noreferrer" className="px-3 py-1.5 border rounded-md inline-flex items-center gap-2">
            <Key className="w-4 h-4" /> Admin
          </a>
        </div>
      </header>

      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: summary health */}
        <section className="space-y-3">
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Résumé santé</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Uptime: <strong>{site.uptime ?? "—"}</strong></li>
              <li>SSL: <strong>{site.ssl_expiry ? `exp : ${site.ssl_expiry}` : "—"}</strong></li>
              <li>Dernière sauvegarde: <strong>{site.last_backup ?? "—"}</strong></li>
              <li>Alertes récentes: <strong>{site.alerts?.length || 0}</strong></li>
            </ul>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Performances rapides</h3>
            <div className="text-sm text-gray-700">
              <div>Visites (7j): <strong>{site.visits_7d ?? 0}</strong></div>
              {site.type === "boutique" && <div>Conversions (7j): <strong>{site.conversions_7d ?? 0}</strong></div>}
            </div>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Actions rapides</h3>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border rounded inline-flex items-center gap-2"><Zap className="w-4 h-4" /> Publier</button>
              <button className="flex-1 px-3 py-2 border rounded inline-flex items-center gap-2"><Database className="w-4 h-4" /> Sauvegarder</button>
            </div>
          </div>
        </section>

        {/* Right: collaborators, billing, logs */}
        <section className="space-y-3">
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Collaborateurs & permissions</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">{site.owner?.email || "—"} <small className="text-xs text-gray-500">owner</small></div>
              <button className="px-3 py-1 border rounded inline-flex items-center gap-2"><Users className="w-4 h-4" /> Inviter</button>
            </div>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Facturation & plan</h3>
            <div className="text-sm text-gray-700">Plan: <strong>{site.plan_id ?? "Basique"}</strong></div>
            <div className="text-sm text-gray-700">Prochaine échéance: <strong>{site.next_invoice ?? "—"}</strong></div>
            <div className="mt-2"><a className="text-sm underline inline-flex items-center gap-2" href="#invoices"><FileText className="w-4 h-4" /> Voir factures</a></div>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Historique & logs (10 dernières actions)</h3>
            <ul className="text-sm text-gray-700 space-y-1 max-h-44 overflow-auto">
              {site.logs?.slice(0,10).map((l,idx) => (
                <li key={idx} className="text-xs text-gray-600">
                  <strong>{l.when}</strong> — {l.actor} — {l.action}
                </li>
              )) || <li className="text-xs text-gray-600">Aucun log</li>}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

SiteDetails.propTypes = {
  siteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fetchSite: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};
