import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Images } from 'lucide-react';
import {
  GALLERY_IMAGES as STATIC_GALLERY_IMAGES,
  CATEGORY_LABELS,
  AVAILABLE_CATEGORIES,
  GalleryCategory,
  GalleryImage,
} from '../data/galleryData';

type FilterValue = 'All' | GalleryCategory;

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch gallery images from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data);
        } else {
          setGalleryImages(STATIC_GALLERY_IMAGES);
        }
      })
      .catch(err => {
        console.error('Failed to fetch gallery images', err);
        setGalleryImages(STATIC_GALLERY_IMAGES); // fallback
      })
      .finally(() => setIsLoading(false));
  }, []);

  // SEO: page title + meta description (lightweight, no extra dependency)
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Project Gallery | Unique Power Systems';

    let metaDesc = document.querySelector('meta[name="description"]');
    const previousContent = metaDesc?.getAttribute('content') ?? null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Explore completed electrical, civil, tunnel, industrial and infrastructure projects executed by Unique Power Systems across India.'
    );

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousContent !== null) {
        metaDesc.setAttribute('content', previousContent);
      }
    };
  }, []);

  const filters: FilterValue[] = useMemo(
    () => ['All', ...AVAILABLE_CATEGORIES],
    []
  );

  const filteredImages = useMemo(
    () =>
      activeFilter === 'All'
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeFilter),
    [activeFilter, galleryImages]
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + filteredImages.length) % filteredImages.length;
    });
  }, [filteredImages.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % filteredImages.length;
    });
  }, [filteredImages.length]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Reset lightbox if the active filter changes and the index is now out of range
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filteredImages.length) {
      setLightboxIndex(filteredImages.length > 0 ? 0 : null);
    }
  }, [filteredImages.length, lightboxIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 120, damping: 20 },
    },
  };

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0B3A7E] to-blue-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left"
        >
          <p className="text-xs font-extrabold tracking-widest text-[#F97316] uppercase mb-2">
            PROJECT SHOWCASE
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Project Gallery
          </h1>
          <div className="h-1 w-24 bg-[#F97316] mt-4" />
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Explore our completed electrical, civil, tunnel, industrial and infrastructure projects across India.
          </p>
        </motion.div>
      </section>

      {/* Filters + Gallery Grid */}
      <section className="py-20" id="gallery-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex flex-wrap gap-2 justify-center bg-slate-50 p-4 rounded-2xl border border-gray-100 mb-12 max-w-4xl mx-auto"
          >
            {filters.map((filter) => {
              const label = filter === 'All' ? 'All' : CATEGORY_LABELS[filter];
              const isActive = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  variants={itemVariants}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider transition-all uppercase ${
                    isActive
                      ? 'bg-[#0B3A7E] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  layout
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="break-inside-avoid mb-4 md:mb-6"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View larger image: ${image.title}`}
                    onClick={() => openLightbox(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                    className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-slate-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3A7E] focus-visible:ring-offset-2"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#0B3A7E] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wide shadow-sm">
                      {CATEGORY_LABELS[image.category]}
                    </span>

                    {/* Expand affordance */}
                    <span className="absolute top-3 right-3 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={14} />
                    </span>

                    {/* Hover overlay + title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white font-bold text-xs sm:text-sm p-4 leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              No images found for this category.
            </div>
          )}

          {/* Result count */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium mt-10">
            <Images size={14} />
            <span>
              Showing {filteredImages.length} of {galleryImages.length} project photographs
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${activeImage.title}`}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close gallery viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={22} />
            </button>

            {/* Previous button */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2.5 sm:p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next button */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2.5 sm:p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image + caption */}
            <div
              className="max-w-5xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.id}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
                />
              </AnimatePresence>

              <div className="text-center px-4">
                <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">
                  {CATEGORY_LABELS[activeImage.category]}
                </span>
                <h3 className="text-white font-bold text-sm sm:text-base mt-1">
                  {activeImage.title}
                </h3>
                {filteredImages.length > 1 && (
                  <p className="text-blue-200/70 text-xs mt-2 font-mono">
                    {(lightboxIndex ?? 0) + 1} / {filteredImages.length}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
