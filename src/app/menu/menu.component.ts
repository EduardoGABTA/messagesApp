import { Component, OnInit } from '@angular/core';
import {ServicemenuService} from '../services/service-menu/servicemenu.service';
import {Menu} from '../interfaces/menu';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  buscar: string = '';
  verMenu = true;
  usuario: User;
  constructor(private menuService: ServicemenuService, private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.usuario = data;
      }, (er) => {
        console.log(er);
      });
    }, (error) => {
      console.log(error);
    });
  }
  menu: Menu;
  ngOnInit() {
    this.menu = this.menuService.getMenu();
  }
  logOut() {
    this.authenticationService.logOut().then((data) => {
      Swal.fire(
        {
          title: 'Cerrar sesión',
          text: '¿Desea cerrar sesión?',
          showCancelButton: true,
          cancelButtonText: 'Quedarse',
          confirmButtonText: 'Salir',
          type: 'question'
        }
      ).then((result) => {
        if (result.value) {
          this.router.navigate(['login']);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
