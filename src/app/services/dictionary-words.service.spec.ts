import { TestBed } from '@angular/core/testing';

import { DictionaryWordsService } from './dictionary-words.service';

describe('DictionaryWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DictionaryWordsService = TestBed.get(DictionaryWordsService);
    expect(service).toBeTruthy();
  });
});
