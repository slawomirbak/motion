import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbstractHttpService<T> {
  constructor(protected httpClient: HttpClient) {}

  protected baseEndpoint = '';

  getList = (fitlers = {}): Observable<T[]> => {
    return this.httpClient
      .get<T[]>(
        `${environment.apibaseUrl}${this.baseEndpoint}` +
          this.serializeFilters(fitlers)
      )
      .pipe(
        map((res: T[]) => {
          return res;
        }),
        catchError(this.errorHandling)
      );
  }

  getOne = (id: string, optional: string = ''): Observable<T> => {
    return this.httpClient
      .get<T>(
        `${environment.apibaseUrl}${this.baseEndpoint}/${id}${optional}`
      )
      .pipe(
        map((res: T) => {
          return res;
        }),
        catchError(this.errorHandling)
      );
  };

  put = (data: T, optional: string = ''): Observable<T> => {
    return this.httpClient
      .put<T>(
        `${environment.apibaseUrl}${this.baseEndpoint}${optional}`,
        data
      )
      .pipe(
        map((res: T) => {
         return res;
        }),
        catchError(this.errorHandling)
      );
  }

  post = (data: T, optional: string = ''): Observable<T> => {
    return this.httpClient
      .post<T>(
        `${environment.apibaseUrl}${this.baseEndpoint}${optional}`,
        data
      )
      .pipe(
        map((res: T) => {
          return res;
        }),
        catchError(this.errorHandling)
      );
  }

  private errorHandling(error: any): Observable<any> {
    console.error(error);
    return throwError(error);
  }

  private serializeFilters(filters: any): string {
    const query = [];

    for (const p in filters) {
      if (filters.hasOwnProperty(p) && filters[p]) {
        query.push(
          encodeURIComponent(p) + '=' + encodeURIComponent(filters[p])
        );
      }
    }
    return query.join('&').length ? '?' + query.join('&') : '';
  }
}
