'use client';

import React, { useState } from 'react';
import { PortfolioItem } from '@/lib/types';
import { VideoModal } from '../ui/VideoModal';

interface PortfolioClientProps {
  featured: PortfolioItem | undefined;
  items: PortfolioItem[];
}

export function PortfolioClient({ featured, items }: PortfolioClientProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const totalFilms = items.length + (featured ? 1 : 0);
  const visibleItems = items.slice(0, visibleCount);
  const remaining = items.length - visibleCount;
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, items.length));
  };

  return (
    <>
      <div className="wrap">
        <div className="reel-head">
          <div>
            <div className="eyebrow mono">Selected work</div>
            <h2 className="section-title">A production journey in motion.</h2>
          </div>
          <p className="section-lede">
            Advertisements, short films, campaigns and digital productions delivered with creative partners, agencies and brands.
          </p>
        </div>

        {featured && (
          <button
            className="featured-video"
            type="button"
            aria-label={`Play the featured MAHA Films portfolio film: ${featured.title}`}
            onClick={() => setActiveVideoId(featured.youtubeId)}
          >
            <img
              src={featured.thumbnailUrl}
              alt={featured.title}
              loading="lazy"
              width="1280"
              height="720"
            />
            <span className="featured-play" aria-hidden="true">
              ▶
            </span>
            <span className="featured-caption">
              <strong>{featured.title}</strong>
              <span className="mono">From MAHA Films’ official portfolio · Play here</span>
            </span>
          </button>
        )}

        <div className="portfolio-grid" id="portfolioGrid" aria-live="polite">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              className="film-card"
              type="button"
              aria-label={`Play portfolio film ${index + 1}`}
              onClick={() => setActiveVideoId(item.youtubeId)}
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                loading="lazy"
                width="480"
                height="270"
              />
              <span className="mono">{item.title}</span>
              <b aria-hidden="true">▶</b>
            </button>
          ))}
        </div>
        
        <div className="load-wrap">
          {remaining > 0 ? (
            <>
              <p className="load-hint" id="loadHint">
                Showing {visibleCount + (featured ? 1 : 0)} of {totalFilms} films. To keep the page fast, {remaining} more {remaining === 1 ? 'film is' : 'films are'} hidden; the button below reveals the next {Math.min(9, remaining)} in this grid.
              </p>
              <button className="btn btn-dark" id="loadMore" onClick={handleLoadMore}>
                Load the next {Math.min(9, remaining)} portfolio film{remaining === 1 ? '' : 's'} · {remaining} still hidden
              </button>
            </>
          ) : (
            <p className="load-hint" id="loadHint">
              All {totalFilms} portfolio films are now visible. Select any film to play it here.
            </p>
          )}
        </div>
      </div>
      
      <VideoModal 
        isOpen={!!activeVideoId} 
        videoId={activeVideoId} 
        onClose={() => setActiveVideoId(null)} 
      />
    </>
  );
}
