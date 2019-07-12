import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loginUser(credentials) {
    return this._http.post('http://localhost:3000/login', credentials).pipe(map(r => r));
  }

  registerUser(user) {
    return this._http.post('http://localhost:3000/users', user).pipe(map(r => r));
  }
  
}
