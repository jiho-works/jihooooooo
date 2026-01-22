
import { Record, FeaturedMedia } from './types';

export const ADMIN_PASSWORD = '202400';

export const INITIAL_FEATURED: FeaturedMedia[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000',
    title: 'Perspective'
  },
  {
    id: '2',
    type: 'video',
    url: 'uD4izuDMUQA', // YouTube ID
    title: 'Ambient Vibes'
  }
];

export const INITIAL_RECORDS: Record[] = [
  {
    id: 'r1',
    title: 'Morning Silence',
    content: 'The city breathes differently at 5 AM. A quietness that only a few get to witness.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000',
    date: '2024-05-10'
  },
  {
    id: 'r2',
    title: 'Urban Shadows',
    content: 'The way the light hits the concrete creates a geometric playground for the eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1449156003053-c3044c698dcc?auto=format&fit=crop&q=80&w=1000',
    date: '2024-05-12'
  }
];
