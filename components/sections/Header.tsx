'use client';

import React, { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="nav wrap">
        <a className="brand" href="#top" aria-label="MAHA Films home" onClick={closeMenu}>
          <img src="/logos/logo.png" alt="MAHA Films" width="162" height="41" />
        </a>
        <button 
          className="nav-toggle mono" 
          id="navToggle" 
          aria-expanded={isMenuOpen} 
          aria-controls="navLinks"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="navLinks" aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
          <a href="#team" onClick={closeMenu}>Team</a>
          <a href="#reviews" onClick={closeMenu}>Reviews</a>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Start a project</a>
        </nav>
      </div>
    </header>
  );
}
