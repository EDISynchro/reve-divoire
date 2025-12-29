import React, { useState } from 'react';

// Page Paramètres — configuration générale du dashboard
export default function Parametres(){
  const [name, setName] = useState('Rêve d’Ivoire');
  const [email, setEmail] = useState('contact@revedivoire.org');
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [theme, setTheme] = useState('vert');
  const [notifications, setNotifications] = useState(true);

  function saveChanges(){
    alert('Paramètres enregistrés (placeholder)');
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      {/* Bandeau haut */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-2xl font-bold">⚙️ Paramètres</h1>
        <button onClick={saveChanges} className="px-4 py-2 bg-green-600 text-white rounded-md">
          Enregistrer les changements
        </button>
      </div>

      {/* Infos générales */}
      <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h2 className="font-semibold mb-3">Infos générales</h2>
        <div className="space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Nom de l’association" />
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email principal" />
          <div className="text-sm text-gray-500">Logo de l’association (upload à prévoir)</div>
        </div>
      </section>

      {/* Langue & fuseau horaire */}
      <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h2 className="font-semibold mb-3">Langue & Fuseau horaire</h2>
        <div className="flex gap-3">
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="p-2 border rounded">
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
          <select value={timezone} onChange={e=>setTimezone(e.target.value)} className="p-2 border rounded">
            <option value="Europe/Paris">Europe / Paris</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </section>

      {/* Thème */}
      <section className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h2 className="font-semibold mb-3">Thème & identité visuelle</h2>
        <select value={theme} onChange={e=>setTheme(e.target.value)} className="p-2 border rounded">
          <option value="vert">Vert (défaut)</option>
          <option value="bleu">Bleu</option>
          <option value="orange">Orange</option>
        </select>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-3">Notifications globales</h2>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)} />
          Recevoir les alertes par email
        </label>
      </section>
    </div>
  );
}
