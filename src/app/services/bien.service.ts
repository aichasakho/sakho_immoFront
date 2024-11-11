// biens.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bien } from '../models/bien.model';

@Injectable({
  providedIn: 'root'
})
export class BiensService {
  private apiUrl = 'http://localhost:8000/api/biens';

  constructor(private http: HttpClient) {}

  getBiens(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl);
  }

  createBien(bien: FormData): Observable<Bien> {
    return this.http.post<Bien>(this.apiUrl, bien);
  }

  updateBien(id: number, bien: FormData): Observable<Bien> {
    return this.http.put<Bien>(`${this.apiUrl}/${id}`, bien);
  }

  /*deleteBien(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/biens/${id}`);
  }*/

  deleteBien(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  appelBien(bien: Bien): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${bien.id}/appeler`, {});
  }

  contacterBien(bien: Bien): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${bien.id}/contacter`, {});
  }
}
