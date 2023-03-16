import { Component, OnInit } from'@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors:any = null;
  loggedUser!: User;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService:
    AuthService,
    private token: TokenService,
    private authState:
    AuthStateService
  ) {
    this.loginForm = this.fb.group({
    email: [],
    password: [],
  });
  }

  ngOnInit() {}
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
    (result) => {
      this.loggedUser = result;
      this.responseHandler(result);
    },
    (error) => {
    this.errors = error.error;
    },
    () => {
    this.authState.setAuthState(true);
    this.loginForm.reset();
    this.router.navigate(['']);
    }
    );
  }
  // Handle response
  responseHandler(data:any) {

    this.token.handleData(data.access_token);
  }

}


