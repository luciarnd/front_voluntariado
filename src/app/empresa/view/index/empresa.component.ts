import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Empresa } from '../../empresa';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresas!: Empresa[];
  loggedUser!: boolean;
  errors: any = null;
  updateEmpresa!: Empresa;

  addEmpresaForm!: FormGroup;
  updateEmpresaForm!: FormGroup;

  constructor(
    public empresaService: EmpresaService,
    private auth: AuthStateService,
    private fb: FormBuilder
  ) {
    this.auth.userAuthState.subscribe((val) => {
      this.loggedUser = val;
      console.log(this.loggedUser);
    });

    this.addEmpresaForm = this.fb.group({
      nombre: [],
      descripcion: [],
    });

    this.updateEmpresaForm = this.fb.group({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresaService.index().subscribe((data) => {
      this.empresas = data;
    });
  }

  save() {
    this.empresaService.create(this.addEmpresaForm.value).subscribe(
      (result) => {
        console.log(result);
        this.addEmpresaForm.reset();
        this.ngOnInit();
      },
      (error) => {
        this.errors = error.error;
      }
    );
  }

  borrar(idEmpresa: number) {
    this.empresaService.delete(idEmpresa).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        this.errors = error.error;
      }
    );
  }

  updateModal(empresa: Empresa) {
    this.updateEmpresa = empresa;
  }

  update() {
    this.empresaService.update(this.addEmpresaForm.value).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        this.errors = error.error;
      }
    );
  }
}
