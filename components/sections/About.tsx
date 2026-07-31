import React from 'react';
import { getStats } from '@/lib/data/stats';

export async function About() {
  const stats = await getStats();

  return (
    <>
      {/* Facts Highlights */}
      <div className="facts" aria-label="Company highlights">
        <div className="fact">
          <strong>{stats.yearsExperience}+</strong>
          <span>Years experience</span>
        </div>
        <div className="fact">
          <strong>{stats.happyClients}+</strong>
          <span>Happy clients</span>
        </div>
        <div className="fact">
          <strong>{stats.musicVideos}+</strong>
          <span>Music videos</span>
        </div>
        <div className="fact">
          <strong>{stats.shortFilms}+</strong>
          <span>Short films</span>
        </div>
      </div>
      <p className="facts-note mono">
        Figures published by MAHA Films on its official website · not independently audited
      </p>

      {/* About Section */}
      <section id="about">
        <div className="wrap about-grid">
          <div className="about-copy">
            <div className="eyebrow mono">About MAHA Films</div>
            <h2 className="section-title">We make production feel possible.</h2>
            <p>
              Our team combines experienced production professionals with theatre artists—including organizers, actors, directors, playwrights, choreographers and designers. This foundation gives us a strong understanding of storytelling, performance, staging and creative collaboration.
            </p>
            <p>
              From pre-production planning to final wrap, we manage every on-ground requirement: crew, locations, equipment, permits, casting and logistics. We work closely with filmmakers, production houses and agencies to keep shoots smooth, organized and stress-free.
            </p>
            <p>
              Great productions are built on strong planning, clear communication and dedicated teamwork. Our goal is simple: make every production seamless while helping clients bring their creative vision to life.
            </p>
            <ul className="check-list">
              <li>Experienced production team</li>
              <li>Strong network of crew and technicians</li>
              <li>Access to diverse locations across India</li>
              <li>Transparent budgeting and professional execution</li>
            </ul>
          </div>
          <div className="about-collage" aria-label="MAHA Films behind the scenes">
            <img src="/sets/set-1.jpg" alt="MAHA Films production on set" width="1000" height="650" />
            <img src="/sets/set-2.jpg" alt="MAHA Films crew behind the scenes" loading="lazy" width="600" height="450" />
            <img src="/sets/set-3.jpg" alt="MAHA Films shoot in progress" loading="lazy" width="600" height="450" />
          </div>
        </div>
      </section>
    </>
  );
}
