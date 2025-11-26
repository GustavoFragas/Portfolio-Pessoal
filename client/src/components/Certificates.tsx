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
    if (currentIndex < certificates.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
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
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Certificações & <span className="text-gradient">Licenças</span>
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          {certificates.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= certificates.length - 3}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="min-w-[calc(33.33%-1rem)] bg-gray-800 rounded-lg p-6 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex flex-col border border-gray-700 hover:border-purple-500/50"
                >
                  <div className="flex items-center justify-center h-16 mb-4">
                    <div className="text-4xl">🏆</div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-center min-h-[3.5rem] flex items-center justify-center">{cert.name}</h3>
                  <p className="text-blue-400 text-center mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-400 text-center mb-4">
                    {formatDate(cert.issueDate)}
                  </p>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Forçar abertura em nova aba para PDFs
                      if (cert.credentialUrl.endsWith('.pdf')) {
                        e.preventDefault();
                        window.open(cert.credentialUrl, '_blank');
                      }
                    }}
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
