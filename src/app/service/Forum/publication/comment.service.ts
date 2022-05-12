import { Injectable } from '@angular/core';
import {Publication} from '../../../model/forum/publication/publication.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Comment} from '../../../model/forum/publication/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }
  add(comment: Comment, id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'comment/' + id, comment, {
      headers: this.headers
    });
  }

  modify(comment: Comment) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.put(this.baseUrl + 'comment', comment, {
      headers: this.headers
    });
  }

  remove(id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.delete(this.baseUrl + 'comment/' + id, {
      headers: this.headers
    });
  }
  findById(id: number): Observable<any> {

    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'comment/' + id , {
      headers: this.headers
    });
  }

  list(): Observable<Comment[]> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    // @ts-ignore
    return this.http.get(this.baseUrl + 'comment', {
      headers: this.headers
    });
  }
  findAllByPublicationId(id: number): Observable<Comment[]> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    // @ts-ignore
    return this.http.get(this.baseUrl + 'comment/pub/' + id, {
      headers: this.headers
    });
  }
  findAllPluspersitant(id: number): Observable<Comment[]> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});

    // @ts-ignore
    return this.http.get(this.baseUrl + 'comment/pluspersitance/' + id, {
      headers: this.headers
    });
  }
  addsouscomment(id: number, scom: string ) {
    let fd: FormData;
    fd = new FormData();
    fd.append('sous_comment', scom);
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.put(this.baseUrl + 'comment/sous_comment/' + id, fd, {
      headers: this.headers
    });
  }
  badword(word: string) {
    let wo = word;
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'dict/' + wo, null, {
      headers: this.headers,
    responseType: 'text'
    });
  }

}
