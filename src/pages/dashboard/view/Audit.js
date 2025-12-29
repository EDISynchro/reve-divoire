import React, { useState, useMemo } from 'react';

// Page Audit & Logs — Lecture seule, accessible admin uniquement
// Objectif : savoir qui a fait quoi

export default function AuditLogs({ user = { role: 'admin' } }) {
  const [userFilter, setUserFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const logs = useMemo(() => sampleLogs(), []);

  const filtered = useMemo(() => logs.filter(l => {
    if (userFilter && !l.user.toLowerCase().includes(userFilter.toLowerCase())) return false;
    if (actionFilter && l.action !== actionFilter) return false;
    if (dateFrom && new Date(l.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(l.date) > new Date(dateTo)) return false;
    return true;
  }), [logs, userFilter, actionFilter, dateFrom, dateTo]);

  function exportLogs(){
    if (user.role !== 'admin') return alert('Accès refusé');
    if (filtered.length === 0) return alert('Aucun log à exporter');
    alert(`Export ${filtered.length} logs (placeholder)`);
  }

  if (user.role !== 'admin') {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-xl font-bold">🔒 Audit & Logs</h1>
        <div className="mt-4 p-4 bg-yellow-50 rounded">Accès réservé aux administrateurs.</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg md:text-2xl font-bold">🕒 Audit & Logs</h1>
        <div className="flex gap-2">
          <button onClick={exportLogs} className="px-3 py-2 rounded-md bg-white border">Exporter</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm flex flex-wrap gap-2">
        <input value={userFilter} onChange={e=>setUserFilter(e.target.value)} placeholder="Utilisateur" className="p-2 rounded-md border" />
        <select value={actionFilter} onChange={e=>setActionFilter(e.target.value)} className="p-2 rounded-md border">
          <option value="">Tous types</option>
          <option value="create">Création</option>
          <option value="update">Modification</option>
          <option value="delete">Suppression</option>
          <option value="login">Connexion</option>
        </select>
        <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="p-2 rounded-md border" />
        <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="p-2 rounded-md border" />
        <button onClick={() => { setUserFilter(''); setActionFilter(''); setDateFrom(''); setDateTo(''); }} className="px-3 py-2 rounded-md border">Réinitialiser</button>
      </div>

      {/* Table logs */}
      <div className="bg-white rounded-xl p-2 shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th className="p-2 text-left">Date / heure</th>
              <th className="p-2">Utilisateur</th>
              <th className="p-2">Action</th>
              <th className="p-2">Module</th>
              <th className="p-2">IP</th>
              <th className="p-2">Détails</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-2">{new Date(l.date).toLocaleString()}</td>
                <td className="p-2">{l.user}</td>
                <td className="p-2">{labelForAction(l.action)}</td>
                <td className="p-2">{l.module}</td>
                <td className="p-2">{l.ip || '—'}</td>
                <td className="p-2 text-xs text-muted-foreground">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun log pour ces filtres.</div>}
      </div>

      <div className="mt-3 text-xs text-muted-foreground">Lecture seule — non modifiable — accès admin uniquement</div>
    </div>
  );
}

/* ===== Helpers & sample data ===== */
function labelForAction(action){
  switch(action){
    case 'create': return 'Création';
    case 'update': return 'Modification';
    case 'delete': return 'Suppression';
    case 'login': return 'Connexion';
    default: return action;
  }
}

function sampleLogs(){
  return [
    { date: '2025-12-13T10:12:00', user: 'Awa', action: 'create', module: 'Inventaire', ip: '197.12.34.56', details: 'Création produit FRP-010' },
    { date: '2025-12-13T11:00:00', user: 'Rachid', action: 'update', module: 'Paramètres', ip: '192.168.0.5', details: 'Changement email principal' },
    { date: '2025-12-12T08:30:00', user: 'Marc', action: 'delete', module: 'Actualités', ip: null, details: 'Suppression article c3' },
    { date: '2025-12-10T09:15:00', user: 'Sita', action: 'login', module: 'Auth', ip: '85.23.11.9', details: 'Connexion réussie' },
  ];
}
