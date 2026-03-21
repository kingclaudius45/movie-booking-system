import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLogged = false;

  isLoggedIn$!: Observable<boolean>;


  constructor(private auth: AuthService) {
    this.isLogged = auth.isLoggedIn();
  }

   ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }

  logout() {
    this.auth.logout();
  }
}
