
export interface Record {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

export interface FeaturedMedia {
  id: string;
  type: 'image' | 'video';
  url: string; // Image URL or YouTube ID
  title?: string;
}

export type View = 'home' | 'records' | 'admin';
