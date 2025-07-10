import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUsers {
  id?: number; 
  name: string;
  age: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private readonly http: HttpClient) { }

  
  selectall(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrl);
  }

  
  selectone(id: number): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.apiUrl}/${id}`);
  }

  
  create(user: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(this.apiUrl, user);
  }

  
  update(id: number, user: Partial<IUsers>): Observable<IUsers> {
    return this.http.patch<IUsers>(`${this.apiUrl}/${id}`, user);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
