import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrick } from '../core/models/ITrick';
import { AbstractHttpService } from './abstract-http.service';

@Injectable({
  providedIn: 'root'
})
export class TricksService extends AbstractHttpService<ITrick> {

  baseEndpoint = 'api/tricks';

  tricks$ = this.getList();

  constructor(http: HttpClient) {
    super(http);
  }
}
