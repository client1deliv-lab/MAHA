export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  sortOrder: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  featured: boolean;
  category: string;
  sortOrder: number;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  sortOrder: number;
}

export interface Review {
  id: string;
  authorName: string;
  quote: string;
  avatarUrl: string;
  sortOrder: number;
}

export interface Stats {
  yearsExperience: number;
  happyClients: number;
  musicVideos: number;
  shortFilms: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
