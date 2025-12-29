import React, { useState, useMemo } from 'react';
import { Download, Users, CreditCard, FileText, Search, Mail, PieChart, AlertTriangle } from 'lucide-react';

// Page Donateurs & Finances
// Objectif : suivre l’argent, gérer les donateurs, être carré

export default function DonateursFinances({ user = { role: 'equipe' } }) {
  const [tab, setTab] = useState('donateurs');
  const [q, setQ] = useState('');
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [donors] = useState(sampleDonors());
  const [donations] = useState(sampleDonations());
  const [receipts, setReceipts] = useState(sampleReceipts());
  const [viewDonor, setViewDonor] = useState(null);
  const [viewDonation, setViewDonation] = useState(null);

  const totals = useMemo(() => {
    const monthTotal = donations.filter(d => isThisMonth(d.date)).reduce((s,r)=>s+r.amount,0);
    const yearTotal = donations.filter(d => isThisYear(d.date)).reduce((s,r)=>s+r.amount,0);
    const donorsCount = new Set(donations.map(d=>d.donorId)).size;
    const receiptsToSend = receipts.filter(r=>r.status==='to_generate' || r.status==='generated').length;
    return { monthTotal, yearTotal, donorsCount, receiptsToSend };
  }, [donations, receipts]);

  function exportCSV(){ if(!isAdmin()) return alert('Accès réservé'); alert('Export CSV (placeholder)'); }

  function isAdmin(){ return ['admin','finance'].includes(user.role); }

  function generateReceipt(id){
    setReceipts(prev => prev.map(r => r.id===id ? {...r, status: 'generated'} : r));
    alert('Reçu généré (placeholder)');
  }

  function sendReceipt(id){
    setReceipts(prev => prev.map(r => r.id===id ? {...r, status: 'sent'} : r));
    alert('Reçu envoyé (placeholder)');
  }

  const filteredDonors = donors.filter(d => !q || `${d.firstName} ${d.lastName}`.toLowerCase().includes(q.toLowerCase()));
  const filteredDonations = donations.filter(d => {
    if (q && !(d.id.toLowerCase().includes(q.toLowerCase()) || d.name.toLowerCase().includes(q.toLowerCase()))) return false;
    if (periodFrom && new Date(d.date) < new Date(periodFrom)) return false;
    if (periodTo && new Date(d.date) > new Date(periodTo)) return false;
    return true;
  });

  const topDonors = [...donors].sort((a,b)=> donorTotal(b.id, donations) - donorTotal(a.id, donations)).slice(0,5);

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">💖 Donateurs & Finances</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Total dons (mois): <strong>{formatMoney(totals.monthTotal)}</strong></span>
            <span>Total dons (année): <strong>{formatMoney(totals.yearTotal)}</strong></span>
            <span>Donateurs: <strong>{totals.donorsCount}</strong></span>
            <span>Reçus à traiter: <strong>{totals.receiptsToSend}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={exportCSV} className={`px-4 py-2 rounded-lg ${isAdmin() ? 'bg-white border' : 'bg-gray-100 text-muted-foreground'}`}><Download size={16}/> Exporter</button>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex gap-2 items-center mb-4">
          <Tab label="👥 Donateurs" keyName="donateurs" active={tab==='donateurs'} onClick={()=>setTab('donateurs')} />
          <Tab label="💳 Dons" keyName="dons" active={tab==='dons'} onClick={()=>setTab('dons')} />
          <Tab label="📄 Reçus fiscaux" keyName="receipts" active={tab==='receipts'} onClick={()=>setTab('receipts')} />
        </div>

        {/* Contenu onglet */}
        <div>
          {tab === 'donateurs' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche nom / email" className="flex-1 p-2 rounded-md border" />
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Mail size={16}/> Contacter</button>
                </div>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr><th className="p-2 text-left">Nom</th><th className="p-2">Email</th><th className="p-2">Total donné</th><th className="p-2">Dernier don</th><th className="p-2">Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredDonors.map(d=> (
                      <tr key={d.id} className="border-t">
                        <td className="p-2">{d.firstName} {d.lastName}</td>
                        <td className="p-2 text-xs text-muted-foreground">{d.email || <span className="text-red-600">(pas d'email)</span>}</td>
                        <td className="p-2">{formatMoney(donorTotal(d.id, donations))}</td>
                        <td className="p-2 text-center">{lastDonationDate(d.id, donations) || '—'}</td>
                        <td className="p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button onClick={()=>setViewDonor(d)} className="p-2 rounded-md hover:bg-gray-100">👁 Voir fiche</button>
                            <button onClick={()=>alert('Email (placeholder)')} className="p-2 rounded-md hover:bg-gray-100">✉️ Contacter</button>
                            <button onClick={()=>alert('Historique (placeholder)')} className="p-2 rounded-md hover:bg-gray-100">📄 Historique</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'dons' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche donateur / id" className="flex-1 p-2 rounded-md border" />
                </div>
                <div className="flex gap-2">
                  <input type="date" value={periodFrom} onChange={e=>setPeriodFrom(e.target.value)} className="p-2 rounded-md border" />
                  <input type="date" value={periodTo} onChange={e=>setPeriodTo(e.target.value)} className="p-2 rounded-md border" />
                  <button onClick={()=>alert('Export CSV dons (placeholder)')} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Download size={16}/> Export CSV</button>
                </div>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr><th className="p-2">Date</th><th className="p-2">Donateur</th><th className="p-2">Montant</th><th className="p-2">Moyen</th><th className="p-2">Statut</th><th className="p-2">Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map(d=> (
                      <tr key={d.id} className="border-t">
                        <td className="p-2">{d.date}</td>
                        <td className="p-2">{d.name}</td>
                        <td className="p-2">{formatMoney(d.amount)}</td>
                        <td className="p-2">{d.method}</td>
                        <td className="p-2"><StatusDonation status={d.status} /></td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button onClick={()=>setViewDonation(d)} className="p-2 rounded-md hover:bg-gray-100">Voir</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'receipts' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={()=>alert('Générer tous (placeholder)')} className="px-3 py-2 rounded-md bg-white border">Générer reçu</button>
                <button onClick={()=>alert('Envoyer tous (placeholder)')} className="px-3 py-2 rounded-md bg-white border">Envoyer par email</button>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr><th className="p-2">Donateur</th><th className="p-2">Année</th><th className="p-2">Montant</th><th className="p-2">Statut</th><th className="p-2">Actions</th></tr>
                  </thead>
                  <tbody>
                    {receipts.map(r=> (
                      <tr key={r.id} className="border-t">
                        <td className="p-2">{r.name}</td>
                        <td className="p-2">{r.year}</td>
                        <td className="p-2">{formatMoney(r.amount)}</td>
                        <td className="p-2">{r.status === 'to_generate' ? 'À générer' : r.status === 'generated' ? 'Généré' : 'Envoyé'}</td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button onClick={()=>generateReceipt(r.id)} className="p-2 rounded-md hover:bg-gray-100">Générer</button>
                            <button onClick={()=>sendReceipt(r.id)} className="p-2 rounded-md hover:bg-gray-100">Envoyer</button>
                            <button onClick={()=>alert('Téléchargement PDF (placeholder)')} className="p-2 rounded-md hover:bg-gray-100">Télécharger</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bloc latéral résumé financier */}
      <div className="grid md:grid-cols-3 gap-4">
        <aside className="md:col-span-1 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Résumé financier</h3>
          <div className="text-sm mb-3">Dons par mois</div>
          <div className="h-24 flex items-center justify-center text-xs text-muted-foreground">Mini-graphique</div>
          <div className="mt-3">
            <div className="text-sm font-semibold">Top 5 donateurs</div>
            <ol className="text-sm mt-2 space-y-1">
              {topDonors.map(d=> (
                <li key={d.id}>{d.firstName} {d.lastName} — {formatMoney(donorTotal(d.id, donations))}</li>
              ))}
            </ol>
            <div className="mt-3 text-sm">Moyenne don: {formatMoney(avgDonation(donations))}</div>
          </div>
        </aside>

        {/* Alertes & conformité */}
        <aside className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Alertes & conformité</h3>
          <div className="space-y-2 text-sm">
            {donations.filter(d=>d.status==='pending').length>0 && <div className="flex items-center gap-2 p-2 rounded-md bg-orange-50"><AlertTriangle size={16}/> Dons en attente</div>}
            {donations.filter(d=>!d.email).length>0 && <div className="flex items-center gap-2 p-2 rounded-md bg-red-50"><AlertTriangle size={16}/> Donateurs sans email</div>}
            {receipts.filter(r=>r.status!=='sent').length>0 && <div className="flex items-center gap-2 p-2 rounded-md bg-orange-50"><AlertTriangle size={16}/> Reçus à générer / envoyer</div>}
          </div>
        </aside>
      </div>

      {/* Modals */}
      {viewDonor && <DonorModal donor={viewDonor} donations={donations.filter(d=>d.donorId===viewDonor.id)} onClose={()=>setViewDonor(null)} />}
      {viewDonation && <DonationModal donation={viewDonation} onClose={()=>setViewDonation(null)} />}

    </div>
  );
}

/* ===== Components ===== */
function Tab({ label, active, onClick }){
  return <button onClick={onClick} className={`px-3 py-2 rounded-md ${active ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{label}</button>;
}

function StatusDonation({ status }){
  if(status==='ok') return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">Réussi</span>;
  if(status==='pending') return <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs">En attente</span>;
  return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">—</span>;
}

function DonorModal({ donor, donations, onClose }){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Fiche: {donor.firstName} {donor.lastName}</h3><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm">Email: {donor.email || '—'}</div>
            <div className="text-sm">Téléphone: {donor.phone || '—'}</div>
            <div className="text-sm mt-2">Total donné: {formatMoney(donorTotal(donor.id, donations))}</div>
            <button onClick={()=>alert('Envoyer reçu (placeholder)')} className="mt-3 px-3 py-2 rounded-md bg-blue-600 text-white">Envoyer reçu fiscal</button>
          </div>
          <div>
            <div className="text-sm font-semibold">Historique des dons</div>
            <ol className="text-sm mt-2 space-y-1">
              {donations.map(d=> <li key={d.id}>{d.date} — {formatMoney(d.amount)} — {d.method}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonationModal({ donation, onClose }){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Don {donation.id}</h3><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
        <div className="text-sm">Donateur: {donation.name}</div>
        <div className="text-sm">Montant: {formatMoney(donation.amount)}</div>
        <div className="text-sm">Date: {donation.date}</div>
        <div className="text-sm">Moyen: {donation.method}</div>
      </div>
    </div>
  );
}

/* ===== Helpers & sample data ===== */
function formatMoney(n){ return n.toLocaleString('fr-FR', {style:'currency', currency:'EUR', minimumFractionDigits:0}); }
function isThisMonth(d){ const dt=new Date(d); const now=new Date(); return dt.getMonth()===now.getMonth() && dt.getFullYear()===now.getFullYear(); }
function isThisYear(d){ return new Date(d).getFullYear() === new Date().getFullYear(); }
function donorTotal(donorId, donations){ return donations.filter(d=>d.donorId===donorId).reduce((s,r)=>s+r.amount,0); }
function lastDonationDate(donorId, donations){ const ds = donations.filter(d=>d.donorId===donorId).sort((a,b)=> new Date(b.date)-new Date(a.date)); return ds[0]?.date || null; }
function avgDonation(donations){ if(donations.length===0) return 0; return Math.round(donations.reduce((s,d)=>s+d.amount,0)/donations.length); }

function sampleDonors(){
  return [
    {id:'d1', firstName:'Awa', lastName:'K', email:'awa@example.com', phone:'070000000'},
    {id:'d2', firstName:'Marc', lastName:'L', email:'marc@example.com', phone:''},
    {id:'d3', firstName:'Sita', lastName:'R', email:'', phone:'072222222'},
  ];
}

function sampleDonations(){
  return [
    {id:'don1', donorId:'d1', name:'Awa K', amount:50, date:'2025-12-10', method:'CB', status:'ok', email:'awa@example.com'},
    {id:'don2', donorId:'d2', name:'Marc L', amount:20, date:'2025-11-05', method:'Virement', status:'ok', email:'marc@example.com'},
    {id:'don3', donorId:'d3', name:'Sita R', amount:10, date:'2025-12-01', method:'CB', status:'pending', email:''},
  ];
}

function sampleReceipts(){
  return [
    {id:'r1', donorId:'d1', name:'Awa K', year:2025, amount:120, status:'generated'},
    {id:'r2', donorId:'d2', name:'Marc L', year:2025, amount:80, status:'to_generate'},
  ];
}
