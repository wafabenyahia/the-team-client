import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.webservice.baseUrl;

  constructor(private http: HttpClient ) { }
  public authenticate(login: Login) {

    return  this.http.post(this.baseUrl + 'token', login);
  }
}
