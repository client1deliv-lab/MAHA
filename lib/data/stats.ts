import { Stats } from '../types';

export async function getStats(): Promise<Stats> {
  // TODO: replace with Supabase query
  return {
    yearsExperience: 15,
    happyClients: 500,
    musicVideos: 50,
    shortFilms: 100,
  };
}
