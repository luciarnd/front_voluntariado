import { Component } from '@angular/core';
import { User } from './components/user-profile/user-profile.component';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';
import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_voluntariado';
  loggedUser!: boolean;

  constructor(private auth: AuthStateService, private authService: AuthService, public token: TokenService) {
    this.auth.userAuthState.subscribe((val) => {
      this.loggedUser = val;
    })
  }

  logout(user: any) {
    this.auth.setAuthState(false);
    this.token.removeToken();
  }
}
