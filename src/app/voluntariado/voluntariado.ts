import { Empresa } from "../empresa/empresa";

export interface Voluntariado {
  id: number,
  descripcion: string,
  ciudad: string,
  empresa: Empresa,
  subscrito: boolean;
}
