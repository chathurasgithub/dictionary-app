import { TestBed } from '@angular/core/testing';

import { ContactsubmissionService } from './contactsubmission.service';

describe('ContactsubmissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsubmissionService = TestBed.get(ContactsubmissionService);
    expect(service).toBeTruthy();
  });
});
