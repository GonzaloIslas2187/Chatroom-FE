import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/models/message.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: IMessage;

  isFromCurrentUser: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isFromCurrentUser = this.authenticationService.getCurrentUser()?.userName === this.message.userName;
  }

}
