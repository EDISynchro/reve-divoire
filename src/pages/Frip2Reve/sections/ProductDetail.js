import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductDetail({
  product,
  loading = false,
  whatsappNumber = '33123456789',
  instagramLink,
}) {
  // Hooks ALWAYS at the top
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    console.log('ProductDetail: product prop ->', product);
  }, [product]);

  // Reset currentImg if images length changes (avoid index out of bounds)
  useEffect(() => {
    const len = Array.isArray(product?.images) ? product.images.length : 0;
    setCurrentImg(prev => (prev >= len ? 0 : prev));
  }, [product?.images]);

  // Si on est en loading ou pas de product -> skeleton
  if (loading || !product) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
          Chargement du produit…
        </div>
      </section>
    );
  }

  // Défensive : product.images peut être undefined
  const images = Array.isArray(product.images) && product.images.length ? product.images : [null];

  const nextImg = () => setCurrentImg(i => (i + 1) % images.length);
  const prevImg = () => setCurrentImg(i => (i - 1 + images.length) % images.length);

  const isAvailable = product?.status === 'available';
  const isReserved = product?.status === 'reserved';
  const isSold = product?.status === 'sold';

  const productNameForText = product?.name || 'produit';
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Bonjour Frip2Rêve - Je souhaite commander : ${productNameForText}`
  )}`;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative w-full mb-6">
        {images[0] ? (
          <img
            src={images[currentImg]}
            alt={Array.isArray(product.imagesAlt) ? product.imagesAlt?.[currentImg] || productNameForText : productNameForText}
            className="w-full h-auto object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">Image produit</div>
        )}

        {images.length > 1 && (
          <div className="absolute top-1/2 left-2 right-2 flex justify-between">
            <button onClick={prevImg} aria-label="Image précédente" className="bg-white px-2 py-1 rounded-md">‹</button>
            <button onClick={nextImg} aria-label="Image suivante" className="bg-white px-2 py-1 rounded-md">›</button>
          </div>
        )}

        {isReserved && <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded">Réservé</span>}
        {isSold && <span className="absolute top-2 left-2 px-2 py-1 bg-gray-400 text-white text-xs font-semibold rounded">Vendu</span>}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{product?.name}</h1>
          <p className="text-gray-700 mb-2">{product?.subtitle}</p>
          <p className="text-gray-600 mb-4">{product?.description}</p>

          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li>Taille : {product?.size}</li>
            <li>Style : {product?.style}</li>
            <li>État : {product?.condition}</li>
            <li>Disponibilité : {isAvailable ? 'En stock' : isReserved ? 'Réservé' : 'Vendu'}</li>
            <li>Retrait : {product?.location}</li>
          </ul>

          <p className="text-xs text-gray-500 mb-4">Remis à neuf manuellement par l’équipe Frip2Rêve.</p>
          <div className="text-2xl font-bold text-gray-900 mb-1">{product?.price ?? '—'} €</div>
          <p className="text-xs text-gray-500 mb-4">Tous les bénéfices financent nos actions solidaires.</p>

          {isAvailable && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Commander via WhatsApp" className="flex-1 px-4 py-3 bg-[#7B2D2D] text-white rounded-md text-center">Commander via WhatsApp</a>
              {instagramLink && <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Commander via Instagram" className="flex-1 px-4 py-3 border rounded-md text-center">Commander via Instagram</a>}
            </div>
          )}

          {!isAvailable && isReserved && <div className="mb-4 text-yellow-600 font-semibold">Cette pièce est en cours de réservation.</div>}
          {!isAvailable && isSold && <div className="mb-4 text-gray-600 font-semibold">Pièce vendue. <a href="#collections" className="text-indigo-600 underline">Voir des pièces similaires</a></div>}

          <ul className="flex flex-wrap gap-3 text-xs text-gray-700">
            <li>Pièce unique</li>
            <li>Retrait local possible</li>
            <li>Paiement par virement ou lien sécurisé</li>
            <li>Association solidaire</li>
          </ul>
        </div>
      </div>

      {isAvailable && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white p-3 border-t z-40">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Commander via WhatsApp" className="w-full px-4 py-3 bg-[#7B2D2D] text-white rounded-md text-center">Commander via WhatsApp</a>
        </div>
      )}
    </section>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.string,
    condition: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.oneOf(['available','reserved','sold']),
    images: PropTypes.arrayOf(PropTypes.string),
    imagesAlt: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool,
  whatsappNumber: PropTypes.string,
  instagramLink: PropTypes.string,
};
