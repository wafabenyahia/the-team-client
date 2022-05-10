import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { PublicityComponent } from './publicity/publicity.component';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {NgChartsModule} from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RemovePublicityComponent} from './publicity/remove-publicity/remove-publicity.component';
import { UpdatePublicityComponent } from './publicity/update-publicity/update-publicity.component';
import { AddPublicityComponent } from './publicity/add-publicity/add-publicity.component';
import { PublicationComponent } from './publication/publication.component';
import { AddPublicationComponent } from './publication/add-publication/add-publication.component';
import {MatDividerModule} from '@angular/material/divider';
import {NgxEmojiPickerModule} from 'ngx-emoji-picker';
import {MatIconModule} from '@angular/material/icon';
import {WebcamModule} from 'ngx-webcam';
import { CameraComponent } from './publication/add-publication/camera/camera.component';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {RemovePublicationComponent} from './publication/remove-publication/remove-publication.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    PublicityComponent,
    MainComponent,
      RemovePublicityComponent,
      UpdatePublicityComponent,
      AddPublicityComponent,
      PublicationComponent,
      AddPublicationComponent,
      CameraComponent,
      RemovePublicationComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
   MatDividerModule,
   NgxEmojiPickerModule,
    MatIconModule,
      PickerModule,
    WebcamModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatListModule,
      MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
