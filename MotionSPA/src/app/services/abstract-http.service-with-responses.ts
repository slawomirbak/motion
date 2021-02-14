import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface IBackendResponse<T> {
  isSuccessful: boolean;
  errorMessage: string;
  data: T;
}
@Injectable({
  providedIn: 'root',
})
export class AbstractHttpService<T> {
  constructor(protected httpClient: HttpClient) {}

  protected baseEndpoint = '';

  getList = (fitlers = {}): Observable<IBackendResponse<T[]>> => {
    return this.httpClient
      .get<IBackendResponse<T[]>>(
        `${environment.apibaseUrl}${this.baseEndpoint}` +
          this.serializeFilters(fitlers)
      )
      .pipe(
        map((res: IBackendResponse<T[]>) => {
          console.log(res);
          if (!res.isSuccessful) {
            throw new Error(res.errorMessage);
          }
          if (res.data) {
            return res.data;
          }
          return;
        }),
        catchError(this.errorHandling)
      );
  }

  getOne = (id: string, optional: string = '') => {
    return this.httpClient
      .get<IBackendResponse<T>>(
        `${environment.apibaseUrl}${this.baseEndpoint}/${id}${optional}`
      )
      .pipe(
        map((res: IBackendResponse<T>) => {
          if (!res.isSuccessful) {
            throw new Error(res.errorMessage);
          }
          if (res.data) {
            return res.data;
          }
          return;
        }),
        catchError(this.errorHandling)
      );
  };

  put = (data: T, optional: string = '') => {
    return this.httpClient
      .put<IBackendResponse<T>>(
        `${environment.apibaseUrl}${this.baseEndpoint}${optional}`,
        data
      )
      .pipe(
        map((res: IBackendResponse<T>) => {
          if (!res.isSuccessful) {
            throw new Error(res.errorMessage);
          }
          if (res.data) {
            return res.data;
          }
          return;
        }),
        catchError(this.errorHandling)
      );
  }

  post = (data: T, optional: string = ''): Observable<IBackendResponse<T>> => {
    return this.httpClient
      .post<IBackendResponse<T>>(
        `${environment.apibaseUrl}${this.baseEndpoint}${optional}`,
        data
      )
      .pipe(
        map((res: IBackendResponse<T>) => {
          if (!res.isSuccessful) {
            throw new Error(res.errorMessage);
          }
          if (res.data) {
            return res.data;
          }
          return;
        }),
        catchError(this.errorHandling)
      );
  };

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
