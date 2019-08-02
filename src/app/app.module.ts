import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoguinComponent} from './loguin/loguin.component';
import {HomeComponent} from './home/home.component';
import {ConversationComponent} from './conversation/conversation.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {SearchPipe} from './pipes/search';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment.prod';
import {AuthenticationGuard} from './services/authentication.guard';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DataTablesModule} from 'angular-datatables';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {RequestComponent} from './modals/request/request.component';
import {TreeviewModule} from 'ngx-treeview';
import { PipeTreePipe } from './pipes/pipe-tree.pipe';
import { TopbarComponent } from './topbar/topbar.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoguinComponent},
  {path: 'conversation/:uid', component: ConversationComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]}
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('369388406914704')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('Your-Google-Client-Id')
      }
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoguinComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    PipeTreePipe,
    TopbarComponent,
    NoticiasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    DataTablesModule,
    SocialLoginModule,
    RichTextEditorAllModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body}),
    TreeviewModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})


export class AppModule {
}
