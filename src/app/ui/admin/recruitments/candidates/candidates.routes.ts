import {Routes} from '@angular/router';
import {CandidatePageComponent} from '@admin-ui/recruitments/candidates/candidate-page/candidate-page.component';
import {candidateDetailsResolver} from '@data/resolvers/candidate.resolver';
import {CandidateListComponent} from '@admin-ui/recruitments/candidates/candidate-list/candidate-list.component';

export const candidatesRoutes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '', pathMatch: 'full', component: CandidateListComponent},
  {path: ':id', component: CandidatePageComponent, resolve: {candidate: candidateDetailsResolver}},
  /*
  {
    path: 'add',
    component: CandidateUpsertComponent
  },
  {
    path: 'edit:/id',
    component: CandidateUpsertComponent
  }
   */
];
