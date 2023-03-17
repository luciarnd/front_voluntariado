import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/empresas')
  }

  show(idEmpresa: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/empresa/${idEmpresa}`)
  }

  create(empresa: Empresa): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/empresa', empresa)
  }

  delete(idEmpresa: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/empresa/${idEmpresa}`);
  }

  update(empresa: Empresa): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/empresas/${empresa.id}`, empresa);
  }


}
