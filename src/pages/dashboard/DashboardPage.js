// src/pages/dashboard/DashboardPage.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './view/Home';
import Inventaire from './view/Inventaire';
import Orders from './view/Orders';
import Donateurs from './view/Donateurs';
import Volontaires from './view/Volontaires';
import Projets from './view/Projets';
import Actualites from './view/Actualites';
import Messages from './view/Messages';
import Statistiques from './view/Statistiques';
import Parametres from './view/Parametres';
import Utilisateurs from './view/Utilisateurs';
import Integrations from './view/Integrations';
import Audit from './view/Audit';
import Sites from './view/Sites';
import sitesData from '../../data/sitesData'; // <-- import des données

export default function DashboardPage() {
    const [activeKey, setActiveKey] = useState('overview');

    // état local des sites (modifiable depuis le dashboard)
    const [sites, setSites] = useState(sitesData);

    // helper simple si plus tard tu veux afficher SiteDetails
    const fetchSite = async (siteId) => {
      return sites.find(s => s.id === siteId) || null;
    };

    // handlers fournis au composant Sites
    const handleAdd = () => {
      // ouvre modal / formulaire d'ajout dans ton UI si tu en as une
      console.log('ouvrir modal ajout site');
    };

    const handleDelete = async (siteId) => {
      // supprime en mémoire — adapte si tu as une API
      setSites(prev => prev.filter(s => s.id !== siteId));
      console.log('site supprimé', siteId);
    };

    const handleOpen = (site) => {
      const url = site.domain.startsWith('http') ? site.domain : `https://${site.domain}`;
      window.open(url, '_blank');
    };

    const handleAdmin = (site) => {
      window.open(site.adminUrl || `/sites/${site.id}/admin`, '_blank');
    };

    const handleSupport = (site) => {
      console.log('support demandé pour', site.id);
      // tu peux ouvrir un ticket ici
    };

    const handleBilling = (site) => {
      console.log('facturation pour', site.id);
    };

    const renderContent = () => {
        switch (activeKey) {
            case 'overview':
                return <Home />;
            case 'sites':
                return (
                  <Sites
                    sites={sites}
                    canAdd={true}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    onOpen={handleOpen}
                    onAdmin={handleAdmin}
                    onSupport={handleSupport}
                    onBilling={handleBilling}
                  />
                );
            case 'inventory':
                return <Inventaire />;
            case 'orders':
                return <Orders />;
            case 'donations':
                return <Donateurs />;
            case 'volunteers':
                return <Volontaires />;
            case 'projects':
                return <Projets />;
            case 'news':
                return <Actualites />;
            case 'messages':
                return <Messages />;
            case 'reports':
                return <Statistiques />;
            case 'settings':
                return <Parametres />;
            case 'users':
                return <Utilisateurs />;
            case 'integrations':
                return <Integrations />;
            case 'audit':
                return <Audit />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar
                user={{ name: 'Natasha', role: 'admin' }}
                activeKey={activeKey}
                onNavigate={setActiveKey}
            />
            <main className="flex-1 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
}
