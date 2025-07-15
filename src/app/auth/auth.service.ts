import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.models';
import { environment } from '../environments/environment';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next({ id: payload.id, role: payload.role } as User);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken',  res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          const payload = JSON.parse(atob(res.accessToken.split('.')[1]));
          this.userSubject.next({ id: payload.id, role: payload.role } as User);
        })
      )
      .toPromise();
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    const token = localStorage.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/auth/refresh`, { token })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken);
        })
      )
      .toPromise();
  }

}
