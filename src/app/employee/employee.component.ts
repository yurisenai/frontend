import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { Employee } from '../models/employee';
import { HttpService } from '../services/http.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})

export class EmployeeComponent {

  employees: Employee[] = [new Employee(10,"y","b","e","4",'','','',new Project(0,"p","p","sd","ed",0,'',[]))];

  constructor(private httpService: HttpService){
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.httpService.getAllEmployees().subscribe(response => {
      if (response && response.body) {
        this.employees = [];

        let body: any = response.body || {}
        for (let item of body) {
          this.employees.push(new Employee(item.id, item.firstName,
             item.lastName,item.email, item.phoneNumber, item.occupation,item.clearance,item.img, item.projects));
          
        }
      }
    });
  }

  getEmployeesById(id:number){
    this.httpService.getEmployeeById(id).subscribe(data=>{
      this.employees = [];
      console.log("Successful Get Employee: "+ id)
    });
  }

  createEmployee(){
    this.httpService.createEmployee().subscribe(data=>{
      this.getAllEmployees();
    });
  }

  updateEmployee(employee:Employee){
    this.httpService.updateEmployee(
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phoneNumber,
      employee.occupation,
      employee.clearance,
      employee.img,
      employee.projects.id).subscribe(response => {
      this.getAllEmployees();
    });
  }

  deleteEmployee(id:number){
    this.httpService.deleteEmployee(id).subscribe(data=>{
      this.getAllEmployees();
    });
  }

  //this method runs for the card children buttons
  processDeleteEvent(id:number){
    console.log(id);
    this.deleteEmployee(id);
  }
}