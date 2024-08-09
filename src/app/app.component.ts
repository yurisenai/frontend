import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { TokenService } from './services/token.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient, private token: TokenService){};

  username: string = 'itsme';
  password: string = 'password'
  baseUrl: string = ' http://localhost:8080'

  isAuthenticated: boolean = false;

  login(){
    this.isAuthenticated = true;
 

    let authString = Buffer.from(this.username + ':' + this.password ).toString('base64');

    this.token.setToken(authString);

  }

  createHeaders(): HttpHeaders {
    let authString: string = Buffer.from(this.username + ':' + this.password).toString('base64');
    let headers: HttpHeaders = new HttpHeaders;
    headers = headers.append('Authorization', "Basic " + authString);
    return headers;
  }
}
