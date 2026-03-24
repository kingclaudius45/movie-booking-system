import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Auth
  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // Movies
  getMovies() {
    return this.http.get(`${this.baseUrl}/movies`);
  }

  createMovie(data: any, token: string) {
    return this.http.post(`${this.baseUrl}/movies`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getShows(movieId: string) {
    return this.http.get(`${this.baseUrl}/shows/${movieId}`);
  }

  bookSeats(data: any) {
    return this.http.post(`${this.baseUrl}/bookings`, data);
  }
}