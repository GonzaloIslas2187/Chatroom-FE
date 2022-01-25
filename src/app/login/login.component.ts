import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authenticationService.login(this.email, this.password).subscribe(
      (res) => {
        this.router.navigate(['/chatroom']);
      },
      (err: HttpErrorResponse) => this.errorMessage = err.error
    );
  }

  register() {
    this.authenticationService.register(this.email, this.password).subscribe(
      (res) => {
        console.log('REGISTERED', res);
        this.router.navigate(['/chatroom']);
      },
      (err: HttpErrorResponse) => this.errorMessage = err.error
    );
  }
}
