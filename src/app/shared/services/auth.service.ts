import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from './token.storage';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, catchError, Observable, of, pluck, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  login(username: string, password: string): Observable<User> {
    
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getProfile(): Observable<User | null> {
    return this.http.get<User>(`${environment.apiUrl}/api/auth/me`).pipe(
      tap((user) => this.setUser(user)),
      catchError(() => of(null))
    );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }
}
