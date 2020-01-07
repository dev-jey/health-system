import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule} from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTabsModule} from '@angular/material/tabs';

//Maerial modules
const matModules = [MatStepperModule, MatDatepickerModule, MatTabsModule]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matModules,
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    matModules,
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class MaterialModule { }
