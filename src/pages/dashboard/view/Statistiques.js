import React, { useState, useMemo } from 'react';
import { BarChart2, PieChart, FileText, Download, Printer } from 'lucide-react';

// Page Statistiques & Rapports
export default function Statistiques() {
  const [period, setPeriod] = useState('month');
  const [reportType, setReportType] = useState('don');
  const [zone, setZone] = useState('');
  const [team, setTeam] = useState('');

  const counters = useMemo(() => ({
    dons: 1250,
    commandes: 87,
    benevoles: 45,
    projets: 12
  }), []);

  function resetFilters(){ setPeriod('month'); setReportType('don'); setZone(''); setTeam(''); }
  function generateReport(){ alert('Génération rapport (placeholder)'); }
  function exportCSV(){ alert('Export CSV (placeholder)'); }
  function exportPDF(){ alert('Export PDF (placeholder)'); }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">📊 Statistiques & Rapports</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Dons: <strong>{counters.dons}</strong></span>
            <span>Commandes: <strong>{counters.commandes}</strong></span>
            <span>Bénévoles: <strong>{counters.benevoles}</strong></span>
            <span>Projets: <strong>{counters.projets}</strong></span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={generateReport} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><FileText size={16}/> Générer rapport</button>
          <button onClick={exportCSV} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Download size={16}/> Export CSV</button>
          <button onClick={exportPDF} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Printer size={16}/> Export PDF</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm flex flex-wrap gap-2">
        <select value={period} onChange={e=>setPeriod(e.target.value)} className="p-2 rounded-md border">
          <option value="day">Jour</option>
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>

        <select value={reportType} onChange={e=>setReportType(e.target.value)} className="p-2 rounded-md border">
          <option value="don">Dons</option>
          <option value="commande">Commandes</option>
          <option value="benevole">Bénévoles</option>
          <option value="projet">Projets</option>
          <option value="finance">Finances</option>
        </select>

        <input value={zone} onChange={e=>setZone(e.target.value)} placeholder="Filtrer par zone" className="p-2 rounded-md border" />
        <input value={team} onChange={e=>setTeam(e.target.value)} placeholder="Filtrer par équipe" className="p-2 rounded-md border" />

        <button onClick={resetFilters} className="px-3 py-2 rounded-md border">Réinitialiser</button>
      </div>

      {/* Layout principal */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Colonne gauche: tableaux et graphiques */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <KpiCard title="Total Dons" value={`${counters.dons} €`} color="green" />
            <KpiCard title="Commandes expédiées" value={counters.commandes} color="green" />
            <KpiCard title="Bénévoles actifs" value={counters.benevoles} color="green" />
            <KpiCard title="Projets en cours" value={counters.projets} color="green" />
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h3 className="font-semibold mb-2">Évolution Dons & Ventes</h3>
            <div className="flex justify-center items-center h-64 text-muted-foreground">Graphique barre/ligne (placeholder)</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <h3 className="font-semibold mb-2">Répartition dons par type</h3>
              <div className="flex justify-center items-center h-48 text-muted-foreground">Graphique camembert (placeholder)</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <h3 className="font-semibold mb-2">Commandes par statut</h3>
              <div className="flex justify-center items-center h-48 text-muted-foreground">Graphique barre (placeholder)</div>
            </div>
          </div>
        </div>

        {/* Colonne droite: rapports prêts et export */}
        <aside className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Rapports prêts</h3>
          <ul className="text-sm space-y-2">
            {['Mensuel', 'Trimestriel', 'Annuel'].map((r,i)=><li key={i} className="flex justify-between items-center"><span>{r}</span><div className="flex gap-1"><button className="px-2 py-1 border rounded-md"><FileText size={14}/> Voir</button><button className="px-2 py-1 border rounded-md"><Printer size={14}/> Imprimer</button><button className="px-2 py-1 border rounded-md"><Download size={14}/> Export</button></div></li>)}
          </ul>
          <button onClick={generateReport} className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-md">+ Générer rapport personnalisé</button>
        </aside>
      </div>
    </div>
  );
}

function KpiCard({ title, value, color }){
  const bg = color==='green'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700';
  return <div className={`${bg} rounded-xl p-4 flex flex-col`}><span className="text-xs font-semibold">{title}</span><span className="text-lg font-bold mt-1">{value}</span></div>;
}
