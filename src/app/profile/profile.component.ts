import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { AngularFireStorage } from 'angularfire2/storage'
import Swal from "sweetalert2";

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
          this.userService.setAvatar(url, this.user.uid).then(() => {
            Swal.fire('Perfil', 'Foto de perfil actualizada correctamente', 'success');
          }).catch((error) => {
            Swal.fire('Perfil', 'Ocurrio un error al tratar de subir la imagen', 'error');
            console.log(error);
          });
          this.editandoFotoPerfil = !this.editandoFotoPerfil;
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.userService.modifyUser(this.user).then((data) => {
        console.log(data);
        Swal.fire('Perfil', 'Datos actualizados correctamente', 'success');
      }, (error) => {
        Swal.fire('Perfil', 'No se pudo actualizar los datos', 'success');
        console.log(error);
      });
      this.editandoFotoPerfil = !this.editandoFotoPerfil;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.editandoFotoPerfil = !this.editandoFotoPerfil;
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
