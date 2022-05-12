import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Comment} from '../../../model/forum/publication/comment';
import {Observable} from 'rxjs';
import {Estimation} from '../../../model/forum/publication/estimation';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {
  baseUrl = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }
  add(estimation: Estimation, id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'estimation/' + id, estimation, {
      headers: this.headers
    });
  }

  findAllByCommentId(id: number): Observable<Comment[]> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    // @ts-ignore
    return this.http.get(this.baseUrl + 'estimation/' + id, {
      headers: this.headers
    });
  }
  badword(word: string) {
    let wo = word;
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'estimation/emoji/' + wo , {
      headers: this.headers
    });
  }
}
