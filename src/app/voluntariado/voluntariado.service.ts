import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/auth.service';
import { Voluntariado } from './voluntariado';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoService {

  constructor(private http: HttpClient) {
   }

   index(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/api/voluntariados');
   }

   show(idVoluntariado: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/voluntariado/${idVoluntariado}`)
   }

   create(voluntariado: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json');

    return this.http.post('http://127.0.0.1:8000/api/voluntariado', voluntariado, {
      headers: headers
    });
   }

   update(idVoluntariado: number, voluntariado: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.delete('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json');

    return this.http.post(`http://127.0.0.1:8000/api/voluntariado/${idVoluntariado}`, voluntariado, {
      headers: headers
    });
   }

   delete(idVoluntariado: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/voluntariado/${idVoluntariado}`)
   }

   subscribirse(user: number, idVoluntariado: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/subscribirse/${idVoluntariado}`,
    {
      user: user
    })
   }

   userVoluntariado(voluntariado: Voluntariado): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/voluntariado/subscritos/${voluntariado.id}`)
   }
}
