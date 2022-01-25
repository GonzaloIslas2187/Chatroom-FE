import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr"; 
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMessage } from '../models/message.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private hubConnection: HubConnection;
  private newMessage: Subject<IMessage> = new Subject<IMessage>();
  private apiUrl = environment.api;

  newMessage$ = this.newMessage.asObservable();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.apiUrl + '/Chatroom', { accessTokenFactory: () => this.authenticationService.getCurrentUser().token, skipNegotiation: true, transport: HttpTransportType.WebSockets})
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: '+this.apiUrl+'  err:' + err))
  }

  addMessageListener(): void {
    this.hubConnection.on('PublishMessage', (message) => {
      this.newMessage.next(message);
    });
  }

  sendMessage(message: string): void {
    this.hubConnection.invoke('PublishMessage', message).then(() => console.log('Message sent'));
  }

  getOldMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.apiUrl + "/Message");
  }

  deleteAllMessages(): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/Message")
  }
}
