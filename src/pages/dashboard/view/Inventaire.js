import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, Edit2, Eye, Upload, Download, Tags, AlertTriangle, Package } from 'lucide-react';

// Inventaire – Frip2Rêve
// Objectif : voir le stock vite et agir en 1 clic

export default function Inventaire() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [status, setStatus] = useState('');
  const [pickup, setPickup] = useState('');
  const [products, setProducts] = useState(sampleProducts());
  const [selected, setSelected] = useState(new Set());
  const [editing, setEditing] = useState(null); // product being edited / viewed

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (query && !(`${p.name} ${p.code}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if (category && p.category !== category) return false;
      if (size && p.size !== size) return false;
      if (status && p.status !== status) return false;
      if (pickup && p.pickup !== pickup) return false;
      return true;
    });
  }, [products, query, category, size, status, pickup]);

  function toggleSelect(id) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  }

  function resetFilters() {
    setQuery(''); setCategory(''); setSize(''); setStatus(''); setPickup('');
  }

  function removeProduct(id) {
    if (!window.confirm('Confirmer la suppression / archivage ?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    setSelected(s => { const n = new Set(s); n.delete(id); return n; });
  }

  function bulkArchive() {
    if (selected.size === 0) return alert('Aucun produit sélectionné');
    if (!window.confirm('Archiver les produits sélectionnés ?')) return;
    setProducts(prev => prev.filter(p => !selected.has(p.id)));
    setSelected(new Set());
  }

  function updateProduct(updated) {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setEditing(null);
  }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">📦 Inventaire – Frip2Rêve</h1>
          <div className="flex gap-3 text-sm text-muted-foreground mt-2">
            <span>Total produits: <strong>{products.length}</strong></span>
            <span>En vente: <strong>{products.filter(p=>p.status==='published').length}</strong></span>
            <span>Vendus: <strong>{products.filter(p=>p.status==='sold').length}</strong></span>
            <span>Stock faible: <strong>{products.filter(p=>p.stock>0 && p.stock<=p.lowThreshold).length}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2">
            <Plus size={16}/> Ajouter un produit
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Recherche (nom / code)" className="flex-1 p-2 rounded-md border" />
          </div>

          <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes catégories</option>
            <option>Vêtements</option>
            <option>Chaussures</option>
            <option>Accessoires</option>
          </select>

          <select value={size} onChange={e=>setSize(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes tailles</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>

          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="published">En vente</option>
            <option value="sold">Vendu</option>
            <option value="draft">Brouillon</option>
          </select>

          <select value={pickup} onChange={e=>setPickup(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous points</option>
            <option>Point A</option>
            <option>Point B</option>
          </select>

          <button onClick={resetFilters} className="px-3 py-2 rounded-md border">Réinitialiser</button>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="flex gap-2 mb-3">
        <button className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Upload size={16}/> Import CSV</button>
        <button className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Download size={16}/> Export stock</button>
        <button onClick={()=>alert('Modifier le prix (multi)')} className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Tags size={16}/> Modifier prix</button>
        <button onClick={bulkArchive} className="px-3 py-2 bg-white rounded-md shadow-sm flex items-center gap-2"><Trash2 size={16}/> Archiver</button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Table principale */}
        <div className="md:col-span-3 bg-white rounded-xl p-4 shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="p-2"></th>
                <th className="p-2 text-left">Photo</th>
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Catégorie</th>
                <th className="p-2">Taille</th>
                <th className="p-2">Prix</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Statut</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-2 text-center"><input type="checkbox" checked={selected.has(p.id)} onChange={()=>toggleSelect(p.id)} /></td>
                  <td className="p-2"><div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">{p.photo ? <img src={p.photo} alt="" className="w-full h-full object-cover rounded-md"/> : <Package/>}</div></td>
                  <td className="p-2">{p.name}<div className="text-xs text-muted-foreground">{p.code}</div></td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2 text-center">{p.size}</td>
                  <td className="p-2 text-center">{p.price} €</td>
                  <td className="p-2 text-center"><StockBadge stock={p.stock} low={p.lowThreshold} /></td>
                  <td className="p-2 text-center"><StatusBadge status={p.status} /></td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={()=>setEditing(p)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Eye size={16}/> Voir</button>
                      <button onClick={()=>setEditing(p)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Edit2 size={16}/> Modifier</button>
                      <button onClick={()=>removeProduct(p.id)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-red-600"><Trash2 size={16}/> Retirer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun produit trouvé.</div>}
        </div>

        {/* Bloc latéral : alertes stock */}
        <aside className="md:col-span-1 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Alertes stock</h3>
          <div className="space-y-3">
            {products.filter(p => p.stock>0 && p.stock<=p.lowThreshold).map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-md bg-orange-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <div>
                    <div className="text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">Stock: {p.stock}</div>
                  </div>
                </div>
                <button className="text-sm text-blue-600">Voir</button>
              </div>
            ))}

            {products.filter(p => p.stock===0).map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-md bg-red-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <div>
                    <div className="text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">Rupture</div>
                  </div>
                </div>
                <button className="text-sm text-blue-600">Voir</button>
              </div>
            ))}

            <button className="mt-3 w-full text-sm text-blue-600">Voir tous</button>
          </div>
        </aside>
      </div>

      {/* Modal fiche produit */}
      {editing && (
        <ProductModal product={editing} onClose={()=>setEditing(null)} onSave={updateProduct} onDelete={()=>removeProduct(editing.id)} />
      )}

    </div>
  );
}

/* ========= Components ========== */

function StockBadge({ stock, low }){
  if (stock === 0) return <span className="px-2 py-1 rounded-md bg-red-100 text-red-700 text-xs">0</span>;
  if (stock <= low) return <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs">{stock}</span>;
  return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">{stock}</span>;
}

function StatusBadge({ status }){
  switch(status){
    case 'published': return <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs">En vente</span>;
    case 'sold': return <span className="px-3 py-1 rounded-md bg-red-100 text-red-700 text-xs">Vendu</span>;
    case 'draft': return <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">Brouillon</span>;
    default: return <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">—</span>;
  }
}

function ProductModal({ product, onClose, onSave, onDelete }){
  const [form, setForm] = useState({...product});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Fiche produit</h3>
          <div className="flex gap-2">
            <button onClick={()=>{onSave(form)}} className="px-3 py-1 rounded-md bg-green-600 text-white">Enregistrer</button>
            <button onClick={()=>{onSave({...form, status:'published'})}} className="px-3 py-1 rounded-md bg-blue-600 text-white">Publier</button>
            <button onClick={()=>{ if(window.confirm('Supprimer définitivement ?')) onDelete(); }} className="px-3 py-1 rounded-md bg-red-600 text-white">Supprimer</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs">Photos (aperçu)</label>
            <div className="mt-2 flex gap-2">
              {(form.photos || []).map((ph, i)=> (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden"><img src={ph} alt="" className="w-full h-full object-cover"/></div>
              ))}
              <div className="w-24 h-24 rounded-md border flex items-center justify-center text-xs">Upload</div>
            </div>
          </div>

          <div>
            <label className="text-xs">Nom</label>
            <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Description courte</label>
            <input value={form.short} onChange={e=>setForm({...form, short: e.target.value})} className="w-full p-2 rounded-md border" />

            <div className="grid grid-cols-2 gap-2 mt-2">
              <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="p-2 rounded-md border">
                <option>Vêtements</option>
                <option>Chaussures</option>
                <option>Accessoires</option>
              </select>
              <select value={form.size} onChange={e=>setForm({...form, size: e.target.value})} className="p-2 rounded-md border">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="p-2 rounded-md border" />
              <input value={form.stock} onChange={e=>setForm({...form, stock: Number(e.target.value)})} className="p-2 rounded-md border" />
            </div>

            <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="p-2 rounded-md border mt-2">
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
              <option value="sold">Vendu</option>
            </select>
          </div>
        </div>

        {/* Historique (simple) */}
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Historique</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>01/12/2025 — Création — Admin</div>
            <div>05/12/2025 — Prix modifié — Awa</div>
          </div>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Sample data ===== */
function sampleProducts(){
  return [
    { id: 'p1', code: 'FRP-001', name: 'Robe rouge', category: 'Vêtements', size: 'M', price: 12, stock: 5, lowThreshold: 5, status: 'published', photos: [], pickup: 'Point A' },
    { id: 'p2', code: 'FRP-002', name: 'Basket sport', category: 'Chaussures', size: '42', price: 20, stock: 0, lowThreshold: 2, status: 'sold', photos: [], pickup: 'Point B' },
    { id: 'p3', code: 'FRP-003', name: 'Echarpe', category: 'Accessoires', size: 'one', price: 6, stock: 2, lowThreshold: 3, status: 'published', photos: [], pickup: 'Point A' },
    { id: 'p4', code: 'FRP-004', name: 'T-shirt logo', category: 'Vêtements', size: 'L', price: 8, stock: 12, lowThreshold: 4, status: 'draft', photos: [], pickup: 'Point B' },
  ];
}
