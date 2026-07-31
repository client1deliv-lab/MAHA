import React from 'react';
import { getClients } from '@/lib/data/clients';

export async function Clients() {
  const clients = await getClients();

  return (
    <section className="clients">
      <div className="wrap">
        <div className="eyebrow mono">Our valuable clients</div>
        <h2 className="section-title">Built on lasting partnerships.</h2>
        <p className="section-lede">
          MAHA Films has worked with creative agencies, filmmakers and brands to execute high-quality productions. We value long-term relationships and reliable delivery on every project.
        </p>
        <div className="logo-grid">
          {clients.map((client) => (
            <div key={client.id} className="logo-cell">
              <img
                src={client.logoUrl}
                alt={client.name}
                loading="lazy"
                width="170"
                height="72"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
