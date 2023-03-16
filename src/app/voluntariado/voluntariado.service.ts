import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

   create(voluntariado: Voluntariado): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/voluntariado', voluntariado);
   }

   update(voluntariado: Voluntariado, idVoluntariado: number): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/voluntariado/${idVoluntariado}`, voluntariado);
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
}
