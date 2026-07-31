'use client';

import React, { useEffect, useRef } from 'react';

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Mutable refs to avoid closures locking in stale values in rAF
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(1);
  const currentFrameSmoothRef = useRef(1);
  const rAFRef = useRef<number | null>(null);

  const FRAME_COUNT = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frameSrc = (index: number) => {
      return `/img-seq/frame-${String(index).padStart(3, '0')}.webp`;
    };

    const drawCover = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      const canvasRatio = cW / cH;
      const imageRatio = iW / iH;

      let rW, rH, x, y;

      if (imageRatio > canvasRatio) {
        rH = cH;
        rW = iW * (rH / iH);
        x = (cW - rW) / 2;
        y = 0;
      } else {
        rW = cW;
        rH = iH * (rW / iW);
        x = 0;
        y = (cH - rH) / 2;
      }

      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, x, y, rW, rH);
    };

    const renderFrame = (frameIndex: number) => {
      const idx = Math.max(1, Math.min(FRAME_COUNT, Math.round(frameIndex)));
      const img = imagesRef.current[idx - 1];
      if (img && img.complete) {
        drawCover(img);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrameSmoothRef.current));
    };

    const preloadImages = () => {
      imagesRef.current = new Array(FRAME_COUNT);

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = 'async';
        if (i === 1) img.fetchPriority = 'high';
        img.onload = () => {
          if (i === 1) {
            resizeCanvas();
          }
        };
        img.src = frameSrc(i);
        imagesRef.current[i - 1] = img;
      }
    };

    const tick = () => {
      const delta = targetFrameRef.current - currentFrameSmoothRef.current;
      if (Math.abs(delta) > 0.01) {
        currentFrameSmoothRef.current += delta * 0.08;
        renderFrame(currentFrameSmoothRef.current);
      }
      rAFRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollTop = window.scrollY - sectionTop;
      const maxScroll = sectionHeight - window.innerHeight;
      
      // Calculate progress safely
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

      targetFrameRef.current = 1 + progress * (FRAME_COUNT - 1);

      const inner = innerRef.current;
      if (inner) {
        let opacity = 1;
        if (progress > 0.4) {
          // fades from 1 to 0 between 40% and 75%
          opacity = Math.max(0, 1 - (progress - 0.4) * 2.85);
        }
        inner.style.opacity = String(opacity);
      }

      const hint = scrollHintRef.current;
      const pastBottom = window.scrollY > sectionTop + sectionHeight;
      if (hint) {
        if (scrollTop > 60 || pastBottom) {
          hint.classList.add('hidden');
        } else {
          hint.classList.remove('hidden');
        }
      }
    };

    // Initialize
    preloadImages();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resizeCanvas);
    }
    
    // Start loop
    rAFRef.current = requestAnimationFrame(tick);
    // Set initial scroll values
    onScroll();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-sequence" id="top" ref={sectionRef}>
      <canvas id="hero-canvas" ref={canvasRef}></canvas>

      <div className="hero-sequence-content">
        <div className="hero-sequence-inner" ref={innerRef}>
          <div className="recording mono">
            <i></i> Production ready — Bengaluru / India
          </div>
          <h1 className="hero-seq-title">
            Where theatre craft meets <em>screen production.</em>
          </h1>
          <p className="hero-copy">
            MAHA Films is a production and line production company rooted in the power of theatre and storytelling. We deliver seamless production for films, commercials, digital content, web series and photography across India.
          </p>
          <div className="actions">
            <a href="#about" className="btn btn-primary">
              Start your project
            </a>
            <a href="#portfolio" className="btn btn-dark">
              Watch our work
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-hint mono" id="scrollHint" ref={scrollHintRef}>
        Scroll to reveal
      </div>
    </section>
  );
}
