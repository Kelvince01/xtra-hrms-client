import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CandidatesService} from '@services/recruitments.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {createSearch} from '@shared/functions/create-search.func';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'xtra-candidate-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgForOf, AsyncPipe],
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
        <tr *ngFor="let candidate of candidates$ | async">
          <td>
            <a [routerLink]="[candidate.id]">{{ candidate.firstName }} {{ candidate.lastName }}</a>
          </td>
          <td>{{ candidate.email }}</td>
          <td>{{ candidate.position }}</td>
        </tr>
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
    this.search$.subscribe((value) => {
      if (value) {
        this.candidates$ = this.candidateService.getCandidatesByName(value);
      } else {
        this.candidates$ = this.candidateService.get();
      }
    });
  }
}
