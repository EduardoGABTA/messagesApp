import { Injectable } from '@angular/core';
import {Menu} from '../../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class ServicemenuService {
  private MENU: Menu = {
    menu: [
      {
        descripcion: 'Inicio',
        ruta: '/home',
        icon: 'fa fa-tachometer-alt',
        hijos: [
        ]
      },
      {
        descripcion: 'Perfil',
        ruta: '/profile',
        icon: 'fa fa-user',
        hijos: [
        ]
      }
    ]
  };
  constructor() { }
  getMenu() {
    return this.MENU;
  }
}
