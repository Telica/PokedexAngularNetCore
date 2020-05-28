import { TestBed } from '@angular/core/testing';

import { PokemonDataService } from './pokemon-data.service';

describe('PokemonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonDataService = TestBed.get(PokemonDataService);
    expect(service).toBeTruthy();
  });
});
