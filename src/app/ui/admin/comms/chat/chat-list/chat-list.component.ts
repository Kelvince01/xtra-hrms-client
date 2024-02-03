import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '@shared/components/pagination/pagination.component';
import {ChatService} from '@data/services/comms.service';

@Component({
  selector: 'xtra-chat-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  template: `
    <div class="data-list">
      @for (item of paginatedData; track item.id; let idx = $index, e = $even) {
        <!--            Item #{{ idx }}: {{ item.name }}-->
        <!--            *ngFor="let item of paginatedData; trackBy: trackByFn"-->
        <div>{{ item }}</div>
      }
    </div>

    <xtra-pagination
      [currentPage]="currentPage"
      [itemsPerPage]="itemsPerPage"
      [totalItems]="totalItems"
      (pageChanged)="onPageChange($event)"
    ></xtra-pagination>

    <div class="pagination-controls">
      <button (click)="goToPreviousPage()" [disabled]="currentPage === 1">Previous</button>
      <button (click)="goToNextPage()" [disabled]="currentPage === totalPages">Next</button>
      <select (change)="goToPage($any($event).target.value)">
        @for (page of pageNumbers; track page) {
          <option [value]="page">{{ page }}</option>
        }
      </select>
    </div>
  `,
  styles: [],
})
export class ChatListComponent implements OnInit {
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  protected totalPages: number = 0;

  constructor(private dataService: ChatService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private cachedData: any[] = [];

  fetchData(): void {
    if (this.cachedData) {
      this.paginatedData = this.cachedData.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage,
      );
    } else {
      this.dataService.getPaginatedData(this.currentPage, this.itemsPerPage).subscribe(
        (data) => {
          this.paginatedData = data.results;
          this.totalItems = data.totalItems;
          this.cachedData = data.results; // Store the fetched data for future use
        },
        (error) => {
          // Handle error
        },
      );
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

  goToPage(page: string): void {
    const pageNumber = parseInt(page, 10);
    if (
      pageNumber &&
      pageNumber >= 1 &&
      pageNumber <= this.totalPages &&
      pageNumber !== this.currentPage
    ) {
      this.currentPage = pageNumber;
      this.fetchData();
    }
  }

  get pageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, index) => index + 1);
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Replace "id" with the unique identifier of your data item
  }
}
