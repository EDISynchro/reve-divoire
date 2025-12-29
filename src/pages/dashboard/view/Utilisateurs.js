import React, { useState } from 'react';

// Page Utilisateurs & Rôles
export default function UtilisateursRoles(){
  const [users] = useState([
    { name: 'Rachid Oubakh', email: 'oubakhrachid@gmail.com', role: 'Admin', status: 'Actif' },
    { name: 'Marie Dupont', email: 'marie@example.com', role: 'Opérations', status: 'Actif' },
    { name: 'Paul Martin', email: 'paul@example.com', role: 'Lecture seule', status: 'Inactif' }
  ]);

  const roles = [
    { name: 'Admin', permissions: ['Voir finances', 'Modifier projets', 'Exporter données', 'Gérer bénévoles'] },
    { name: 'Opérations', permissions: ['Modifier projets', 'Gérer bénévoles'] },
    { name: 'Contenu', permissions: ['Modifier projets'] },
    { name: 'Lecture seule', permissions: [] }
  ];

  function addUser(){ alert('Ajouter utilisateur (placeholder)'); }
  function confirmAction(action){ if(window.confirm('Confirmer cette action ?')) alert(action + ' (placeholder)'); }

  return (
    <div className="p-4 md:p-6 max-w-5xl">
      {/* Bandeau haut */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-2xl font-bold">👥 Utilisateurs & Rôles</h1>
        <button onClick={addUser} className="px-4 py-2 bg-blue-600 text-white rounded-md">+ Ajouter un utilisateur</button>
      </div>

      {/* Liste utilisateurs */}
      <section className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <h2 className="font-semibold mb-3">Utilisateurs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th>Nom</th><th>Email</th><th>Rôle</th><th>Statut</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u,i)=>(
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className={u.status==='Actif'?'text-green-600':'text-gray-500'}>{u.status}</td>
                  <td className="flex gap-2 py-2">
                    <button className="px-2 py-1 border rounded" onClick={()=>confirmAction('Modifier utilisateur')}>Modifier</button>
                    <button className="px-2 py-1 border rounded" onClick={()=>confirmAction('Désactiver utilisateur')}>Désactiver</button>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={()=>confirmAction('Supprimer utilisateur')}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gestion des rôles */}
      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-3">Rôles & Permissions</h2>
        <div className="space-y-4">
          {roles.map((r,i)=>(
            <div key={i} className="border rounded-lg p-3">
              <div className="font-semibold mb-2">{r.name}</div>
              <ul className="text-sm list-disc list-inside">
                {r.permissions.length > 0 ? r.permissions.map((p,idx)=>(<li key={idx}>{p}</li>)) : <li>Aucune permission</li>}
              </ul>
              {r.name === 'Admin' && <div className="text-xs text-red-600 mt-2">Accès finances réservé Admin</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}