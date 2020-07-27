import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    
  ],
  providers: [
   
  ]
})
export class AuthenticationModule { }
