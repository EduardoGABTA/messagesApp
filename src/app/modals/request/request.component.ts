import { Component, OnInit } from '@angular/core';
import {DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import {UserService} from '../../services/user.service';
import {RequestsService} from '../../services/requests.service';
export interface PromptModel {
  scope: any;
  currentRequest: any;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements  PromptModel {
  currentRequest: any;
  scope: any;
  shouldAdd: string = 'yes';
  constructor(dialogService: DialogService,
              private userService: UserService,
              private  requestsServices: RequestsService) {
    super(dialogService);
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.requestsServices.setRequestEstatus(this.currentRequest, 'accepted').then((data) => {
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada');
        }).catch((error) =>{});
      }).catch((error) =>{
        console.log(error);
      });
    } else if (this.shouldAdd === 'no') {
      this.requestsServices.setRequestEstatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) =>{
        console.log(error);
      });
    } else if (this.shouldAdd === 'later') {
      this.requestsServices.setRequestEstatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
      }).catch((error) =>{
        console.log(error);
      });
    }
  }
}
