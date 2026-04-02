export interface BaseAsset {
  '@assetType': string;
  '@key': string;
}

export interface TVShow extends BaseAsset {
  title: string;
  description: string;
  rating: string;
}

export interface Season extends BaseAsset {
  number: number;
  description: string;
  tvShow: { '@key': string };
}

export interface Episode extends BaseAsset {
  number: number;
  title: string;
  description: string;
  duration: number;
  season: { '@key': string };
}

export interface Watchlist extends BaseAsset {
  name: string;
  description: string;
  user: { '@key': string };
}
