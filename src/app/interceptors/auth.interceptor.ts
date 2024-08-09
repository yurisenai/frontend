import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  // DON'T FORGET TO ADD THIS TO THE PROVIDERS IN app.config.ts!!
 
  token: string = '';
 
  // grabbing our token value from the TokenService
  constructor(private tokenService: TokenService) {
    this.tokenService.token.subscribe(data => this.token = data);
  }
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // cloning our request and adding our auth header
    if(this.token) {
 
    let request2 = request.clone({
      headers: request.headers.set('Authorization', 'Basic ' + this.token)
    });
   
    // checking out our outgoing headers
    console.log(request2.headers);
 
    return next.handle(request2);
    } else {
      console.log(request.headers)
      return next.handle(request);
    }
  }
}