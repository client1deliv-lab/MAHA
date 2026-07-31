import { TeamMember } from '../types';

export async function getTeamMembers(): Promise<TeamMember[]> {
  // TODO: replace with Supabase query
  return [
    {
      id: '1',
      name: 'Shiva Kagawade',
      role: 'Director',
      photoUrl: '/team/team-shiva.png',
      sortOrder: 1,
    },
    {
      id: '2',
      name: 'Nisha Yash Ram',
      role: 'Director',
      photoUrl: '/team/team-nisha.png',
      sortOrder: 2,
    },
    {
      id: '3',
      name: 'Yashaswini Nachappa',
      role: 'Director',
      photoUrl: '/team/team-yashaswini.png',
      sortOrder: 3,
    },
  ];
}
