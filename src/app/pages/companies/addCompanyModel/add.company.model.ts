import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-company-model',
  templateUrl: './add.company.model.html',
  styleUrls: ['./add.company.model.scss'],
})
export class AddCompanyModel implements OnInit {

  modal;
  company:any={};
  companyName:string='';

  companySection = new FormGroup({
    name: new FormControl(''),
    contactPerson: new FormControl(''),
    contactEmail: new FormControl('')
  });

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }
  async dismissModal() {
    await this.modal.dismiss({
      'dismissed': true
    });
  }

  async addCompany(){
    this.db.addCompany(this.company.name, this.company.contactPerson, this.company.contactEmail)
    .then(_ => {
      this.company = {
        id:0,
        name:'',
        contactPerson:'',
        contactEmail:''
      };
      this.modal.dismiss({
        'dismissed': true
      });
    });
  }

}