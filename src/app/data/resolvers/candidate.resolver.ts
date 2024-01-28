import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {ICandidate} from '@models/recruitments.model';
import {CandidatesService} from '@services/recruitments.service';

export const candidateDetailsResolver: ResolveFn<ICandidate> = (route: ActivatedRouteSnapshot) => {
  const candidateService = inject(CandidatesService);
  const id = +(route.paramMap.get('id') ?? 0);
  return candidateService.getById(id);
};
