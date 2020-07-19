import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompaniesPageRoutingModule } from './companies-routing.module';

import { CompaniesPage } from './companies.page';
import { AddCompanyModel } from './addCompanyModel/add.company.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    IonicModule,
    CompaniesPageRoutingModule
  ],
  declarations: [CompaniesPage,AddCompanyModel],
  entryComponents:[AddCompanyModel]
})
export class CompaniesPageModule {}
