import React from 'react';
import { HeroSequence } from '@/components/sections/HeroSequence';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Clients } from '@/components/sections/Clients';
import { Team } from '@/components/sections/Team';
import { Reviews } from '@/components/sections/Reviews';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="top">
      <HeroSequence />
      <About />
      <Services />
      <Portfolio />
      <Clients />
      <Team />
      <Reviews />
      <Contact />
      
      <footer className="site-footer">
        <div className="wrap footer-row">
          <div className="footer-brand">
            <img src="/logos/logo.png" alt="MAHA Films" loading="lazy" width="324" height="81" />
            <p className="mono">© {new Date().getFullYear()} MAHA Films</p>
          </div>
          <div className="footer-links mono">
            <a href="https://instagram.com/mahafilms" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://youtube.com/mahafilms" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
