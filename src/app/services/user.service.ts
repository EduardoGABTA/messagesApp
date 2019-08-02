import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[];
  constructor(private angularFireDatabase: AngularFireDatabase) {

  }
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }
  getUserById(uid: string) {
    return this.angularFireDatabase.object('/users/' + uid);
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  modifyUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar: string, uid: string) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }
  addFriend(userId, friendId) {
    console.log(userId);
    console.log(friendId);

    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId ).set(friendId);
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' +  userId).set(userId);
  }
}
