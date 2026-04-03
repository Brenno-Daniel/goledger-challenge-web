import { TVShow, Season, Episode } from '@/types';

export const mockTVShows: TVShow[] = [
  {
    '@assetType': 'tvshow',
    '@key': 'tvshow-001',
    title: 'Breaking Bad',
    description:
      'A história do professor de química Walter White que, ao descobrir que tem câncer de pulmão, decide fabricar metanfetamina para garantir o futuro financeiro de sua família.',
    rating: '16+',
  },
  {
    '@assetType': 'tvshow',
    '@key': 'tvshow-002',
    title: 'Stranger Things',
    description:
      'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garotinha muito estranha.',
    rating: '14+',
  },
  {
    '@assetType': 'tvshow',
    '@key': 'tvshow-003',
    title: 'The Mandalorian',
    description:
      'A saga de um atirador solitário que navega pelos cantos mais distantes da galáxia, longe da autoridade da Nova República.',
    rating: '12+',
  },
  {
    '@assetType': 'tvshow',
    '@key': 'tvshow-004',
    title: 'Game of Thrones',
    description:
      'Nove famílias nobres lutam pelo controle das terras mítico de Westeros, enquanto antigos mal antigos despertam nas terras do norte.',
    rating: '18+',
  },
  {
    '@assetType': 'tvshow',
    '@key': 'tvshow-005',
    title: 'The Office',
    description:
      'Um mockumentário sobre o dia a dia de funcionários da Dunder Mifflin, uma empresa de papel em Scranton, Pensilvânia.',
    rating: 'Livre',
  },
];

export const mockSeasons: Season[] = [
  {
    '@assetType': 'season',
    '@key': 'season-001-1',
    number: 1,
    description: 'A primeira temporada acompanha Walter White e Jesse Pinkman.',
    tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-001' },
  },
  {
    '@assetType': 'season',
    '@key': 'season-001-2',
    number: 2,
    description: 'Walter enfrenta as consequências de suas decisões.',
    tvShow: { '@assetType': 'tvshow', '@key': 'tvshow-001' },
  },
];

export const mockEpisodes: Episode[] = [
  {
    '@assetType': 'episodes',
    '@key': 'episodes:055f8f49-7e3a-5908-b0ec-bf5a3f8df419',
    episodeNumber: 1,
    title: 'Pilot',
    description:
      'Walter White, um professor de química, descobre que tem câncer de pulmão.',
    rating: 9.0,
    releaseDate: '2008-01-20T00:00:00Z',
    season: {
      '@assetType': 'seasons',
      '@key': 'season-001-1',
    },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:055f8f49-7e3a-5908-b0ec-bf5a3f8df420',
    episodeNumber: 2,
    title: "Cat's in the Bag...",
    description: 'Walter and Jesse attempt to dispose of the bodies.',
    rating: 9.1,
    releaseDate: '2008-01-27T00:00:00Z',
    season: {
      '@assetType': 'seasons',
      '@key': 'season-001-1',
    },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:055f8f49-7e3a-5908-b0ec-bf5a3f8df421',
    episodeNumber: 3,
    title: "And the Bag's in the River",
    description: 'Walter struggles with a looming deadline.',
    rating: 8.9,
    releaseDate: '2008-02-10T00:00:00Z',
    season: {
      '@assetType': 'seasons',
      '@key': 'season-001-1',
    },
  },
];
