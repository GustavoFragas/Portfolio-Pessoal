import { useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { certificatesApi } from '../services/api';
import type { Certificate } from '../types';

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await certificatesApi.getAll();
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Carregando certificados...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Certificações & <span className="text-gradient">Licenças</span>
        </h2>

        {/* Mobile: Grid vertical */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">🏆</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold leading-tight">{cert.name}</h3>
                  <p className="text-blue-400 text-xs">{cert.issuer}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  {formatDate(cert.issueDate)}
                </p>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  <FaExternalLinkAlt /> Ver
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Carousel horizontal */}
        <div className="hidden md:block relative">
          {/* Navigation Buttons */}
          {certificates.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Certificates Horizontal Scroll */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="min-w-[calc(33.33%-1rem)] max-w-[calc(33.33%-1rem)] flex-shrink-0 bg-gray-800 rounded-lg p-6 hover:shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-300 flex flex-col border border-gray-700 hover:border-purple-500/50 h-[320px]"
                >
                  <div className="flex items-center justify-center h-16 mb-4">
                    <div className="text-4xl">🏆</div>
                  </div>
                  <h3 className="text-base font-bold mb-2 text-center flex items-center justify-center leading-tight px-2 flex-grow-0">{cert.name}</h3>
                  <p className="text-blue-400 text-center mb-2 text-sm">{cert.issuer}</p>
                  <p className="text-xs text-gray-400 text-center mb-4">
                    {formatDate(cert.issueDate)}
                  </p>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                  >
                    <FaExternalLinkAlt /> Ver Certificado
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
