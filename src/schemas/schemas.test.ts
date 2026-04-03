import { describe, it, expect } from 'vitest';
import { tvShowSchema } from './tvShowSchema';
import { seasonSchema } from './seasonSchema';
import { episodeSchema } from './episodeSchema';

describe('TVShow Schema', () => {
  it('Should validate a valid TVShow', () => {
    const validData = {
      title: 'Breaking Bad',
      description: 'A história do professor...',
      rating: '16+',
    };

    const result = tvShowSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Should fail validation when title is empty', () => {
    const invalidData = {
      title: '',
      description: 'A história...',
      rating: '16+',
    };

    const result = tvShowSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when description is missing', () => {
    const invalidData = {
      title: 'Breaking Bad',
      description: '',
      rating: '16+',
    };

    const result = tvShowSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when rating is missing', () => {
    const invalidData = {
      title: 'Breaking Bad',
      description: 'A história...',
      rating: '',
    };

    const result = tvShowSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Season Schema', () => {
  it('Should validate a valid Season', () => {
    const validData = {
      number: 1,
      description: 'Primeira temporada...',
    };

    const result = seasonSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Should fail validation when number is zero', () => {
    const invalidData = {
      number: 0,
      description: 'Descrição...',
    };

    const result = seasonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when description is empty', () => {
    const invalidData = {
      number: 1,
      description: '',
    };

    const result = seasonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Episode Schema', () => {
  it('Should validate a valid Episode', () => {
    const validData = {
      episodeNumber: 1,
      title: 'Pilot',
      description: 'O primeiro episódio...',
      rating: 9.5,
      releaseDate: '2008-01-20',
    };

    const result = episodeSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Should fail validation when episode number is zero', () => {
    const invalidData = {
      episodeNumber: 0,
      title: 'Pilot',
      description: 'Descrição...',
      rating: 9.0,
      releaseDate: '2008-01-20',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when rating is above 10', () => {
    const invalidData = {
      episodeNumber: 1,
      title: 'Pilot',
      description: 'Descrição...',
      rating: 11,
      releaseDate: '2008-01-20',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when rating is below 0', () => {
    const invalidData = {
      episodeNumber: 1,
      title: 'Pilot',
      description: 'Descrição...',
      rating: -1,
      releaseDate: '2008-01-20',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when release date is missing', () => {
    const invalidData = {
      episodeNumber: 1,
      title: 'Pilot',
      description: 'Descrição...',
      rating: 9.0,
      releaseDate: '',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
