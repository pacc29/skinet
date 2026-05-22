import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() pageIndex = 1;
  @Input() pageSize = 6;
  @Input() totalCount = 0;
  maxSize = 10;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.goToPage(this.pageIndex + 1);
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.goToPage(this.pageIndex - 1);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  get pages(): number[] {
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }
}
