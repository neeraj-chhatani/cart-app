import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataShareService} from '../data-share.service';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private dataShare:DataShareService,private authService:AuthenticationService) { }
  userName="";
  subInfo:any;
  authInfo:any;
  totalInfo:any;
  total:number;
  loggedIn:boolean=false;
  ngOnInit(): void {
    this.subInfo=this.dataShare.userInfo.subscribe((user)=>{
      this.userName=user;
    });
    
    this.authInfo=this.authService.isAuthenticated.subscribe((data)=>{
      console.log(data);
      this.loggedIn=data;
    })
    this.totalInfo=this.dataShare.total.subscribe((total:number)=>{
      this.total=total;
    })
  }
ngOnDestroy(){
  this.subInfo.unsubscribe();
  this.authInfo.unsubscribe();
  this.totalInfo.unsubscribe();
}
}
