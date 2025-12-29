import React, { useState } from 'react';
import { Mail, Bell, HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SectionNewsletter() {
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [alerts, setAlerts] = useState({ ventes: true, evenements: true, actus: false });
  const [status, setStatus] = useState(null); // success | error | null

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    // TODO: brancher API newsletter / Brevo / Mailchimp
    setStatus('success');
    setEmail('');
    setPrenom('');
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Texte & visuel */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Restez informé de nos actions solidaires
          </h2>
          <p className="text-gray-700 max-w-xl">
            Recevez les prochaines dates de ventes, collectes et actualités de Rêve d’Ivoire.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <HeartHandshake className="w-5 h-5" />
            Une communauté engagée, des actions concrètes.
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 w-full">
          <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
            <div>
              <label className="block text-sm font-medium mb-1">Prénom (optionnel)</label>
              <input
                type="text"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adresse e-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Je souhaite recevoir :</legend>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={alerts.ventes} onChange={e => setAlerts(a => ({ ...a, ventes: e.target.checked }))} />
                <Bell className="w-4 h-4" /> Ventes solidaires
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={alerts.evenements} onChange={e => setAlerts(a => ({ ...a, evenements: e.target.checked }))} />
                <Bell className="w-4 h-4" /> Collectes & événements
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={alerts.actus} onChange={e => setAlerts(a => ({ ...a, actus: e.target.checked }))} />
                <Bell className="w-4 h-4" /> Actualités de l’association
              </label>
            </fieldset>

            <label className="flex items-start gap-2 text-xs text-gray-600">
              <input type="checkbox" required />
              J’accepte de recevoir les actualités de l’association Rêve d’Ivoire.
            </label>

            <button type="submit" className="w-full mt-2 px-4 py-3 rounded-md bg-[#7B2D2D] text-white font-semibold">
              S’inscrire
            </button>

            <p className="text-xs text-gray-500 text-center">
              Zéro spam • 1 à 2 messages par mois • Désinscription possible à tout moment
            </p>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-700 text-sm mt-3">
                <CheckCircle2 className="w-4 h-4" />
                Merci, votre inscription est bien prise en compte.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-700 text-sm mt-3">
                <AlertCircle className="w-4 h-4" />
                Adresse e-mail invalide ou déjà inscrite.
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm mb-2">Vous préférez WhatsApp ?</p>
            <a
              href="https://wa.me/33123456789?text=Bonjour%20je%20souhaite%20recevoir%20les%20alertes%20Rêve%20d’Ivoire"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
              aria-label="Recevoir les alertes WhatsApp Rêve d’Ivoire"
            >
              <Bell className="w-4 h-4" /> Recevoir les alertes WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
