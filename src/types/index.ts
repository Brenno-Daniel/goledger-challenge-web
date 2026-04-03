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
  tvShow: { '@assetType': string; '@key': string };
}

export interface Episode extends BaseAsset {
  episodeNumber: number;
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  season: { '@assetType': string; '@key': string };
}

export interface Watchlist extends BaseAsset {
  name: string;
  description: string;
  user: { '@key': string };
}
