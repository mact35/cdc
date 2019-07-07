import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, throwError } from 'rxjs';
import { retry} from 'rxjs/operators'
import {Entidad} from '../model/entidad';
//import {Config} from './../config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(public _http: HttpClient) { }
  
  public getEntidades(): Observable<Entidad>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //const options = new RequestOptions({headers: headers});
    return this._http
    .get<Entidad>(`${environment.API_SERVER_URL}/entidades/`, {headers})
    .pipe(retry(1));
    //.map(response => response.json());
  }
}
