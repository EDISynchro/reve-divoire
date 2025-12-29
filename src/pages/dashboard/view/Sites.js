// SitesPage.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Eye,
  Key,
  MessageSquare,
  FileText,
  MoreHorizontal,
  Trash2,
  Plus,
  Search,
  List,
  Grid,
} from "lucide-react";
import clsx from "clsx";

/* Minimal health colors */
const HEALTH = {
  ok: { color: "bg-emerald-500", label: "OK" },
  warn: { color: "bg-amber-500", label: "Attention" },
  crit: { color: "bg-red-500", label: "Critique" },
};

export default function SitesPage({
  sites = [],
  canAdd = false,
  onAdd = () => { },
  onOpen = (site) => window.open(site.domain.startsWith("http") ? site.domain : `https://${site.domain}`, "_blank"),
  onAdmin = (site) => window.open(site.adminUrl || `/sites/${site.id}/admin`, "_blank"),
  onSupport = (site) => console.info("support", site),
  onBilling = (site) => console.info("billing", site),
  onDelete = async (siteId) => console.info("delete", siteId),
}) {
  // Controls
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | association | boutique | service
  const [statusFilter, setStatusFilter] = useState("all"); // all | online | maintenance | draft
  const [view, setView] = useState("list"); // list | grid
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, site: null });
  const searchRef = useRef(null);

  // Derived summary
  const summary = useMemo(() => {
    const total = sites.length;
    const online = sites.filter(s => s.status === "online").length;
    const maintenance = sites.filter(s => s.status === "maintenance").length;
    return { total, online, maintenance };
  }, [sites]);

  // Filtered list
  const filtered = useMemo(() => {
    return sites
      .filter(s => {
        if (typeFilter !== "all" && s.type !== typeFilter) return false;
        if (statusFilter !== "all" && s.status !== statusFilter) return false;
        if (!q) return true;
        const t = q.toLowerCase();
        return (s.name && s.name.toLowerCase().includes(t)) ||
          (s.domain && s.domain.toLowerCase().includes(t));
      })
      .sort((a, b) => {
        // default order: pinned (manual) -> online first -> priority -> name
        const pa = (a.pinned ? 0 : 1) + (a.status !== "online" ? 1 : 0);
        const pb = (b.pinned ? 0 : 1) + (b.status !== "online" ? 1 : 0);
        if (pa !== pb) return pa - pb;
        if ((a.priority || 0) !== (b.priority || 0)) return (b.priority || 0) - (a.priority || 0);
        return a.name.localeCompare(b.name);
      });
  }, [sites, q, typeFilter, statusFilter]);

  // keyboard: / focuses search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Delete flow helper
  const confirmDelete = (site) => setDeleteModal({ open: true, site });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Sites</h1>
            <p className="text-sm text-gray-500 mt-1">Gérez les sites qui vous appartiennent</p>
            <div className="text-xs text-gray-400 mt-2">
              {summary.total} site{summary.total > 1 ? 's' : ''} • {summary.online} en ligne • {summary.maintenance} en maintenance
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canAdd && (
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-gray-50"
                aria-label="Ajouter un site"
                title="Ajouter un site"
              >
                <Plus className="w-4 h-4" />
                Ajouter un site
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <label className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par nom, domaine..."
            className="w-full bg-white border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Rechercher par nom ou domaine"
          />
        </label>

        <div className="flex items-center gap-2">
          {/* Type chips */}
          <div className="flex gap-1" role="tablist" aria-label="Filtrer par type">
            {["all", "association", "boutique", "service"].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={clsx("px-3 py-1 rounded-md text-sm", typeFilter === t ? "bg-black text-white" : "border bg-white")}
                aria-pressed={typeFilter === t}
              >
                {t === "all" ? "Tous" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filtrer par statut"
            className="border rounded-md px-3 py-1"
          >
            <option value="all">Tous</option>
            <option value="online">En ligne</option>
            <option value="maintenance">Maintenance</option>
            <option value="draft">Brouillon</option>
          </select>

          {/* View toggle */}
          <div className="inline-flex items-center gap-1 border rounded-md p-1">
            <button onClick={() => setView("list")} aria-pressed={view === "list"} title="Vue Liste" className={clsx("p-1", view === "list" && "bg-gray-100 rounded")}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setView("grid")} aria-pressed={view === "grid"} title="Vue Cartes" className={clsx("p-1", view === "grid" && "bg-gray-100 rounded")}>
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <section>
        {filtered.length === 0 ? (
          <div className="border-dashed border rounded-md p-8 text-center text-gray-600">
            <div className="mb-4 text-lg font-semibold">Aucun site pour le moment</div>
            <div className="mb-4">Ajoutez un site pour commencer. Besoin d’aide ? Ouvrez un ticket.</div>
            {canAdd && <button onClick={onAdd} className="px-4 py-2 bg-black text-white rounded-md">Ajouter un site</button>}
          </div>
        ) : view === "list" ? (
          <div className="divide-y border rounded-md overflow-hidden">
            {filtered.map(site => (
              <div key={site.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
            {/* left: symbol */}
<div className="w-21 flex-shrink-0 flex items-center">
  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
    {site.logo ? (
      <img
        src={site.logo}
        alt={`${site.name} logo`}
        className="max-w-full max-h-full object-contain"
      />
    ) : (
      <span className="text-xl font-semibold text-gray-500">
        {site.name.charAt(0)}
      </span>
    )}
  </div>
</div>


                {/* main info */}
                <div className="flex-1 min-w-0">
                  <button onClick={() => setSelected(site)} className="text-left w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{site.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          <a href={site.domain.startsWith('http') ? site.domain : `https://${site.domain}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="underline">
                            {site.domain}
                          </a>
                        </div>
                      </div>

                      <div className="text-right text-xs text-gray-400">
                        <div>{site.last_update ? `Modifié ${site.last_update}` : ""}</div>
                        <div>{site.visits_7d ? `Visites (7j) • ${site.visits_7d}` : ""}</div>
                      </div>
                    </div>
                  </button>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full text-white bg-gray-700">{site.type ? (site.type.charAt(0).toUpperCase() + site.type.slice(1)) : "Site"}</span>

                    <span className={clsx("text-xs px-2 py-0.5 rounded-full", site.status === "online" ? "bg-emerald-100 text-emerald-800" : site.status === "maintenance" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700")}>
                      {site.status === "online" ? "En ligne" : site.status === "maintenance" ? "Maintenance" : "Brouillon"}
                    </span>

                    {/* health indicator */}
                    <div className="flex items-center gap-1 text-xs text-gray-500" title={site.alerts?.length ? site.alerts.join(" • ") : "Aucun problème détecté"}>
                      <span className={clsx("w-3 h-3 rounded-full", (HEALTH[site.health || 'ok'] || HEALTH.ok).color)} aria-hidden="true"></span>
                      <span className="sr-only">Santé: {(HEALTH[site.health || 'ok'] || HEALTH.ok).label}</span>
                      <span className="hidden sm:inline">{site.alerts?.length ? `${site.alerts.length} alerte(s)` : "OK"}</span>
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => onOpen(site)} aria-label={`Voir ${site.name}`} className="p-2 rounded-md hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => onAdmin(site)} aria-label={`Administrer ${site.name}`} className="p-2 rounded-md hover:bg-gray-100">
                    <Key className="w-4 h-4" />
                  </button>
                  <button onClick={() => onSupport(site)} aria-label={`Support ${site.name}`} className="p-2 rounded-md hover:bg-gray-100">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button onClick={() => onBilling(site)} aria-label={`Facturation ${site.name}`} className="p-2 rounded-md hover:bg-gray-100">
                    <FileText className="w-4 h-4" />
                  </button>

                  <div className="relative">
                    <button onClick={() => confirmDelete(site)} aria-label={`Plus d'options pour ${site.name}`} className="p-2 rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* grid/cards */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(site => (
              <article key={site.id} className="border rounded-lg p-4 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {site.logo ? <img src={site.logo} alt={`${site.name} logo`} className="object-contain w-full h-full" /> : <span className="font-semibold">{site.name.charAt(0)}</span>}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold truncate">{site.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      <a href={site.domain.startsWith('http') ? site.domain : `https://${site.domain}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="underline">
                        {site.domain}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-white">{site.type}</span>
                  <span className={clsx("text-xs px-2 py-0.5 rounded-full", site.status === "online" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700")}>
                    {site.status}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <button onClick={() => onOpen(site)} className="p-2 rounded-md hover:bg-gray-100"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => onAdmin(site)} className="p-2 rounded-md hover:bg-gray-100"><Key className="w-4 h-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Delete Modal (simple) */}
      {deleteModal.open && (
        <DeleteModal
          site={deleteModal.site}
          onClose={() => setDeleteModal({ open: false, site: null })}
          onConfirm={async (siteId) => {
            await onDelete(siteId);
            setDeleteModal({ open: false, site: null });
          }}
        />
      )}

      {/* Mobile fixed action bar when a site is selected */}
      {selected && (
        <div className="fixed left-0 right-0 bottom-0 p-3 bg-white border-t flex gap-2 md:hidden">
          <button onClick={() => onOpen(selected)} className="flex-1 py-2 rounded-md bg-black text-white flex items-center justify-center gap-2"><Eye className="w-4 h-4" />Accéder</button>
          <button onClick={() => onAdmin(selected)} className="py-2 px-3 rounded-md border flex items-center gap-2"><Key className="w-4 h-4" />Admin</button>
          <button onClick={() => onSupport(selected)} className="py-2 px-3 rounded-md border flex items-center gap-2"><MessageSquare className="w-4 h-4" />Support</button>
        </div>
      )}
    </div>
  );
}

/* DeleteModal component */
function DeleteModal({ site, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [mustType, setMustType] = useState(true);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-md p-6 z-10 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">Supprimer {site.name}</h2>
        <p className="text-sm text-gray-600 mb-4">La suppression est irréversible. Tapez le nom du site pour confirmer.</p>

        {mustType && (
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={site.name}
            className="w-full border rounded px-3 py-2 mb-3"
            aria-label={`Tapez ${site.name} pour confirmer la suppression`}
          />
        )}

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded-md border">Annuler</button>
          <button
            onClick={() => onConfirm(site.id)}
            disabled={mustType && confirmText !== site.name}
            className="px-3 py-2 rounded-md bg-red-600 text-white disabled:opacity-50"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

SitesPage.propTypes = {
  sites: PropTypes.array,
  canAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onOpen: PropTypes.func,
  onAdmin: PropTypes.func,
  onSupport: PropTypes.func,
  onBilling: PropTypes.func,
  onDelete: PropTypes.func,
};
