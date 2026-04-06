import { TVShow, Season, Episode } from '@/types';

export const mockTVShows: TVShow[] = [
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:001',
    title: 'Breaking Bad',
    description:
      'A história do professor de química Walter White que, ao descobrir que tem câncer de pulmão, decide fabricar metanfetamina para garantir o futuro financeiro de sua família.',
    recommendedAge: 16,
  },
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:002',
    title: 'Stranger Things',
    description:
      'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garotinha muito estranha.',
    recommendedAge: 14,
  },
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:003',
    title: 'The Mandalorian',
    description:
      'A saga de um atirador solitário que navega pelos cantos mais distantes da galáxia, longe da autoridade da Nova República.',
    recommendedAge: 12,
  },
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:004',
    title: 'Game of Thrones',
    description:
      'Nove famílias nobres lutam pelo controle das terras mite de Westeros, enquanto antigos males despertam nas terras do norte.',
    recommendedAge: 18,
  },
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:005',
    title: 'The Office',
    description:
      'Um mockumentário sobre o dia a dia de funcionários da Dunder Mifflin, uma empresa de papel em Scranton, Pensilvânia.',
    recommendedAge: 0,
  },
];

export const mockSeasons: Season[] = [
  {
    '@assetType': 'seasons',
    '@key': 'seasons:001-1',
    number: 1,
    year: 2008,
    tvShow: { '@key': 'tvshows:001' },
  },
  {
    '@assetType': 'seasons',
    '@key': 'seasons:001-2',
    number: 2,
    year: 2009,
    tvShow: { '@key': 'tvshows:001' },
  },
];

export const mockEpisodes: Episode[] = [
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-1',
    episodeNumber: 1,
    title: 'Pilot',
    description:
      'Walter White, um professor de química, descobre que tem cáncer de pulmão.',
    rating: 9.5,
    releaseDate: '2008-01-20T00:00:00Z',
    season: { '@key': 'seasons:001-1' },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-2',
    episodeNumber: 2,
    title: "Cat's in the Bag...",
    description: 'Walter and Jesse attempt to dispose of the bodies.',
    rating: 8.9,
    releaseDate: '2008-01-27T00:00:00Z',
    season: { '@key': 'seasons:001-1' },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-3',
    episodeNumber: 3,
    title: "And the Bag's in the River",
    description: 'Walter struggles with a looming deadline.',
    rating: 8.7,
    releaseDate: '2008-02-10T00:00:00Z',
    season: { '@key': 'seasons:001-1' },
  },
];
