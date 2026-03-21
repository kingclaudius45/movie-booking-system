import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  formData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.api.register(this.formData).subscribe((res: any) => {
      alert('Registered successfully');
      this.router.navigate(['/login']);
    });
  }
}