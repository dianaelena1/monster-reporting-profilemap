import { Component, OnInit } from '@angular/core';
import { Feeds, Feed } from './notifications-data';
import { CommonModule } from '@angular/common';
import { blogcard } from '../blog-cards/blog-cards-data';
import { NgbdpaginationBasicComponent } from '../../../component/pagination/pagination.component';
import { WebSocketService } from '../../../services/websocket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feeds',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [CommonModule, NgbdpaginationBasicComponent],
})
export class NotificationsComponent implements OnInit {
  feeds: Feed[];
  pagedBlogcards: blogcard[] = [];
  page = 1;
  pageSize = 4;

  constructor(private webSocketService: WebSocketService) {
    this.feeds = Feeds;
  }

  ngOnInit(): void {
    this.webSocketService.connect('ws://localhost:8081');

    this.webSocketService.getMessages().subscribe((message) => {
      const feed = JSON.parse(message);
      this.feeds.unshift(feed); // Add new message to the top of the feeds array
    });
  }

  updatePagedBlogcards(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.feeds = this.feeds.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.updatePagedBlogcards();
  }
}
