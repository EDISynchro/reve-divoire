import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstname || !form.email || !form.message || !form.consent) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    // Simulation envoi
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Nous contacter
          </h2>
          <p className="mt-4 text-gray-600">
            Une question, une idée ou envie d’aider ? Écris-nous, on te répond.
          </p>
        </motion.div>

        {/* Contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORMULAIRE */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-8 space-y-5"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Écris-nous directement
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom *
              </label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sujet
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
              >
                <option value="">Choisir un sujet</option>
                <option>Bénévolat</option>
                <option>Don / soutien</option>
                <option>Partenariat</option>
                <option>Question générale</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1"
              />
              <span>J’accepte d’être recontacté par Rêve d’Ivoire *</span>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {sent ? (
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle size={18} />
                Message envoyé. Merci !
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                <Send size={16} />
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            )}

            <p className="text-xs text-gray-500">
              Réponse sous quelques jours. Aucune donnée partagée à des tiers.
            </p>
          </motion.form>

          {/* COORDONNÉES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-8 space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Coordonnées directes
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                frip2reve@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                06 62 03 47 59
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                6 rue de la Mairie, 95820 Bruyères-sur-Oise
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Nous suivre
              </p>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <Instagram size={18} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <Facebook size={18} /> Facebook
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <MessageCircle size={18} /> TikTok
                </a>
              </div>
            </div>

            <div className="pt-4 text-xs text-gray-500">
              Les messages sont lus par l’équipe de l’association.  
              Nous ne vendons ni ne partageons jamais tes informations.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
