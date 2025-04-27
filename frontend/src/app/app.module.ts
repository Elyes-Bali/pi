import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

import { UpdateUserComponent } from './update-user/update-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AboutComponent } from './about/about/about.component';
import { PatientSidebarComponent } from './patSide/patient-sidebar/patient-sidebar.component';

import { OrganizerSignupComponent } from './organizer-signup/organizer-signup.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionFormComponent } from './session-form/session-form.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { ConferenceFormComponent } from './conference-form/conference-form.component';
import { RessourceComponent } from './ressource/ressource.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { ConferenceParticipationComponent } from './conference-participation/conference-participation.component';
import { MyConferencesComponent } from './organizer/my-conferences/my-conferences.component';
import { UpdateConferenceComponent } from './update-conference/update-conference.component';
import { AllOrganizersComponent } from './admin/organizers/all-organizers/all-organizers.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ConferenceDetailComponent } from './conference-detail/conference-detail.component';
import { PostComponent } from './post/post.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ClientConferencesComponent } from './client-conferences/client-conferences.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UpdateUserComponent,
    SidebarComponent,
    AboutComponent,
    PatientSidebarComponent,
    OrganizerSignupComponent,
    SessionListComponent,
    SessionFormComponent,
    RoomListComponent,
    RoomFormComponent,
    ConferenceFormComponent,
    RessourceComponent,
    ConferenceListComponent,
    ConferenceParticipationComponent,
    MyConferencesComponent,
    UpdateConferenceComponent,
    AllOrganizersComponent,
    PaiementComponent,
    ConferenceDetailComponent,
    PostComponent,
    RecommendationsComponent,
    ClientConferencesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
