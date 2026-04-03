export interface BaseAsset {
  '@assetType': string;
  '@key': string;
}

export interface TVShow extends BaseAsset {
  title: string;
  description: string;
  recommendedAge: number;
}

export interface Season extends BaseAsset {
  number: number;
  description: string;
  tvShow: { '@key': string };
}

export interface Episode extends BaseAsset {
  number: number;
  name: string;
  description: string;
  duration: string;
  season: { '@key': string };
}

export interface Watchlist extends BaseAsset {
  title: string;
  tvShows: Array<{ '@key': string }>;
}

export interface AssetResponse<T> {
  result: T[];
  metadata: unknown;
}

export interface InvokeResponse<T> {
  result: T;
}
