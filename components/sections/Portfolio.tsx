import React from 'react';
import { getPortfolioItems } from '@/lib/data/portfolio';
import { PortfolioClient } from './PortfolioClient';

export async function Portfolio() {
  const items = await getPortfolioItems();
  const featured = items.find((item) => item.featured);
  const gridItems = items.filter((item) => !item.featured);

  return (
    <section id="portfolio">
      <PortfolioClient featured={featured} items={gridItems} />
    </section>
  );
}
