import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddCompanyModel } from './addCompanyModel/add.company.model';
import { NgModel } from '@angular/forms';
import { DatabaseService, Company } from 'src/app/services/database.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {

  companies: Company[] = [];
  company:any={};

  constructor(public modalController: ModalController,private db: DatabaseService,public toastController: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getCompanies().subscribe( devs => {
          this.companies = devs;
        });
      }
    });
  }

  async openAddCompanyModel() {
    const modal = await this.modalController.create({
      component: AddCompanyModel,
      cssClass: 'my-custom-class'
    });
    modal.componentProps={
      'model':modal
    };
    return await modal.present();
  }

}
