import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rating} from '../../../model/forum/publication/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseUrl = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  add(rating: Rating, id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'ratingPublication/' + id, rating, {
      headers: this.headers
    });
  }


  list(id): Observable<Rating[]> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    // @ts-ignore
    return this.http.get(this.baseUrl + 'ratingPublication/' + id, {
      headers: this.headers
    });
  }
}
