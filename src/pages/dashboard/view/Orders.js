import React, { useState, useMemo } from 'react';
import { Eye, Printer, Truck, Search, FileMinus, Download, Calendar, AlertTriangle } from 'lucide-react';

// Commandes & Envois — Page

export default function Commandes() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [point, setPoint] = useState('');
  const [orders, setOrders] = useState(sampleOrders());
  const [selected, setSelected] = useState(new Set());
  const [viewing, setViewing] = useState(null);

  const filtered = useMemo(() => orders.filter(o => {
    if (query && !(`${o.number} ${o.client.name}`.toLowerCase().includes(query.toLowerCase()))) return false;
    if (status && o.status !== status) return false;
    if (point && o.point !== point) return false;
    if (dateFrom && new Date(o.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(o.date) > new Date(dateTo)) return false;
    return true;
  }), [orders, query, status, point, dateFrom, dateTo]);

  function toggleSelect(id){
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  }

  function resetFilters(){ setQuery(''); setStatus(''); setDateFrom(''); setDateTo(''); setPoint(''); }

  function markShipped(id){
    if(!window.confirm('Marquer comme expédiée ?')) return;
    setOrders(prev => prev.map(o => o.id===id ? {...o, status: 'shipped'} : o));
  }

  function bulkMarkShipped(){
    if(selected.size===0) return alert('Aucune commande sélectionnée');
    if(!window.confirm('Marquer les commandes sélectionnées comme expédiées ?')) return;
    setOrders(prev => prev.map(o => selected.has(o.id) ? {...o, status: 'shipped'} : o));
    setSelected(new Set());
  }

  function bulkPrint(){ if(selected.size===0) return alert('Aucune commande sélectionnée'); alert('Impression lancée (placeholder)'); }
  function exportCSV(){ alert('Export CSV (placeholder)'); }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">🧾 Commandes & Envois</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Nouvelles: <strong>{orders.filter(o=>o.status==='new').length}</strong></span>
            <span>À préparer: <strong>{orders.filter(o=>o.status==='preparing').length}</strong></span>
            <span>À expédier: <strong>{orders.filter(o=>o.status==='shipped' || o.status==='preparing').length}</strong></span>
            <span>Terminées: <strong>{orders.filter(o=>o.status==='delivered').length}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={exportCSV} className="px-4 py-2 rounded-lg bg-white border flex items-center gap-2"><Download size={16}/> Exporter</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Recherche (n° commande / client)" className="flex-1 p-2 rounded-md border" />
          </div>

          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="paid">Paiement reçu</option>
            <option value="preparing">En préparation</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="problem">Problème</option>
          </select>

          <div className="flex gap-2">
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="p-2 rounded-md border" />
            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="p-2 rounded-md border" />
          </div>

          <select value={point} onChange={e=>setPoint(e.target.value)} className="p-2 rounded-md border">
            <option value="">Point retrait / Livraison</option>
            <option>Point A</option>
            <option>Point B</option>
          </select>

          <button onClick={resetFilters} className="px-3 py-2 rounded-md border">Réinitialiser</button>
        </div>
      </div>

      {/* Actions groupées */}
      <div className="flex gap-2 mb-3">
        <button onClick={bulkPrint} className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Printer size={16}/> Imprimer</button>
        <button onClick={bulkMarkShipped} className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Truck size={16}/> Marquer expédiée</button>
        <button onClick={exportCSV} className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Download size={16}/> Export CSV</button>
      </div>

      {/* Table commandes */}
      <div className="bg-white rounded-xl p-2 shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th className="p-2"></th>
              <th className="p-2 text-left">N° commande</th>
              <th className="p-2">Date</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2">Articles</th>
              <th className="p-2">Total</th>
              <th className="p-2">Livraison</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-2 text-center"><input type="checkbox" checked={selected.has(o.id)} onChange={()=>toggleSelect(o.id)} /></td>
                <td className="p-2">{o.number}</td>
                <td className="p-2 text-center">{new Date(o.date).toLocaleDateString()}</td>
                <td className="p-2">{o.client.name}<div className="text-xs text-muted-foreground">{o.client.email}</div></td>
                <td className="p-2 text-center">{o.items.length}</td>
                <td className="p-2 text-center">{o.total} €</td>
                <td className="p-2 text-center">{o.point}</td>
                <td className="p-2 text-center"><StatusBadge status={o.status} /></td>
                <td className="p-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={()=>setViewing(o)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Eye size={16}/> Voir</button>
                    <button onClick={()=>window.print()} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Printer size={16}/> Imprimer</button>
                    <button onClick={()=>markShipped(o.id)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Truck size={16}/> Expédiée</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucune commande trouvée.</div>}
      </div>

      {/* Sidebar alertes */}
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <aside className="md:col-span-1 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Alertes & priorités</h3>
          <div className="space-y-3 text-sm">
            {orders.filter(o=>daysSince(o.date) > 2 && o.status !== 'delivered').map(o => (
              <div key={o.id} className="flex items-center justify-between p-2 rounded-md bg-red-50">
                <div className="flex items-center gap-2"><AlertTriangle size={16}/><div><div className="text-sm">{o.number}</div><div className="text-xs text-muted-foreground">{o.client.name} — {daysSince(o.date)}j</div></div></div>
                <button className="text-sm text-blue-600">Voir</button>
              </div>
            ))}

            <div className="mt-3">
              <button className="text-sm text-blue-600">Voir tout</button>
            </div>
          </div>
        </aside>

        <aside className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Historique & traçabilité</h3>
          <div className="text-sm text-muted-foreground">Liste de toutes les actions clés sur les commandes (création, paiement, envoi) et notes internes disponibles dans la page détail.</div>
        </aside>
      </div>

      {/* Modal détail commande */}
      {viewing && (
        <OrderModal order={viewing} onClose={()=>setViewing(null)} onUpdate={(u)=>{ setOrders(prev => prev.map(o => o.id===u.id ? u : o)); setViewing(u); }} />
      )}
    </div>
  );
}

