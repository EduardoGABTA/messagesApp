import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import Swal from "sweetalert2";

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent implements OnInit {

  operation = 'login';
  email = null;
  password = null;
  nick: string = null;
  showSpinner = false;


  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private socialAuthService: AuthService) {

  }

  ngOnInit() {
  }

  login() {
    this.showSpinner = !this.showSpinner;
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      if (data.user) {
        this.showSpinner = !this.showSpinner;
        this.router.navigate(['home']);
      }
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        this.errorLogueo().then(() => {
          this.showSpinner = !this.showSpinner;
        });
      }
    });
  }
  errorLogueo() {
    return Swal.fire(
      {
        title: 'Error',
        text: 'Usuario y/o contraseña incorrectos',
        confirmButtonText: 'Reintentar',
        type: 'error'
      }
    );
  }

  registerWithEmail() {
    this.authenticationService.registerWithEmailPassword(this.email, this.password).then((data) => {

      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };

      this.userService.createUser(user).then((dataR) => {
        alert('Registro correcto');
        console.log(dataR);
        this.router.navigate(['home']);
      }).catch(() => {
        alert('Error Registro');
      });
      console.log(data);
    }).catch((error) => {
      alert('Error Registro');
      console.log(error);
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
      }
    );
  }
}
