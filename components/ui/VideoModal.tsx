'use client';

import React, { useEffect, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  videoId: string | null;
  onClose: () => void;
}

export function VideoModal({ isOpen, videoId, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened for accessibility
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Simple focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
              // Shift + Tab
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              // Tab
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleTab);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) return null;

  return (
    <div 
      className="video-modal open" 
      id="videoModal" 
      role="dialog" 
      aria-modal="true" 
      aria-label="MAHA Films portfolio player"
      onClick={(e) => {
        // Close if clicking outside the modal inner content
        if (e.target === e.currentTarget) onClose();
      }}
      ref={modalRef}
    >
      <div className="modal-inner">
        <button 
          className="modal-close" 
          id="modalClose" 
          aria-label="Close video player"
          onClick={onClose}
          ref={closeBtnRef}
        >
          ×
        </button>
        <div className="modal-player" id="modalPlayer">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`} 
            title="MAHA Films portfolio video" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="modal-note">
          <span>Playing inside the MAHA Films website</span>
          <a id="youtubeFallback" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
            Open on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}
