import * as assetService from './assetService';
import type { TVShow, Season, Episode } from '@/types';

export const ASSET_TYPES = {
  TVSHOW: 'tvshows',
  SEASON: 'seasons',
  EPISODE: 'episodes',
  WATCHLIST: 'watchlists',
} as const;

export async function getTVShows(): Promise<TVShow[]> {
  return assetService.search<TVShow>({ assetType: ASSET_TYPES.TVSHOW });
}

export async function getTVShowByKey(key: string): Promise<TVShow | null> {
  const results = await assetService.search<TVShow>({
    assetType: ASSET_TYPES.TVSHOW,
    filter: { '@key': key },
  });
  return results[0] || null;
}

export async function createTVShow(
  data: Omit<TVShow, '@assetType' | '@key'>
): Promise<TVShow> {
  return assetService.createAsset<TVShow>(ASSET_TYPES.TVSHOW, data);
}

export async function updateTVShow(
  key: string,
  data: Partial<Omit<TVShow, '@assetType' | '@key'>>
): Promise<TVShow> {
  return assetService.updateAsset<TVShow>(ASSET_TYPES.TVSHOW, key, data);
}

export async function deleteTVShow(key: string): Promise<void> {
  return assetService.deleteAsset(ASSET_TYPES.TVSHOW, key);
}

export async function getSeasonsByTVShow(tvShowKey: string): Promise<Season[]> {
  return assetService.search<Season>({
    assetType: ASSET_TYPES.SEASON,
    filter: { 'tvShow.@key': tvShowKey },
  });
}

export async function getSeasonByKey(key: string): Promise<Season | null> {
  const results = await assetService.search<Season>({
    assetType: ASSET_TYPES.SEASON,
    filter: { '@key': key },
  });
  return results[0] || null;
}

export async function createSeason(
  data: Omit<Season, '@assetType' | '@key'>
): Promise<Season> {
  return assetService.createAsset<Season>(ASSET_TYPES.SEASON, data);
}

export async function updateSeason(
  key: string,
  data: Partial<Omit<Season, '@assetType' | '@key'>>
): Promise<Season> {
  return assetService.updateAsset<Season>(ASSET_TYPES.SEASON, key, data);
}

export async function deleteSeason(key: string): Promise<void> {
  return assetService.deleteAsset(ASSET_TYPES.SEASON, key);
}

export async function getEpisodesBySeason(
  seasonKey: string
): Promise<Episode[]> {
  return assetService.search<Episode>({
    assetType: ASSET_TYPES.EPISODE,
    filter: { 'season.@key': seasonKey },
  });
}

export async function getEpisodeByKey(key: string): Promise<Episode | null> {
  const results = await assetService.search<Episode>({
    assetType: ASSET_TYPES.EPISODE,
    filter: { '@key': key },
  });
  return results[0] || null;
}

export async function createEpisode(
  data: Omit<Episode, '@assetType' | '@key'>
): Promise<Episode> {
  return assetService.createAsset<Episode>(ASSET_TYPES.EPISODE, data);
}

export async function updateEpisode(
  key: string,
  data: Partial<Omit<Episode, '@assetType' | '@key'>>
): Promise<Episode> {
  return assetService.updateAsset<Episode>(ASSET_TYPES.EPISODE, key, data);
}

export async function deleteEpisode(key: string): Promise<void> {
  return assetService.deleteAsset(ASSET_TYPES.EPISODE, key);
}
