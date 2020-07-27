import { Injectable } from '@angular/core';
import { BehaviorSubject,pipe } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
 public isAuthenticated = new BehaviorSubject<boolean>(false);
 private authenticate:boolean=false;
  constructor(private router: Router,private http: HttpClient) {
  }
  checkAuthenticated() {
    console.log(this.authenticate)
    return this.authenticate;
  }
  setAuthenticate(data){
    this.authenticate=JSON.parse(data);
    console.log(this.authenticate);
    this.isAuthenticated.next(this.authenticate);
  }
  login(username: string, password: string) {
    
    return this.http.get("https://xebiascart.herokuapp.com/users?username=" + username )
          

  }


}

