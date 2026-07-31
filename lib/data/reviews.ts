import { Review } from '../types';

export async function getReviews(): Promise<Review[]> {
  // TODO: replace with Supabase query
  return [
    {
      id: '1',
      authorName: 'Navin V',
      quote: 'Excellent Production House. Professional approach and execution.',
      avatarUrl: '/reviews/review-navin.jpg',
      sortOrder: 1,
    },
    {
      id: '2',
      authorName: 'Nishma Chengappa',
      quote: 'Worked with this team recently. Professionals, and comfortable.',
      avatarUrl: '/reviews/review-nishma.jpg',
      sortOrder: 2,
    },
    {
      id: '3',
      authorName: 'Gokul Pillai',
      quote: 'Great team to collaborate with.',
      avatarUrl: '/reviews/review-gokul.jpg',
      sortOrder: 3,
    },
    {
      id: '4',
      authorName: 'S K Enterprises',
      quote: 'Very professional and warm team. They are proficient in handling artists and technicians, creating opportunities across boundaries.',
      avatarUrl: '/reviews/review-sk.jpg',
      sortOrder: 4,
    },
    {
      id: '5',
      authorName: 'Chethan S',
      quote: 'It’s a good place to learn.',
      avatarUrl: '/reviews/review-chethan.jpg',
      sortOrder: 5,
    },
    {
      id: '6',
      authorName: 'Manorama Bhat',
      quote: 'MAHA movie makers is a group of multitalented people. They are sincere and dedicated. I had a wonderful experience with this group.',
      avatarUrl: '/reviews/review-manorama.jpg',
      sortOrder: 6,
    },
  ];
}
