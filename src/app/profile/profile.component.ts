import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { AngularFireStorage } from 'angularfire2/storage'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  editandoFotoPerfil = false;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private angularFireStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, (er) => {
        console.log(er);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.angularFireStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((resultado) => {
        this.picture = this.angularFireStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((url) => {
          this.userService.setAvatar(url, this.user.uid).then(() => [
            alert('Avatar Subido Correctamente')
          ]).catch((error) => {
            alert('Ocurrio un error al tratar de subir la imagen');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.userService.modifyUser(this.user).then((data) => {
        console.log(data);
        alert('Datos guardados');
      }, (error) => {
        console.log(error);
      });
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {

  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
