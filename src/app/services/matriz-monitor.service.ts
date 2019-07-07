import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, throwError } from 'rxjs';
import { retry} from 'rxjs/operators'
import {MatrizMonitor} from '../model/MatrizMonitor'
import { EntidadBusqueda } from '../model/entidadBusqueda';
//import {Config} from './../config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatrizMonitorService {

  constructor(public _http: HttpClient) { }
  
  public getMatrizMonitor(ent: EntidadBusqueda): Observable<MatrizMonitor>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //const options = new RequestOptions({headers: headers});
    return this._http
    .get<MatrizMonitor>(`${environment.API_SERVER_URL}/matriz-monitor/${ent.fecha}/${ent.cEntidad}/${ent.cTipoEntidad}/${ent.cOtraEntidad}`, {headers})
    .pipe(retry(1));
    //.map(response => response.json());
  }

  public getMatrizMonitorDetalle(id: number, cods: String): Observable<MatrizMonitor>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //const options = new RequestOptions({headers: headers});
    return this._http
    .get<MatrizMonitor>(`${environment.API_SERVER_URL}/download/${id}/${cods}`, {headers})
    .pipe(retry(1));
    //.map(response => response.json());
  }
}
