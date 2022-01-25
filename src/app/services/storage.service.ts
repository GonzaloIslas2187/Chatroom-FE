import { Injectable } from '@angular/core';
import { ISession } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;

  constructor() {
    this.localStorageService = localStorage;
  }

  setValue(key: string, value: ISession): void {
    this.localStorageService.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: string): T {
    const sessionStr = this.localStorageService.getItem(key);
    return (sessionStr) ? <T>JSON.parse(sessionStr) : undefined;
  }

  removeValue(key: string): void {
    this.localStorageService.removeItem(key);
  }
}
