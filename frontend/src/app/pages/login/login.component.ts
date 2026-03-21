import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.api.login(this.formData).subscribe((res: any) => {

      const token = res.data.token;

      this.auth.setToken(token);

      this.router.navigate(['/']);
    });
  }
}