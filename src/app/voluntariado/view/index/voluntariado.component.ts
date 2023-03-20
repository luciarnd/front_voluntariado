import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Voluntariado } from '../../voluntariado';
import { VoluntariadoService } from '../../voluntariado.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { Empresa } from 'src/app/empresa/empresa';

@Component({
  selector: 'app-voluntariado',
  templateUrl: './voluntariado.component.html',
  styleUrls: ['./voluntariado.component.css'],
})
export class VoluntariadoComponent implements OnInit {
  voluntariados!: Voluntariado[];
  empresas: Empresa[] = []
  errors: any = null;
  loggedUser!: boolean;

  userForm: FormGroup;
  addVoluntariadoForm!: FormGroup;
  updateVoluntariadoForm: FormGroup;

  user!: any;
  updateVoluntariado!: Voluntariado;

  constructor(
    private voluntariadoService: VoluntariadoService,
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: AuthStateService,
    private empresaService: EmpresaService
  ) {
    this.auth.userAuthState.subscribe((val) => {
      this.loggedUser = val;
      console.log(this.loggedUser);
    });

    this.userForm = this.fb.group({
      email: [],
      nombre: [],
      password: [],
    });

    this.addVoluntariadoForm = this.fb.group({
      ciudad: [],
      descripcion: [],
      id: [],
      empresa: []
    });

    this.updateVoluntariadoForm = this.fb.group({
      ciudad: [],
      descripcion: [],
      id: [],
      empresa : [],
    });
  }

  ngOnInit() {
    this.getVoluntariados();
    this.getEmpresas();
  }

  getVoluntariados() {
    this.voluntariadoService.index().subscribe((data) => {
      this.voluntariados = data;
      console.log(data);
    });
  }

  userExist(voluntariado: Voluntariado) {
    this.authService
      .getUserByEmail(this.userForm.value.email)
      .subscribe((result) => {
        this.user = result;
        console.log(this.user);

        if (this.user != undefined) {
          this.subscribirse(voluntariado);
        } else {
          this.addUserSubscribe(voluntariado);
        }
      });
  }

  addUserSubscribe(voluntariado: Voluntariado) {
    console.log(this.userForm.value);
    this.authService.addUser(this.userForm.value).subscribe((result) => {
      console.log(result);
      this.voluntariadoService
        .subscribirse(result.user.id, voluntariado.id)
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

  subscribirse(valuntariado: Voluntariado) {
    var userId = this.user.id;
    console.log(userId);
    this.voluntariadoService.subscribirse(userId, valuntariado.id).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      }
    );
  }

  save() {
    parseInt(this.addVoluntariadoForm.value.empresa_id)
    this.voluntariadoService.create(this.addVoluntariadoForm.value).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        this.errors = error.error;
      }
    );
    this.addVoluntariadoForm.reset();
  }

  borrar(idVol: number) {
    this.voluntariadoService.delete(idVol).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        this.errors = error.error;
      }
    );
  }

  updateModal(voluntariado: Voluntariado) {
    this.updateVoluntariado = voluntariado;
  }

  update() {
    this.voluntariadoService
      .update(this.updateVoluntariadoForm.value)
      .subscribe(
        (result) => {
          console.log(result);
          this.ngOnInit();
        },
        (error) => {
          this.errors = error.error;
        }
      );
  }

  getEmpresas() {
    this.empresaService.index().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
  }
}
