import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/auth';

  register(dto: RegisterDto) {
    return this.http
      .post(`${this.url}/register`, dto)
      .subscribe((res) => console.log(res));
  }
}
