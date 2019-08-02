import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularDataBase: AngularFireDatabase) {

  }
  createRequest(request) {
    const cleanEmail = request.reciver_email.replace('.', '_');
    return this.angularDataBase.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }
  setRequestEstatus(request, status) {
    const cleanEmail = request.reciver_email.replace('.', '_');
    return this.angularDataBase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }
  getRequestForEmail(email) {
    const cleanEmail = email.replace('.', '_');
    return this.angularDataBase.list('requests/' + cleanEmail);
  }
}
