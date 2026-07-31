import { Client } from '../types';

export async function getClients(): Promise<Client[]> {
  // TODO: replace with Supabase query
  return [
    {
      id: '1',
      name: 'Wonderla',
      logoUrl: '/logos/client-1.png',
      sortOrder: 1,
    },
    {
      id: '2',
      name: 'Simplylife',
      logoUrl: '/logos/client-2.png',
      sortOrder: 2,
    },
    {
      id: '3',
      name: 'Axis Bank',
      logoUrl: '/logos/client-3.png',
      sortOrder: 3,
    },
    {
      id: '4',
      name: 'Gojek',
      logoUrl: '/logos/client-4.png',
      sortOrder: 4,
    },
    {
      id: '5',
      name: 'BharatPe',
      logoUrl: '/logos/client-5.png',
      sortOrder: 5,
    },
    {
      id: '6',
      name: 'what3words',
      logoUrl: '/logos/client-6.png',
      sortOrder: 6,
    },
    {
      id: '7',
      name: 'Ampere by Greaves',
      logoUrl: '/logos/client-7.png',
      sortOrder: 7,
    },
    {
      id: '8',
      name: 'Sun Pharma',
      logoUrl: '/logos/client-8.png',
      sortOrder: 8,
    },
  ];
}
