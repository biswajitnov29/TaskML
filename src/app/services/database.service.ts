import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

export interface Company{
  id:number,
  name:string,
  contactPerson:string,
  contactEmail:string
}

export interface Task{
  id:number,
  name:string,
  company:number,
  companyDetails:Company,
  date:string,
  time:string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  companies = new BehaviorSubject([]);
  tasks = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadCompanies();
          this.loadTasks();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getCompanies(): Observable<Company[]> {
    return this.companies.asObservable();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  loadCompanies() {
    return this.database.executeSql('SELECT * FROM company', []).then(data => {
      let companies: Company[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          companies.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            contactPerson: data.rows.item(i).contactname, 
            contactEmail: data.rows.item(i).contactemail
           });
        }
      }
      this.companies.next(companies);
    });
  }

  addCompany(name, contactPerson, contactEmail) {
    let data = [name, contactPerson, contactEmail];
    return this.database.executeSql('INSERT INTO company (name, contactname, contactemail) VALUES (?, ?, ?)', data).then(data => {
      this.loadCompanies();
    });
  }

  loadTasks() {
    return this.database.executeSql('SELECT * FROM task', []).then(data => {
      let tasks: Task[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          tasks.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            company: data.rows.item(i).companyId, 
            date: data.rows.item(i).date, 
            time: data.rows.item(i).time,
            companyDetails:null
           });
        }
      }
      this.tasks.next(tasks);
    });
  }

  addTask(name, company, date, time) {
    let data = [name, company, date, time];
    return this.database.executeSql('INSERT INTO task (name, companyId, date, time) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadTasks();
    });
  }
}
