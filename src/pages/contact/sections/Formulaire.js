import React, { useState } from "react";
import { Hourglass, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactFormSection() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "question",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Nom requis";
    if (!form.prenom.trim()) newErrors.prenom = "Prénom requis";
    if (!form.email.trim()) newErrors.email = "Email requis";
    if (!form.message.trim()) newErrors.message = "Message requis";
    if (!form.consent) newErrors.consent = "Consentement requis";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const trustPoints = [
    { id: 1, icon: Hourglass, title: "Réponse sous 48h", text: "Traitement rapide de votre demande." },
    { id: 2, icon: ShieldCheck, title: "Données protégées", text: "Vos informations restent confidentielles." },
    { id: 3, icon: Users, title: "Support humain", text: "Un interlocuteur dédié." },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section id="contact-form" className="w-full bg-gray-50 py-16 px-4 md:px-16">
      <div className="w-full mx-auto flex flex-col gap-12">

        {/* Intro */}
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#7B2D2D]">
            Parlez-nous de votre projet
          </h2>
          <p className="text-lg max-w-3xl">
            Remplissez le formulaire ci-dessous. Nous vous répondrons rapidement, de manière humaine et claire.
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="w-full grid md:grid-cols-2 gap-12 items-start">

          {/* Formulaire */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            {submitted ? (
              <div className="bg-green-100 p-6 rounded-md text-green-800 font-semibold">
                Merci pour votre message. Réponse sous 48h.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">

                <div className="grid md:grid-cols-2 gap-4">
                  {["nom", "prenom"].map((field) => (
                    <div key={field}>
                      <label className="font-semibold capitalize">{field} *</label>
                      <input
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]"
                      />
                      {errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="font-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]"
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="font-semibold">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]"
                  />
                </div>

                <div>
                  <label className="font-semibold">Message *</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#7B2D2D]"
                  />
                  {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
                  J’accepte d’être recontacté *
                </div>
                {errors.consent && <p className="text-red-600 text-sm">{errors.consent}</p>}

                <button className="bg-[#7B2D2D] text-white py-3 rounded-md hover:bg-[#5a1f1f] transition">
                  Envoyer le message
                </button>
              </form>
            )}
          </motion.div>

          {/* Infos compactes imbriquées */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="grid gap-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.id} className="flex gap-3">
                    <Icon className="text-[#7B2D2D]" />
                    <div>
                      <p className="font-semibold">{point.title}</p>
                      <p className="text-sm">{point.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p>Email : <a href="mailto:contact@revedivoire.org" className="underline">contact@revedivoire.org</a></p>
              <p>Téléphone : +33 1 23 45 67 89</p>
              <p>Adresse : 6 rue de la Mairie, 95820 Bruyères-sur-Oise</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
