import { Routes } from '@angular/router';
import { AuthenComponent } from './page/authen/authen.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { MainComponent } from './page/main/main.component';
import { VoteComponent } from './page/vote/vote.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UploadComponent } from './page/upload/upload.component';
import { RankComponent } from './page/rank/rank.component';
import { CharacterInfoComponent } from './page/character-info/character-info.component';
import { AdminComponent } from './page/admin/admin.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'Authen', component: AuthenComponent},
  {path: 'Register', component: SignUpComponent},
  {path: 'Vote', component: VoteComponent},
  {path: 'Profile', component: ProfileComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'Ranking', component: RankComponent},
  {path: 'Info', component: CharacterInfoComponent},
  {path: 'Admin', component: AdminComponent},
];
