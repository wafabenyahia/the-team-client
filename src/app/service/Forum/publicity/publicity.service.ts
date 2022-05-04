import { Injectable } from '@angular/core';


import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Publicity} from '../../../model/forum/publicity/publicity';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  baseUrl = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  add(pub: Publicity, file: File ) {
    var datePipe = new DatePipe('en-US');
    let formdata = new FormData();
    formdata.append('name', pub.name);
    formdata.append('domain', pub.domain);
    formdata.append('dateDeb', datePipe.transform(pub.dateStart, 'dd.MM.yyyy'));
    formdata.append('dateFin',  datePipe.transform(pub.dateEnd, 'dd.MM.yyyy'));
    formdata.append('ageFin', pub.ageFin);
    formdata.append('ageDebut', pub.ageDebut);
    formdata.append('cost', pub.cost);
    formdata.append('domain', pub.domain);
    // formdata.append('nbVueCible', pub.nbInitTarget);
    // formdata.append('nbFinalViews',pub.nbFinalViews);
    formdata.append('upload', file);
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.post(this.baseUrl + 'publicity/pub', formdata, {
      headers: this.headers
    });
  }

  modify(pub: any) {
    console.log(pub);
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.put(this.baseUrl + 'publicity', pub, {
      headers: this.headers
    });
  }

  remove(id: number) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.delete(this.baseUrl + 'publicity/' + id, {
      headers: this.headers
    });
  }
  findById(id: number): Observable<Publicity> {

    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'publicity/' + id , {
      headers: this.headers
    });
  }

  list(): Observable<Publicity[]> {
    console.log(localStorage.getItem('token'));
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'publicity', {
      headers: this.headers
    });
  }
  manger(id: number): Observable<Publicity[]> {
    console.log(localStorage.getItem('token'));
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + JSON.parse(<string>localStorage.getItem('token'))});
    return this.http.get(this.baseUrl + 'publicity/ManagerUser/' + id, {
      headers: this.headers
    });
  }
}
