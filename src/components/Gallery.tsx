"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images = [], alt }: GalleryProps) {
  // Main page carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Modal carousel
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: true });

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Lock page scroll + keyboard handlers when modal is open
  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalEmblaApi?.scrollPrev();
      if (e.key === "ArrowRight") modalEmblaApi?.scrollNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, modalEmblaApi, closeModal]);

  // Ensure modal carousel scrolls to the clicked image *after* Embla is ready
  useEffect(() => {
    if (!modalOpen || !modalEmblaApi) return;
    // Re-init to be safe when opening
    modalEmblaApi.reInit();
    modalEmblaApi.scrollTo(selectedIndex, true);
  }, [modalOpen, modalEmblaApi, selectedIndex]);

  // Keep selectedIndex in sync when the modal carousel changes slides
  useEffect(() => {
    if (!modalEmblaApi) return;

    const onSelect = () => {
      setSelectedIndex(modalEmblaApi.selectedScrollSnap());
    };

    modalEmblaApi.on("select", onSelect);
    onSelect();
    return () => {
      modalEmblaApi.off("select", onSelect);
    };
  }, [modalEmblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const modalPrev = useCallback(
    () => modalEmblaApi?.scrollPrev(),
    [modalEmblaApi]
  );
  const modalNext = useCallback(
    () => modalEmblaApi?.scrollNext(),
    [modalEmblaApi]
  );

  return (
    <>
      {/* Main Carousel */}
      <div
        className="relative overflow-hidden rounded-lg bg-black"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className="min-w-full cursor-pointer flex justify-center"
              onClick={() => openModal(i)}
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} - ${i + 1}`}
                width={1600}
                height={1200}
                className="object-contain w-full h-[520px]"
              />
            </button>
          ))}
        </div>

        {/* Prev / Next buttons (desktop) */}
        <button
          type="button"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
          onClick={scrollPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
          onClick={scrollNext}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`shrink-0 rounded border-2 ${
                i === selectedIndex ? "border-primary" : "border-transparent"
              }`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                width={100}
                height={80}
                className="object-cover w-24 h-20 rounded"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal Lightbox */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Modal content with proper height constraints */}
            <div
              className="relative z-10 w-full max-w-6xl h-full max-h-screen flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - fixed at top */}
              <div className="flex justify-end p-4 shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white hover:text-gray-300"
                  aria-label="Close gallery"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Image container - takes available space */}
              <div className="flex-1 min-h-0 relative">
                <div
                  className="relative overflow-hidden h-full"
                  ref={modalEmblaRef}
                >
                  <div className="flex h-full">
                    {images.map((src, i) => (
                      <div
                        key={i}
                        className="min-w-full flex justify-center items-center h-full"
                      >
                        <Image
                          src={src}
                          alt={`${alt} - ${i + 1}`}
                          width={1800}
                          height={1350}
                          className="object-contain max-w-full max-h-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full"
                        onClick={modalPrev}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full"
                        onClick={modalNext}
                        aria-label="Next image"
                      >
                        <ChevronRight size={32} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail strip - fixed at bottom */}
              <div className="p-4 shrink-0">
                <div className="flex gap-2 justify-center overflow-x-auto max-w-full">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`shrink-0 rounded border-2 ${
                        idx === selectedIndex
                          ? "border-white"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        width={100}
                        height={80}
                        className="object-cover w-24 h-20 rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
