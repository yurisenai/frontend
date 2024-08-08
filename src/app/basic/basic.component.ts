import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
// may need to manually import Buffer after installing it
import { Buffer } from 'buffer';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css'
})
export class BasicComponent {

  constructor(private http: HttpClient) {}

  username: string = 'admin';
  password: string = 'skillstorm';
  baseUrl: string = 'http://localhost:8081/message';

  // unauthenticated endpoint, just printing results to console
  goToMessage() {
    this.http.get(this.baseUrl, { observe: 'response' }).subscribe(data => {
      console.log(data.body);
    });
  }

  // this one requires authentication
  // we need to encode our auth string
  // then create a header with it appended
  // then attach the header to the request
  goToMessageSpecific() {
    // encoding our auth string
    // this method is technically being deprecated but still works
    let authString: string = btoa(this.username + ':' + this.password);
    // console.log(authString);
    let decodedAuthString: string = atob(authString);
    // console.log(decodedAuthString);

    // this method does the same thing but is forward-looking
    // must install Buffer for this to work -- npm i buffer
    authString = Buffer.from(this.username + ':' + this.password).toString('base64');
    // console.log(authString);

    // creating a new headers object and appending our auth string to it
    // note that, for basic auth, we need 'Basic ' at the beginning
    let headers: HttpHeaders = new HttpHeaders;
    headers = headers.append('Authorization', "Basic " + authString);

    this.http.get(this.baseUrl + '/specific', { headers: headers, observe: 'response' }).subscribe(data => {
      console.log(data.body);
    });
  }

  goToMessageAPI2() {
    let headers = this.createHeaders();
    this.http.get(this.baseUrl + '/api2', { headers: headers, observe: 'response' }).subscribe(data => {
      console.log(data.body);
    });
  }

  createHeaders(): HttpHeaders {
    let authString: string = Buffer.from(this.username + ':' + this.password).toString('base64');
    let headers: HttpHeaders = new HttpHeaders;
    headers = headers.append('Authorization', "Basic " + authString);
    return headers;
  }

}
