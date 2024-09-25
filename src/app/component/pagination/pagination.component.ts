import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngbd-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
})
export class NgbdpaginationBasicComponent {
  @Input() collectionSize = 0;
  @Input() pageSize = 10;
  @Input() page = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  get pageRange(): number[] {
    const range: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  selectPage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageChange.emit(newPage);
    }
  }
}
