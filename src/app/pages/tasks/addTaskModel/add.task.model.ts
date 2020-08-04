import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService, Company } from 'src/app/services/database.service';

@Component({
    selector: 'app-add-task-model',
    templateUrl: './add.task.model.html',
    styleUrls: ['./add.task.model.scss'],
})
export class AddTaskModel implements OnInit {

    modal;
    task: any = {};
    companies: Company[] = [];

    taskSection = new FormGroup({
        name: new FormControl(''),
        company: new FormControl(''),
        date: new FormControl(),
        time: new FormControl()
    });

    constructor(private db: DatabaseService) { }

    ngOnInit() {
        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                this.db.getCompanies().subscribe(devs => {
                    this.companies = devs;
                });
            }
        });
    }

    async dismissModal() {
        await this.modal.dismiss({
            'dismissed': true
        });
    }

    addTask() {
        this.db.addTask(this.task.name, parseInt(this.task.company), this.task.date, this.task.time)
            .then(_ => {
                this.task = {
                    id: 0,
                    name: '',
                    company: '',
                    date: '',
                    time: ''
                };
                this.modal.dismiss({
                    'dismissed': true
                });
            });
    }
}