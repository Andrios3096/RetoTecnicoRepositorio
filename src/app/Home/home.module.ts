import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from '../Components/create-product/create-product.component';


const routes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
        path: "createProduct",
        component: CreateProductComponent
    }
  ];

@NgModule({
  declarations: [
    HomeComponent,


  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }