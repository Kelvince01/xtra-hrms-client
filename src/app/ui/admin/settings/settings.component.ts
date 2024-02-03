import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatActionList, MatListItem} from '@angular/material/list';
import {Company} from '@data/models/common.model';

/** List of companies (for display in console) */
export interface CompanyListItem {
  id: string;
  name: string;
}

@Component({
  selector: 'xtra-settings',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatActionList, MatListItem],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Settings</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <mat-action-list>
          <button mat-list-item (click)="reset()">Reset database to initial state</button>
          <button mat-list-item (click)="createCompany()">Create a new company</button>
          <button mat-list-item (click)="dumpCache()">Dump current app cache to console</button>
        </mat-action-list>

        <hr />

        <h2>Companies</h2>
        <div>Current Company: {{ currentCompany ? currentCompany.legalName : 'none' }}</div>
        <h3 style="margin: 1rem 0 0 0;">Company List:</h3>
        <mat-action-list dense>
          @for (item of companyList; track item) {
            <button mat-list-item (click)="load(item.id)">{{ item.name }}</button>
          }
        </mat-action-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  companyList: CompanyListItem[] = [];
  currentCompany?: Company;

  constructor() {} // private dataService: DataService

  ngOnInit(): void {
    this.getCurrentCompany();
    // this.getCompanyList().subscribe();
  }

  createCompany(): void {
    // New company number will be highest existing "New Company" number plus 1
    /*const coNum = this.companyList.reduce((acc, c) => {
      const match = c.name.match(/^New Company (\d*)$/);
      return match ? Math.max(1 + +match[1], acc) : acc;
    }, 1);
    this.dataService.createCompany(`New Company ${coNum}`).subscribe(({ company: newCo }) => {
      const id = newCo!.id;
      this.companyList.push({ id, name: newCo!.legalName! });
      this.load(id);
    });*/
  }

  getCompanyList(): any {
    // return this.dataService.getCompanyList().pipe(tap(list => (this.companyList = list)));
  }

  getCurrentCompany(): any {
    // const cache = this.dataService.cacheNow();
    // return (this.currentCompany = cache.company);
  }

  dumpCache(): void {
    // this.dataService.dumpCache();
  }

  load(id: string): void {
    // this.dataService.loadCompanyById(id).subscribe(_ => {
    //   this.getCurrentCompany();
    // });
  }

  reset(): void {
    /*const cache = this.dataService.cacheNow();
    const currentId = cache.currentCompanyId;
    this.dataService.resetDb();
    this.getCompanyList()
      .pipe(
        concatMap(list => {
          const id = list.some(c => c.id === currentId) ? currentId : list[0].id;
          return this.dataService.loadCompanyById(id);
        })
      )
      .subscribe(_ => {
        this.getCurrentCompany();
      });*/
  }
}
