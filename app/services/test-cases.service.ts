import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestCasesService {
  private token = 'MTI0OTgzODY0NDEwOnUKBm5wszEO0XVTRp9gFbClJWpk';
  private apiUrl = '/api/rest/tests/1.0/testcase/search';
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
  }

  private createParams(query: string): any {
    return {
      fields:
        'id,key,projectId,name,averageTime,estimatedTime,labels,folderId,componentId,status(id,name,i18nKey,color),priority(id,name,i18nKey,color),lastTestResultStatus(name,i18nKey,color),majorVersion,createdOn,createdBy,updatedOn,updatedBy,customFieldValues,owner,folderId',
      query,
      startAt: '0',
      maxResults: '40',
      archived: 'false',
    };
  }

  getTotalTestCases(): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<any>(this.apiUrl, {
        headers: this.createHeaders(),
        params: this.createParams('testCase.projectId IN (15500)'),
      })
      .pipe(map((response) => response.total));
  }

  getTotalSmokeTests(): Observable<number> {
    return this.http
      .get<any>(this.apiUrl, {
        headers: this.createHeaders(),
        params: this.createParams(
          'testCase.projectId IN (15500) AND testCase.folderTreeId IN (9901)'
        ),
      })
      .pipe(map((response) => response.total));
  }

  getTotalRegressionTests(): Observable<number> {
    return this.http
      .get<any>(this.apiUrl, {
        headers: this.createHeaders(),
        params: this.createParams(
          'testCase.projectId IN (15500) AND testCase.folderTreeId IN (9911)'
        ),
      })
      .pipe(map((response) => response.total));
  };

  getTotalFunctionalFeatureTests(): Observable<number> {
    return this.http
    .get<any>(this.apiUrl, {
      headers: this.createHeaders(),
      params: this.createParams(
        'testCase.projectId IN (15500) AND testCase.folderTreeId IN (9959)'
      ),
    })
    .pipe(map((response) => response.total));
  };
}
