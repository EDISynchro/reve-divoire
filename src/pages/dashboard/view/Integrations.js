import React, { useState } from 'react';

// Page Intégrations
export default function Integrations(){
  const [services, setServices] = useState([
    { name: 'Stripe', type: 'Paiement', active: true, key: '' },
    { name: 'PayPal', type: 'Paiement', active: false, key: '' },
    { name: 'SMTP Email', type: 'Email', active: true, key: '' },
    { name: 'Google Maps', type: 'Carte', active: false, key: '' },
    { name: 'Instagram', type: 'Réseaux sociaux', active: false, key: '' },
    { name: 'Facebook', type: 'Réseaux sociaux', active: false, key: '' }
  ]);

  function toggleService(index){
    if(!window.confirm('Test obligatoire avant activation. Continuer ?')) return;
    const updated = [...services];
    updated[index].active = !updated[index].active;
    setServices(updated);
  }

  function testService(name){
    alert(`Test de l’intégration ${name} (placeholder)`);
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl">
      {/* Bandeau haut */}
      <div className="mb-6">
        <h1 className="text-lg md:text-2xl font-bold">🔌 Intégrations</h1>
        <p className="text-sm text-gray-500">Connexion des services externes</p>
      </div>

      {/* Liste intégrations */}
      <div className="space-y-4">
        {services.map((s,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-gray-500">{s.type}</div>
              </div>
              <span className={`text-sm font-semibold ${s.active?'text-green-600':'text-gray-400'}`}>
                {s.active ? 'Actif' : 'Inactif'}
              </span>
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Clé API / Identifiants"
                className="w-full p-2 border rounded"
                value={s.key}
                onChange={e=>{
                  const updated=[...services];
                  updated[i].key=e.target.value;
                  setServices(updated);
                }}
              />
              <div className="text-xs text-gray-400 mt-1">Clé masquée pour sécurité</div>
            </div>

            <div className="flex gap-2">
              <button onClick={()=>testService(s.name)} className="px-3 py-1 border rounded">Tester</button>
              <button onClick={()=>toggleService(i)} className={`px-3 py-1 rounded text-white ${s.active?'bg-gray-500':'bg-green-600'}`}>
                {s.active ? 'Désactiver' : 'Activer'}
              </button>
            </div>

            {!s.key && <div className="text-xs text-red-600 mt-2">⚠️ Service non connecté</div>}
          </div>
        ))}
      </div>
    </div>
  );
}