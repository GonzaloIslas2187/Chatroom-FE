import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: 'chatroom', component: ChatroomComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/chatroom', pathMatch: 'full' },
  { path: '**', redirectTo: '/chatroom'}
];

export const Routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });