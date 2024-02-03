import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';

import {NgrxFormsFacade} from './forms.facade';
import {hot} from 'jasmine-marbles';
import {Injectable} from '@angular/core';

@Injectable()
export class NgrxFormsEffects {}

describe('NgrxFormsEffects', () => {
  let actions;
  let effects: NgrxFormsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgrxFormsEffects, provideMockActions(() => actions), NgrxFormsFacade],
    });

    effects = TestBed.inject(NgrxFormsEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', {a: {type: 'LOAD_DATA'}});
      expect(true).toBeTruthy();
    });
  });
});