/* ===== Helpers & Components ===== */

function StatusBadge({ status }){
  const map = {
    new: {label: 'Nouveau', className: 'bg-blue-100 text-blue-700'},
    paid: {label: 'Paiement reçu', className: 'bg-blue-100 text-blue-700'},
    preparing: {label: 'En préparation', className: 'bg-orange-100 text-orange-700'},
    shipped: {label: 'Expédiée', className: 'bg-violet-100 text-violet-700'},
    delivered: {label: 'Livrée', className: 'bg-green-100 text-green-700'},
    problem: {label: 'Problème', className: 'bg-red-100 text-red-700'},
  };
  const s = map[status] || {label: status, className: 'bg-gray-100 text-gray-700'};
  return <span className={`px-3 py-1 rounded-md text-xs ${s.className}`}>{s.label}</span>;
}

function OrderModal({ order, onClose, onUpdate }){
  const [o, setO] = useState({...order});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-3xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Commande {o.number}</h3>
          <div className="flex gap-2">
            <button onClick={()=>window.print()} className="px-3 py-1 rounded-md border">Imprimer</button>
            <button onClick={()=>alert('Email envoyé (placeholder)')} className="px-3 py-1 rounded-md border">Envoyer mail client</button>
            <button onClick={()=>{ if(window.confirm('Annuler la commande ?')){ setO({...o, status:'problem'}); onUpdate({...o, status:'problem'}); }}} className="px-3 py-1 rounded-md bg-red-600 text-white">Annuler</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm">Infos client</h4>
            <div className="text-sm mt-2">
              <div>{o.client.name}</div>
              <div className="text-xs text-muted-foreground">{o.client.email} • {o.client.phone}</div>
              <div className="mt-2 text-sm">{o.client.address}</div>
            </div>

            <h4 className="font-semibold text-sm mt-4">Livraison</h4>
            <div className="text-sm mt-2">Type: {o.shipping.type}</div>
            <div className="text-sm">Transporteur: {o.shipping.carrier || '—'}</div>
            <div className="text-sm">N° suivi: {o.shipping.tracking || '—'}</div>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Infos commande</h4>
            <div className="mt-2 space-y-2">
              {o.items.map(it => (
                <div key={it.id} className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden"><img src={it.photo || ''} alt="" className="w-full h-full object-cover"/></div>
                  <div className="flex-1 text-sm">{it.name} <div className="text-xs text-muted-foreground">{it.size} — {it.price} €</div></div>
                  <div className="text-sm">x{it.qty}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm font-semibold">Total: {o.total} €</div>
            <div className="mt-2 text-sm">Paiement: {o.payment === true ? 'OK' : 'En attente'}</div>

            <div className="mt-4 flex gap-2">
              <select value={o.status} onChange={e=>{ setO({...o, status: e.target.value}); onUpdate({...o, status: e.target.value}); }} className="p-2 rounded-md border">
                <option value="new">Nouveau</option>
                <option value="paid">Paiement reçu</option>
                <option value="preparing">En préparation</option>
                <option value="shipped">Expédiée</option>
                <option value="delivered">Livrée</option>
                <option value="problem">Problème</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">Historique: {o.history?.map(h=>`${h.date} — ${h.text}`).join(' • ')}</div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Utilities & sample data ===== */

function daysSince(d){
  const diff = (Date.now() - new Date(d).getTime()) / (1000*60*60*24);
  return Math.floor(diff);
}

function sampleOrders(){
  return [
    { id:'o1', number: 'CMD-2025-1001', date: '2025-12-10', client: {name: 'Awa K', email: 'awa@example.com', phone: '07 00 00 00', address: '10 rue A, Abidjan'}, items: [{id:'i1', name:'Robe rouge', size:'M', price:12, qty:1}], total:12, point:'Point A', status:'new', payment:true, shipping:{type:'retrait', carrier:null, tracking:null}, history:[{date:'10/12/2025', text:'Créée'}] },
    { id:'o2', number: 'CMD-2025-1000', date: '2025-12-08', client: {name: 'Marc L', email: 'marc@example.com', phone: '07 11 11 11', address: '20 rue B'}, items: [{id:'i2', name:'Basket sport', size:'42', price:20, qty:1}], total:20, point:'Point B', status:'preparing', payment:true, shipping:{type:'colis', carrier:'LaPoste', tracking:null}, history:[{date:'08/12/2025', text:'Paiement reçu'}] },
    { id:'o3', number: 'CMD-2025-0999', date: '2025-12-05', client: {name: 'Sita R', email: 'sita@example.com', phone: '07 22 22 22', address: '30 rue C'}, items: [{id:'i3', name:'Echarpe', size:'one', price:6, qty:2}], total:12, point:'Point A', status:'shipped', payment:true, shipping:{type:'colis', carrier:'DHL', tracking:'DHL12345'}, history:[{date:'05/12/2025', text:'Expédiée'}] },
  ];
}
