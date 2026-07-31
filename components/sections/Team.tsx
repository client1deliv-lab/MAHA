import React from 'react';
import { getTeamMembers } from '@/lib/data/team';

export async function Team() {
  const teamMembers = await getTeamMembers();

  return (
    <section id="team">
      <div className="wrap">
        <div className="eyebrow mono">The people behind the work</div>
        <h2 className="section-title">Meet our team.</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article key={member.id} className="person">
              <img
                src={member.photoUrl}
                alt={member.name}
                loading="lazy"
                width="500"
                height="500"
              />
              <div>
                <h3>{member.name}</h3>
                <p className="mono">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
