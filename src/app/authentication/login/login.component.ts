import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataShareService } from '../../data-share.service';
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form: FormGroup;
 public loginInvalid: boolean;
 private formSubmitAttempt: boolean;
 private returnUrl: string;
 constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authService: AuthenticationService,
  private dataShare:DataShareService
 ) {

  }
  ngOnInit() {
   this.returnUrl = '/login';
   this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }
   onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.login(username, password)
        .subscribe((data:any)=>{
          if(data.length>0){
            if(data[0].username==username && data[0].password==password){
              this.authService.setAuthenticate(true);
              this.router.navigate(['/dashboard']);
              this.dataShare.userInfo.next(username);
            }
           
            else
            this.authService.setAuthenticate(false);
            this.loginInvalid = true;
          }
      else{
        this.loginInvalid = true;
      }
        })
        
      } catch (err) {
       
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
