import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ZephyrService {
    private serverUrl = 'http://localhost:3002';

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer MTI0OTgzODY0NDEwOnUKBm5wszEO0XVTRp9gFbClJWpk',
        });
    }

    createZpTestCycle(name: any, folder: any): Observable<any> {
        const url = `${this.serverUrl}/testcase`;
        const body = { name, folder, projectKey: 'PROMAWS' };
        return this.http.post(url, body, { headers: this.getHeaders() });
    }

    getReq(): Observable<any> {
        const url = 'http://localhost:3002/testcase/search';
        return this.http.get(url);
    }
}
