import * as assetService from './assetService';
import type { Watchlist } from '@/types';

export const ASSET_TYPE = 'watchlist';

export async function getWatchlists(): Promise<Watchlist[]> {
  return assetService.search<Watchlist>({ assetType: ASSET_TYPE });
}

export async function getWatchlistByKey(
  key: string
): Promise<Watchlist | null> {
  const results = await assetService.search<Watchlist>({
    assetType: ASSET_TYPE,
    filter: { '@key': key },
  });
  return results[0] || null;
}

export async function createWatchlist(
  data: Omit<Watchlist, '@assetType' | '@key'>
): Promise<Watchlist> {
  return assetService.createAsset<Watchlist>(ASSET_TYPE, data);
}

export async function updateWatchlist(
  key: string,
  data: Partial<Omit<Watchlist, '@assetType' | '@key'>>
): Promise<Watchlist> {
  return assetService.updateAsset<Watchlist>(ASSET_TYPE, key, data);
}

export async function deleteWatchlist(key: string): Promise<void> {
  return assetService.deleteAsset(ASSET_TYPE, key);
}
