import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn: boolean = false;
  private isUserLoggedOut: boolean = false;
  private fullname: string;
  private username: string;
  private token: string;
  private id: string;

  constructor() { }

  setUserLoggedIn(tk: string, id: any, fullname: string): void {
    this.isUserLoggedIn = true;
    this.isUserLoggedOut = true;
    this.token = tk;
    this.id = id;
    this.fullname = fullname;
  }

  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  setUserLoggedOut(): void {
    this.token = null;
    this.id = null;
    this.fullname = null;
    this.isUserLoggedIn = false;
  }

  getUserLoggedOut(): boolean {
    return this.isUserLoggedOut;
  }

  getToken(): string {
    return this.token;
  }

  getID(): any {
    return this.id;
  }

  getUserName(): string {
    return this.fullname;
  }


}
