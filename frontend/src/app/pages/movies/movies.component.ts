import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMovies().subscribe((res: any) => {
      this.movies = res.data;
    });
  }
}