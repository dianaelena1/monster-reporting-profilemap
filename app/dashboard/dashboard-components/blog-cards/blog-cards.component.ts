import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { blogcard, blogcards } from './blog-cards-data';
import { NgbdpaginationBasicComponent } from '../../../component/pagination/pagination.component';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html',
  standalone: true,
  imports: [CommonModule, NgbdpaginationBasicComponent],
})
export class BlogCardsComponent implements OnInit {
  blogcards: blogcard[];
  pagedBlogcards: blogcard[] = [];
  page = 1;
  pageSize = 4;

  constructor() {
    this.blogcards = blogcards;
  }

  ngOnInit(): void {
    this.updatePagedBlogcards();
  }

  updatePagedBlogcards(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBlogcards = this.blogcards.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.updatePagedBlogcards();
  }
}
