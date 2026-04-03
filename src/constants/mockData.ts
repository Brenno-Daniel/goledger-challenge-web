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
      'Nove famílias nobres lutam pelo controle das terras mítico de Westeros, enquanto antigos mal antigos despertam nas terras do norte.',
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
    description: 'A primeira temporada acompanha Walter White e Jesse Pinkman.',
    tvShow: { '@key': 'tvshows:001' },
  },
  {
    '@assetType': 'seasons',
    '@key': 'seasons:001-2',
    number: 2,
    description: 'Walter enfrenta as consequências de suas decisões.',
    tvShow: { '@key': 'tvshows:001' },
  },
];

export const mockEpisodes: Episode[] = [
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-1',
    number: 1,
    name: 'Pilot',
    description:
      'Walter White, um professor de química, descobre que tem câncer de pulmão.',
    duration: '58 min',
    season: { '@key': 'seasons:001-1' },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-2',
    number: 2,
    name: "Cat's in the Bag...",
    description: 'Walter and Jesse attempt to dispose of the bodies.',
    duration: '47 min',
    season: { '@key': 'seasons:001-1' },
  },
  {
    '@assetType': 'episodes',
    '@key': 'episodes:001-1-3',
    number: 3,
    name: "And the Bag's in the River",
    description: 'Walter struggles with a looming deadline.',
    duration: '47 min',
    season: { '@key': 'seasons:001-1' },
  },
];
