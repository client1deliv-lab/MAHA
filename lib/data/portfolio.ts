import { PortfolioItem } from '../types';

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // TODO: replace with Supabase query
  
  const videos = [
    "-rt1ufWGqSQ", "77MjqzVzReY", "jtAQd5HyEYQ", "ijvq5anTqlk", "Ml4zaNOG4w8",
    "AUPhU5DCjRw", "Ba7CQ6h3BUs", "DE_O-QM5bZE", "dQay0688XO8", "GGJLlPEROW8",
    "gPHDuLTB-8k", "i8d5HHN8T-c", "IUV7G_BH-Ts", "J-S499mhioI", "kAM0DyMNdpo",
    "KjjRpqtE5j8", "lyorSxG8WCY", "OO6HkdkTocU", "QFcBT3D3YqE", "sLOUe_GFoeo",
    "tmIsIQDY4Yk", "UeuuL4-NQl4", "UmyTFeaKNCk", "xB3agwXTV4Y", "YC_jnUBieno",
    "YcI0FtrNilQ", "ZS3ri4--qbs", "2Qb4H_44jJ4", "7kGWKLfY85M", "AnLacojdDTo",
    "dehsfI34rDQ"
  ];

  const items: PortfolioItem[] = [
    {
      id: 'featured-1',
      title: 'Featured portfolio film',
      youtubeId: 'pKx_D-5BIPc',
      thumbnailUrl: 'https://i.ytimg.com/vi/pKx_D-5BIPc/hqdefault.jpg',
      featured: true,
      category: 'Featured',
      sortOrder: 0,
    }
  ];

  videos.forEach((id, index) => {
    items.push({
      id: `portfolio-${index + 1}`,
      title: `Portfolio film ${String(index + 1).padStart(2, '0')}`,
      youtubeId: id,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      featured: false,
      category: 'Portfolio',
      sortOrder: index + 1,
    });
  });

  return items;
}
