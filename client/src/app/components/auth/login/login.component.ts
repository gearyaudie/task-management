import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      console.log(user);
      console.log(JSON.parse(localStorage.getItem('user')));
    });
  }

  handleSubmit(formData) {
    console.log('FORM IS SUBMITTED -----------------------');
    const userData = {
      email: formData.form.controls.email.value,
      password: formData.form.controls.password.value,
    };
    console.log(userData);
    this.authService.login(userData).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}
