import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CandidatesService } from '@services/recruitments.service';
import { createSearch } from '@shared/functions/create-search.func';

@Component({
  selector: 'xtra-candidate-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  template: `
    <h2>Candidates list</h2>
    <table>
      <caption>
        Search:
        <input [formControl]="searchControl" />
      </caption>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        @for (candidate of candidates$ | async; track candidate) {
          <tr>
            <td>
              <a [routerLink]="[candidate.id]">
                {{ candidate.firstName }} {{ candidate.lastName }}
              </a>
            </td>
            <td>{{ candidate.email }}</td>
            <td>{{ candidate.position }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateListComponent implements OnInit {
  private readonly candidateService = inject(CandidatesService);
  candidates$ = this.candidateService.get();
  searchControl = new FormControl('');
  search$ = createSearch(this.searchControl);

  ngOnInit(): void {
    this.search$.subscribe(value => {
      if (value) {
        this.candidates$ = this.candidateService.getCandidatesByName(value);
      } else {
        this.candidates$ = this.candidateService.get();
      }
    });
  }
}
