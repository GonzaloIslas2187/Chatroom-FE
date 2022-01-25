import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISession } from '../models/session.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private basePath = environment.api + '/Credential'
  private currentUser: Subject<ISession> = new Subject<ISession>()

  currentUser$: Observable<ISession> = this.currentUser.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  register(email: string, password: string): Observable<ISession> {
    const body = {
      email,
      password
    };

    return this.http.post<ISession>(this.basePath + '/Register', body).pipe(
      tap((res) => this.setCurrentUser(res))
    );
  }

  login(email: string, password: string): Observable<ISession> {
    const body = {
      email,
      password
    };

    

    return this.http.post<ISession>(this.basePath + '/Login', body).pipe(
      tap((res) => this.setCurrentUser(res))
    );
  }

  logout(): void {
    this.storageService.removeValue('session');
    this.currentUser.next(undefined);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): ISession {
    const session = this.storageService.getValue<ISession>('session');
    this.currentUser.next(session);
    return session;
  }

  private setCurrentUser(session: ISession): void {
    this.storageService.setValue('session', session);
    this.currentUser.next(session);
  }  
}
