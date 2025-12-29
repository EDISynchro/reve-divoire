import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Video } from "lucide-react";

export default function HeroActualites({
  videoSrc = "/media/video-natacha.mp4",
  featuredImages = [
    "/media/actu-frip2reve1.jpg",
    "/media/actu-frip2reve2.jpg",
    "/media/actu-frip2reve3.jpg",
  ],
  subscribeEndpoint = "/subscribe",
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    fetch(subscribeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, consent: true }),
    }).then(() => setSubscribed(true));
  };

  const scrollToArticles = () => {
    const el = document.getElementById("articles");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* TEXTE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold text-green-600">Actualités — Rêve d'Ivoire</p>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Actualités & coulisses — ce que Rêve d’Ivoire partage vraiment
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Photos, vidéos et comptes-rendus fournis par l’équipe : suivez les actions, les lives et la vie de la friperie Frip2Rêve.
          </p>

          <p className="text-gray-700 max-w-xl">
            Vidéo de présentation : Natacha (20–30 s) — en vedette. Lives Zoom prévus les lundi et samedi. Beaucoup de photos et vidéos disponibles pour illustrer les actions.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToArticles}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800"
            >
              Voir les dernières
              <ArrowRight size={16} />
            </button>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
              >
                {subscribed ? "Merci !" : "S’abonner"}
              </button>
            </form>
          </div>

          {/* Microcopy RGPD */}
          <p className="text-xs text-gray-500 mt-2 max-w-xs">
            Vous recevez nos actualités avec consentement explicite. 
            <a href="/politique-confidentialite" className="underline ml-1">Politique de confidentialité</a>.
          </p>

          {/* Badge En vedette */}
          <div className="mt-6 flex items-center gap-3 bg-yellow-100 px-4 py-2 rounded-md w-fit">
            <Video size={20} />
            <span className="font-medium text-gray-900">
              En vedette : Vidéo présentation de Natacha
            </span>
            <a
              href={videoSrc}
              download
              className="ml-4 px-3 py-1 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
            >
              Télécharger la vidéo
            </a>
          </div>

          {/* Mini-strip Prochain live */}
          <p className="mt-4 text-gray-600 font-medium">
            Prochain live : Lives Zoom — lundi & samedi
          </p>
        </motion.div>

        {/* VISUELS / VIDEO + CARROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <video
            src={videoSrc}
            controls
            muted
            playsInline
            className="w-full h-72 lg:h-full object-cover rounded-lg shadow-md"
          />
          <div className="grid grid-cols-3 gap-2">
            {featuredImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Actualités Rêve d'Ivoire — image ${idx + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
