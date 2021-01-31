
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractHttpService {

  constructor(protected httpClient: HttpClient) { }


  getTest() {
    return this.httpClient.get('https://localhost:5001/api/home', {responseType: 'text'})
  }
}
