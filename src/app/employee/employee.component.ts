import { Component, ViewChild } from '@angular/core';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { Employee } from '../models/employee';
import { HttpService } from '../services/http.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationModule } from '../notification/notification.module'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent, NotificationModule], 
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employees: Employee[] = [];
  @ViewChild(NotificationComponent) notification!: NotificationComponent;

  constructor(private httpService: HttpService) {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.httpService.getAllEmployees().subscribe(response => {
      if (response && response.body) {
        this.employees = [];
        const body: any = response.body || {};
        for (let item of body) {
          this.employees.push(new Employee(
            item.id, 
            item.firstName, 
            item.lastName, 
            item.email, 
            item.phoneNumber, 
            item.occupation, 
            item.clearance, 
            item.img, 
            item.projects, 
            item.location
          ));
        }
      }
    });
  }

  updateEmployee(employee: Employee) {
    this.notification.showUpdatingMessage();
    this.httpService.updateEmployee(
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phoneNumber,
      employee.occupation,
      employee.clearance.clearanceLevel,
      employee.img,
      employee.projects.id,
      employee.location.id
    ).subscribe(response => {
      setTimeout(() => {
        this.notification.showMessage("Successfully Updated");
        this.getAllEmployees();
      }, 1500);
    });
  }

  createEmployee() {
    this.notification.showMessage("Creating...", 1500);
    this.httpService.createEmployee().subscribe(data => {
      setTimeout(() => {
        this.notification.showMessage("Successfully Created");
        this.getAllEmployees();
      }, 1500); 
    });
  }

  deleteEmployee(id: number) {
    this.httpService.deleteEmployee(id).subscribe(data => {
      this.notification.showMessage("Employee Deleted");
      this.getAllEmployees();
    });
  }

  processDeleteEvent(id: number) {
    this.deleteEmployee(id);
  }
}
