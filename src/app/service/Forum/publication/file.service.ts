import { Injectable } from '@angular/core';


import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  downloadFile(nameFile: String): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'downloadFile/' + nameFile, {
      headers: this.headers,
      responseType: 'blob'
    });

  }
}
