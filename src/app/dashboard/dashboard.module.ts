import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard.service';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
      MatCardModule,
      MatFormFieldModule,
      CommonModule,
      MatIconModule,
      MatListModule,
      FormsModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatInputModule,
      DashboardRoutingModule,
      ReactiveFormsModule
     
    ],
    providers: [
        DashboardService
    ]
  })
  export class DashboardModule { }