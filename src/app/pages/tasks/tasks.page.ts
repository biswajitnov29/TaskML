import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService, Task } from 'src/app/services/database.service';
import { AddCompanyModel } from '../companies/addCompanyModel/add.company.model';
import { AddTaskModel } from './addTaskModel/add.task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];

  constructor(public modalController: ModalController,private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getTasks().subscribe( devs => {
          this.tasks = devs;
          this.db.getCompanies().subscribe( devs => {
            var companies = devs;
            debugger;
            this.tasks.forEach(task => {
              var company=companies.find(c => c.id===task.company);
              if(company)
                task.companyDetails=company
            })
          });
        });
      }
    });
  }

  async openAddTaskModel() {
    const modal = await this.modalController.create({
      component: AddTaskModel,
      cssClass: 'my-custom-class'
    });
    modal.componentProps={
      'model':modal
    };
    return await modal.present();
  }

}
