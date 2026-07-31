import { z } from 'zod';

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  photoUrl: z.string(),
  sortOrder: z.number(),
});

export const portfolioItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  youtubeId: z.string(),
  thumbnailUrl: z.string(),
  featured: z.boolean(),
  category: z.string(),
  sortOrder: z.number(),
});

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  logoUrl: z.string(),
  sortOrder: z.number(),
});

export const reviewSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  quote: z.string(),
  avatarUrl: z.string(),
  sortOrder: z.number(),
});

export const statsSchema = z.object({
  yearsExperience: z.number(),
  happyClients: z.number(),
  musicVideos: z.number(),
  shortFilms: z.number(),
});

export const contactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  service: z.string(),
  message: z.string().min(1, "Message is required"),
});
