import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/Auth';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuth: Auth | undefined;

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  login() {
    return this.http.get<Auth>(this.baseUrl + '/usuarios/1').pipe(
      tap((auth) => (this.userAuth = auth)),
      tap((auth) => localStorage.setItem('id', auth.id))
    );
  }

  get auth() {
    return { ...this.userAuth };
  }

  logout() {
    localStorage.removeItem('id');
    this.userAuth = undefined;
  }

  verificarAuth(): Observable<boolean>  {
    if (!localStorage.getItem('id')) {
      return of(false);
    }

    return this.http.get(this.baseUrl + '/usuarios/1').pipe(
      map((auth:any) => {
        this.userAuth=auth;
        return (true);
      })
    );
  }
}
