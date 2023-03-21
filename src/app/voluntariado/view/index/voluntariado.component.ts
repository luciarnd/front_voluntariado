import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService, User } from 'src/app/shared/auth.service';
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
  messages: any = null;
  loggedUser!: boolean;
  users: User[] = [];
  suscribeVoluntariado!: Voluntariado;

  userForm: FormGroup;
  addVoluntariadoForm!: FormGroup;
  updateVoluntariadoForm: FormGroup;

  user!: any;
  updateVoluntariado!: Voluntariado;
  selectImage!: any;

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
      empresa: [],
      image: []
    });

    this.updateVoluntariadoForm = this.fb.group({
      ciudad: [],
      descripcion: [],
      id: [],
      empresa_id : [],
      image: []
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

  openSuscribeModal(voluntariado: Voluntariado) {
    this.suscribeVoluntariado = voluntariado
  }

 existUser(voluntariado: Voluntariado) {
    this.authService.getUserByEmail(this.userForm.value.email)
      .subscribe(
        (result) => {
          if(Object.keys(result).length !== 0) {
            this.subscribeExistUser(voluntariado);
          } else {
            this.subscribeNonExistUser(voluntariado)
          }
        },
        (error) => {
          this.errors = error.error;
        }
      )
  }

  subscribeExistUser(valuntariado: Voluntariado) {
    console.log(valuntariado)
    this.authService.getUserByEmail(this.userForm.value.email).subscribe((result) => {
      console.log(result);
      var id: number = result.map((item: { id: any; }) => {
        return item.id;
      });
      this.voluntariadoService
        .subscribirse(parseInt(id.toString()), valuntariado.id)
        .subscribe(
          (result) => {
            console.log(result);
            this.ngOnInit();
            this.userForm.reset()
            this.messages = result.message
          },
          (error) => {
            this.errors = error.error;
          }
        );
      }
    );
  }

  subscribeNonExistUser(voluntariado: Voluntariado) {
    this.authService.addUser(this.userForm.value).subscribe((result) => {
      console.log(result);
      this.voluntariadoService
        .subscribirse(result.id, voluntariado.id)
        .subscribe(
          (result) => {
            console.log(result);
            this.messages = result.message
            this.ngOnInit();
            this.userForm.reset();
          },
          (error) => {
            this.errors = error.error;
          }
        );
    });
  }

  getEmpresas() {
    this.empresaService.index().subscribe((result) => {
      this.empresas = result;
      console.log(result);
      this.messages = result.message
    },
    (error) => {
      this.errors = error.error;
    })
  }

  save() {
    const formData = new FormData();
    formData.append('image', this.selectImage);
    formData.append('ciudad', this.addVoluntariadoForm.value.ciudad);
    formData.append('descripcion', this.addVoluntariadoForm.value.descripcion);
    formData.append('empresa', this.addVoluntariadoForm.value.empresa)

    this.voluntariadoService.create(formData).subscribe(
      (result) => {
        console.log(result);
        this.messages = result.message
        this.ngOnInit();
        this.addVoluntariadoForm.reset();
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
        this.messages = result.message
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
    const formData = new FormData();
    if(this.selectImage != undefined) {
      formData.append('image', this.selectImage);
    }
    formData.append('ciudad', this.updateVoluntariadoForm.value.ciudad);
    formData.append('descripcion', this.updateVoluntariadoForm.value.descripcion);
    formData.append('empresa_id', this.updateVoluntariadoForm.value.empresa_id)

    this.voluntariadoService
      .update(this.updateVoluntariado.id, formData)
      .subscribe(
        (result) => {
          console.log(result);
          this.messages = result.message
          this.ngOnInit();
          this.updateVoluntariadoForm.reset();
        },
        (error) => {
          this.errors = error.error;
        }
      );
  }

  selectedImage(event: any) {
    this.selectImage = event.target.files[0];
  }

  getUserVoluntariado(voluntariado: Voluntariado) {
    this.voluntariadoService.userVoluntariado(voluntariado).subscribe((data) => {
      this.users = data;
    })
  }
}
