import { describe, it, expect } from 'vitest';
import { tvShowSchema } from './tvShowSchema';
import { seasonSchema } from './seasonSchema';
import { episodeSchema } from './episodeSchema';

describe('TVShow Schema', () => {
  it('Should validate a valid TVShow', () => {
    const validData = {
      title: 'Breaking Bad',
      description: 'A história do professor...',
      recommendedAge: 16,
    };

    const result = tvShowSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Should fail validation when title is empty', () => {
    const invalidData = {
      title: '',
      description: 'A história...',
      recommendedAge: 16,
    };

    const result = tvShowSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when description is missing', () => {
    const invalidData = {
      title: 'Breaking Bad',
      description: '',
      recommendedAge: 16,
    };

    const result = tvShowSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when recommendedAge is missing', () => {
    const invalidData = {
      title: 'Breaking Bad',
      description: 'A história...',
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
      number: 1,
      name: 'Pilot',
      description: 'O primeiro episódio...',
      duration: '58:00',
    };

    const result = episodeSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('Should fail validation when episode number is zero', () => {
    const invalidData = {
      number: 0,
      name: 'Pilot',
      description: 'Descrição...',
      duration: '58:00',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when name is empty', () => {
    const invalidData = {
      number: 1,
      name: '',
      description: 'Descrição...',
      duration: '58:00',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('Should fail validation when duration format is invalid', () => {
    const invalidData = {
      number: 1,
      name: 'Pilot',
      description: 'Descrição...',
      duration: 'invalid',
    };

    const result = episodeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
