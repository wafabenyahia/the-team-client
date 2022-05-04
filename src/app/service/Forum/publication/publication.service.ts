import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Publication} from '../../../model/forum/publication/publication.model';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';



@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  baseUrl = environment.webservice.baseUrl;
 private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  add(publication: Publication) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'publication', publication, {
     headers: this.headers
    });
  }

  modify(pub: Publication) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.put(this.baseUrl + 'publication', pub, {
     headers: this.headers
    });
  }

  remove(id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.delete(this.baseUrl + 'publication/' + id, {
     headers: this.headers
    });
  }
  findById(id: number): Observable<any> {

    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'publication/' + id , {
     headers: this.headers
    });
  }

  list(): Observable<Publication[]> {
    console.log(localStorage.getItem('token'));
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'publication', {
     headers: this.headers
    });
  }
}
