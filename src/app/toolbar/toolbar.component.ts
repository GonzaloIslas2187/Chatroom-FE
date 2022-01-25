import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISession } from '../models/session.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  currentUser: Observable<ISession> = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
