import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class TaskInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          console.log('Interceptor running NO USER -----');
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user.token}`,
        });
        const modifiedReq = req.clone({
          headers,
        });
        console.log('Interceptor running -----');
        return next.handle(modifiedReq);
      })
    );
  }
}
