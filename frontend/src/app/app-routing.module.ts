import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { HomeComponent } from './home/home.component';
import { UpdateUserComponent } from './update-user/update-user.component';

import { AboutComponent } from './about/about/about.component';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'organizer-signup', component: OrganizerSignupComponent },
  { path: 'sessions', component: SessionListComponent },
  { path: 'add-session', component: SessionFormComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'add-room', component: RoomFormComponent },
  { path: 'add-conf', component: ConferenceFormComponent },
  { path: 'add-ressource', component: RessourceComponent },
  { path: 'conferences', component: ConferenceListComponent },
  { path: 'myconferences', component: ConferenceParticipationComponent },
  { path: 'orgaConf', component: MyConferencesComponent },
  { path: 'update-conference/:id', component: UpdateConferenceComponent },
  { path: 'admin/org', component: AllOrganizersComponent },
  { path: 'paiements', component: PaiementComponent },
  { path: 'conference/:id', component: ConferenceDetailComponent },
  { path: 'post', component: PostComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'preferences', component: RecommendationsComponent },
  { path: 'participated-Conferences', component: ClientConferencesComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
