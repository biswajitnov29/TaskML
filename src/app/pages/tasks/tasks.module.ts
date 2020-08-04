import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { AddTaskModel } from './addTaskModel/add.task.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    IonicModule,
    TasksPageRoutingModule
  ],
  declarations: [TasksPage,AddTaskModel],
  entryComponents:[AddTaskModel]
})
export class TasksPageModule {}
