import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {

  bookings: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMyBookings().subscribe((res: any) => {
      this.bookings = res.data;
    });
  }
}