import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socket!: WebSocket;
    private subject: Subject<any>;

    constructor() {
        this.subject = new Subject<any>();
    }

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
            this.subject.next(event.data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    send(message: any): void {
        this.socket.send(JSON.stringify(message));
    }

    getMessages() {
        return this.subject.asObservable();
    }
}
