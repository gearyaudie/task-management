import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(userData) {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((data: any) => {
        const user = {
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        };
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  autoLogin() {
    const userData: {
      name: string;
      email: string;
      token: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      this.user.next(null);
      localStorage.removeItem('user');
      console.log('AUTO LOGIN NO USER');
      return;
    }
    console.log('AUTO LOGIN USER');
    this.user.next(userData);
  }

  register(data) {
    this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    return this.http.post<void>(`${this.apiUrl}/logout`, null).pipe(
      tap(() => {
        this.user.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
    );
  }
}
