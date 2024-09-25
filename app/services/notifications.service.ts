import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private notifications: Subject<any> = new Subject<any>();

    constructor(private webSocketService: WebSocketService) {
        // Connect to WebSocket server
        this.webSocketService.connect('ws://your-websocket-url');

        // Subscribe to WebSocket messages
        this.webSocketService.getMessages().subscribe((message) => {
            this.notifications.next(JSON.parse(message));
        });
    }

    getNotifications(): Observable<any> {
        return this.notifications.asObservable();
    }

    // Method to add internal notifications
    addNotification(notification: any): void {
        this.notifications.next(notification);
    }
}
