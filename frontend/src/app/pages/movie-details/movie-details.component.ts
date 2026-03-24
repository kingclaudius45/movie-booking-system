import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  shows: any[] = [];
  selectedShow: any = null;
  selectedSeats: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

   ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Load movie
    this.api.getMovies().subscribe((res: any) => {
      this.movie = res.data.find((m: any) => m._id === id);
    });

    // Load shows
    this.api.getShows(id!).subscribe((res: any) => {
      this.shows = res.data;
    });
  }

  selectShow(show: any) {
    this.selectedShow = show;
  }

  isBooked(seat: number): boolean {
  return this.selectedShow.bookedSeats.includes(seat);
}

isSelected(seat: number): boolean {
  return this.selectedSeats.includes(seat);
}

toggleSeat(seat: number) {
  if (this.isBooked(seat)) return;

  if (this.isSelected(seat)) {
    this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
  } else {
    this.selectedSeats.push(seat);
  }
}
bookSeats() {
  const payload = {
    showId: this.selectedShow._id,
    seats: this.selectedSeats
  };

  this.api.bookSeats(payload).subscribe((res: any) => {
    alert('Booking successful 🎉');

    // refresh seats
    this.selectedShow.bookedSeats.push(...this.selectedSeats);
    this.selectedSeats = [];
  });
}
}