import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Users, Mail as MailIcon, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * SectionDevenirBenevole.js
 * Section — Devenir bénévole
 * - Mobile-first, accessible, full-width for desktop
 * - Vouvoyement dans tous les textes
 * - Champs : Prénom, Email (requis), Disponibilités, Compétences, Autre (libre), Message
 * - Micro-copy, confirmation accessible (aria-live)
 */

export default function SectionDevenirBenevole({ apiEndpoint = '/api/benevole' }) {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [dispo, setDispo] = useState('ponctuel');
  const [skills, setSkills] = useState({ vente: false, logistique: false, comm: false, autre: false });
  const [autreText, setAutreText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text }
  const liveRef = useRef(null);

  const emailValid = (e) => !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const toggleSkill = (k) => setSkills(s => ({ ...s, [k]: !s[k] }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!emailValid(email)) {
      setStatus({ type: 'error', text: 'Adresse e‑mail invalide.' });
      liveRef.current?.focus?.();
      return;
    }

    // Build payload
    const payload = {
      prenom: prenom || null,
      email,
      disponibilite: dispo,
      competences: Object.keys(skills).filter(k => skills[k]).map(k => (k === 'comm' ? 'communication' : k === 'vente' ? 'vente' : k === 'logistique' ? 'logistique' : 'autre')),
      autre: skills.autre ? (autreText || null) : null,
      message: message || null,
      submittedAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      // If an API endpoint is provided, POST payload (else simulate success)
      if (apiEndpoint) {
        const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) {
          const txt = await res.text().catch(() => 'Erreur serveur');
          throw new Error(txt || 'Erreur serveur');
        }
      }

      setStatus({ type: 'success', text: "Merci ! Nous avons bien reçu votre proposition. Nous vous contactons bientôt." });
      // reset form
      setPrenom(''); setEmail(''); setDispo('ponctuel'); setSkills({ vente: false, logistique: false, comm: false, autre: false }); setAutreText(''); setMessage('');
    } catch (err) {
      setStatus({ type: 'error', text: `Impossible d'envoyer votre proposition : ${err.message}` });
    } finally {
      setLoading(false);
      liveRef.current?.focus?.();
    }
  }

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Devenir bénévole</h2>
          <p className="mt-3 text-gray-700">Vous pouvez donner un peu de temps pour aider, ponctuellement ou régulièrement. Chaque coup de main permet de sauver des vêtements et de financer des actions solidaires.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8" noValidate>
          {/* Left: champs */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bv-prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                <input id="bv-prenom" type="text" placeholder="Ton prénom" value={prenom} onChange={e => setPrenom(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]" />
              </div>

              <div>
                <label htmlFor="bv-email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
                <input id="bv-email" type="email" placeholder="Votre email pour vous contacter" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]" />
              </div>
            </div>

            {/* Disponibilités */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">Disponibilités</legend>
              <div className="mt-2 flex gap-3 items-center">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="dispo" checked={dispo === 'ponctuel'} onChange={() => setDispo('ponctuel')} />
                  Ponctuel
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="dispo" checked={dispo === 'regulier'} onChange={() => setDispo('regulier')} />
                  Régulier
                </label>
              </div>
            </fieldset>

            {/* Compétences */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">Compétences / domaines d'aide</legend>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={skills.vente} onChange={() => toggleSkill('vente')} />
                  Vente
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={skills.logistique} onChange={() => toggleSkill('logistique')} />
                  Logistique
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={skills.comm} onChange={() => toggleSkill('comm')} />
                  Communication
                </label>
                <div className="flex items-start gap-2">
                  <input type="checkbox" checked={skills.autre} onChange={() => toggleSkill('autre')} />
                  <div className="flex-1">
                    <div className="text-sm">Autre</div>
                    <input type="text" placeholder="Précisez (ex. couture, photo...)" value={autreText} onChange={e => setAutreText(e.target.value)} disabled={!skills.autre} className="mt-1 block w-full border rounded-md px-3 py-2" />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Message libre */}
            <div className="mt-6">
              <label htmlFor="bv-message" className="block text-sm font-medium text-gray-700">Message (optionnel)</label>
              <textarea id="bv-message" placeholder="Parlez-nous de vous et de ce que vous pouvez apporter" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="mt-1 block w-full border rounded-md px-3 py-2" />
            </div>

            {/* CTA mobile visible */}
            <div className="sm:hidden mt-6">
              <button type="submit" className="w-full px-4 py-3 bg-[#7B2D2D] text-white rounded-md font-medium" aria-label="Je propose mon aide" disabled={loading}>Je propose mon aide</button>
              <p className="text-xs text-gray-500 mt-2">On vous recontacte rapidement • Engagement libre • Participation selon votre temps</p>
            </div>

          </div>

          {/* Right: résumé + CTA desktop sticky */}
          <aside className="lg:sticky top-28">
            <div className="bg-gray-50 border rounded-lg p-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Users className="w-5 h-5" />
                <div>
                  <div className="font-medium">Pourquoi s'engager ?</div>
                  <div className="text-xs text-gray-600">Chaque coup de main a un impact immédiat.</div>
                </div>
              </div>

              <dl className="mt-4 text-sm text-gray-700">
                <div className="flex justify-between py-1"><dt>Disponibilité</dt><dd className="text-gray-900">{dispo === 'ponctuel' ? 'Ponctuel' : 'Régulier'}</dd></div>
                <div className="flex justify-between py-1"><dt>Compétences</dt><dd className="text-gray-900">{Object.keys(skills).filter(k => skills[k]).map(k => (k === 'comm' ? 'Communication' : k === 'vente' ? 'Vente' : k === 'logistique' ? 'Logistique' : 'Autre')).join(', ') || 'À préciser'}</dd></div>
              </dl>

              <div className="mt-6 hidden sm:block">
                <button type="submit" onClick={(e) => { document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }} className="w-full px-4 py-3 bg-[#7B2D2D] text-white rounded-md font-medium" aria-label="Je propose mon aide" disabled={loading}>Je propose mon aide</button>
                <p className="text-xs text-gray-500 mt-2">On vous recontacte rapidement • Engagement libre • Participation selon votre temps</p>
              </div>

              {/* Live status */}
              <div tabIndex={-1} ref={liveRef} aria-live="polite" className="mt-4">
                {status?.type === 'success' && (
                  <div className="flex items-center gap-2 text-green-700"><CheckCircle2 className="w-4 h-4" />{status.text}</div>
                )}
                {status?.type === 'error' && (
                  <div className="flex items-center gap-2 text-red-700"><AlertCircle className="w-4 h-4" />{status.text}</div>
                )}
              </div>

            </div>
          </aside>

        </form>

      </div>
    </section>
  );
}

SectionDevenirBenevole.propTypes = {
  apiEndpoint: PropTypes.string,
};