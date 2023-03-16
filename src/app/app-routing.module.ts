import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { VoluntariadoComponent } from './voluntariado/view/index/voluntariado.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'voluntariados'},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: SigninComponent},
  {path: 'me', component: UserProfileComponent},
  {path: 'voluntariados', component: VoluntariadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
