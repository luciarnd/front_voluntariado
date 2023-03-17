import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService, User } from 'src/app/shared/auth.service';
import { Voluntariado } from '../../voluntariado';
import { VoluntariadoService } from '../../voluntariado.service';

@Component({
  selector: 'app-voluntariado',
  templateUrl: './voluntariado.component.html',
  styleUrls: ['./voluntariado.component.css']
})
export class VoluntariadoComponent implements OnInit{
  voluntariados!: Voluntariado[];
  errors: any = null;
  userForm: FormGroup;
  user!: User;

  constructor(private voluntariadoService: VoluntariadoService, private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      email: [],
      nombre: [],
      password: [],
    })
  }

  ngOnInit() {
    this.getVoluntariados();
  }

  getVoluntariados() {
    this.voluntariadoService.index().subscribe(data => {
      this.voluntariados = data;
      console.log(data)
    })
  }
  subscribe(valuntariado: Voluntariado) {
    this.authService
      .getUserByEmail(this.userForm.value.email)
      .subscribe(result => {
        this.user = result;
      });

        if (this.user != undefined) {
          console.log(this.user);
          this.voluntariadoService
            .subscribirse(this.user.id, valuntariado.id)
            .subscribe(
              (result) => {
                console.log(result);
              },
              (error) => {
                this.errors = error.error;
              }
            );
        } else {
          this.authService.addUser(this.userForm.value).subscribe((result) => {
            console.log(result);
            this.voluntariadoService
              .subscribirse(result.user.id, valuntariado.id)
              .subscribe(
                (result) => {
                  console.log(result);
                },
                (error) => {
                  this.errors = error.error;
                }
              );
          });
        }
  }
}
