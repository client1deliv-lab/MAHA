import React from 'react';

export async function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="eyebrow mono">Production services</div>
        <h2 className="section-title">Every creative vision, fully supported.</h2>
        <p className="section-lede">
          From planning to final wrap, we cover crew, locations, equipment, permits, casting and logistics for films, advertising, digital content and photography.
        </p>
        <div className="service-grid">
          <article className="service">
            <span className="number mono">01 / Production</span>
            <h3>Line Production</h3>
            <p>Budgeting, crew coordination, schedules, shoot execution and complete production logistics.</p>
          </article>
          <article className="service">
            <span className="number mono">02 / Locations</span>
            <h3>Scouting & Permissions</h3>
            <p>Suitable locations for every brief, plus the permits and permissions needed for a smooth shoot.</p>
          </article>
          <article className="service">
            <span className="number mono">03 / Crew</span>
            <h3>Crew & Equipment</h3>
            <p>Cinematographers, casting directors, camera and lighting teams, art departments, production staff and professional equipment.</p>
          </article>
          <article className="service">
            <span className="number mono">04 / Logistics</span>
            <h3>Production Logistics</h3>
            <p>Transport, vehicles, crew accommodation, catering and attentive on-ground coordination.</p>
          </article>
          <article className="service">
            <span className="number mono">05 / Advertising</span>
            <h3>Brand Shoots</h3>
            <p>Professional production support for advertising campaigns, commercials, brand films and promotional shoots.</p>
          </article>
          <article className="service">
            <span className="number mono">06 / Content</span>
            <h3>Film & Digital</h3>
            <p>Efficient, detailed production support for independent films, web series, social content, music videos and photography.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
