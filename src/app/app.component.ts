import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {RequestsService} from './services/requests.service';
import {User} from './interfaces/user';
import {DialogService} from 'ng2-bootstrap-modal';
import {RequestComponent} from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-platzyngr';
  user: User;
  requests: any[] = [];
  mailShown: any[] = [];
  constructor(public router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private requestService: RequestsService,
              private dialogService: DialogService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe((res) => {
          this.requests = res;
          this.requests = this.requests.filter((r) => {
            return r.status !== 'accepted' && r.status !== 'rejected';
          });
          this.requests.forEach((r) => {
            if (this.mailShown.indexOf(r.sender === -1)) {
              this.mailShown.push(r.sender);
              this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: r});
            }
          });
        }, (erro) => {
          console.log(erro);
        });
      });
    });

  }
}
