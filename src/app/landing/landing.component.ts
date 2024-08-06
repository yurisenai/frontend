import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { NgFor, NgIf } from '@angular/common';
import { Employee } from '../models/employee';
import { HttpService } from '../services/http.service';
import { Project } from '../models/project';
import { Clearance } from '../models/clearance';
import { FormsModule } from '@angular/forms';
import { Location } from '../models/location';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapsComponent, NgFor, NgIf, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  isProjectView = true;

  employees: Employee[] = [];
  projects: Project[] = [];

  constructor(private httpService: HttpService) {
    this.getAllEmployees();
    this.getAllProjects();
  }

  getAllEmployees(){
    this.httpService.getAllEmployees().subscribe(response => {
      if (response && response.body) {
        this.employees = [];

        let body: any = response.body || {}
        for (let item of body) {
          this.employees.push(new Employee(item.id, item.firstName,
             item.lastName,item.email, item.phoneNumber, item.occupation,item.clearance,item.img, item.projects,item.location));

        }
      }
    });
  }

  toggleView() {
    this.isProjectView = !this.isProjectView;
  }

  getAllProjects() {
    this.httpService.getAllProjects().subscribe(response => {
      this.projects = response.map(item => new Project(
        item.id,
        item.codename,
        item.description,
        new Clearance(item.minClearance.clearanceLevel, item.minClearance.clearanceType, item.minClearance.employees),
        item.img,
        item.employees
      ));
    });
  }


  holderId: number = 0;
  holderFirstName: string="";
  holderLastName: string="";
  holderEmail: string="";
  holderPhoneNumber:string="";
  holderOccupation:string="";
  holderClear:number=3;
  holderImg:string="";
  holderProj:number=1;
  holderLocal:number=1


  getLocationLabel(id: number): string {
    switch (id) {
      case 1:
        return 'Area 51';
      case 2:
        return 'Bermuda Triangle';
      case 3:
        return 'The Great Pyramids';
      case 4:
        return 'Point Nemo';
      case 5:
        return 'Pimpirev Ice Wall';
      case 6:
        return 'Roswell';
      case 7:
        return 'Stonehenge';
      case 8:
        return 'Nazca Lines';
      case 9:
        return 'Easter Island';
      case 10:
        return 'Himeji Castle';
      case 11:
        return 'Mount Osore';
      case 12:
        return 'The Vatican';
      case 13:
        return 'New York';
      case 14:
        return 'Moscow';
      case 15:
        return 'Paris';
      case 16:
        return 'Beijing';
      case 17:
        return 'Los Angeles';
      case 18:
        return 'Tokyo';
      case 19:
        return 'Orlando';
      case 20:
        return 'London';
      case 21:
        return 'Cincinnati';
      default:
        return 'Unknown Location';
    }
  }


  updateEmployeeLocation(employee: Employee) {
    if (!employee) {
      console.error('Employee data is not available.');
      return;
    }

    console.log('Employee object:', employee);

    if (!employee.location || !employee.location.id) {
      console.error('Employee location data is missing or incomplete.');
      return;
    }

    const updatedEmployee = new Employee(
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phoneNumber,
      employee.occupation,
      new Clearance(employee.clearance.clearanceLevel, '', []),
      employee.img,
      new Project(0, '', '', new Clearance(0, '', []), '', []),
      new Location(employee.location.id, '', '', '', 0, 0, [])
    );

    this.httpService.updateEmployee(
      updatedEmployee.id,
      updatedEmployee.firstName,
      updatedEmployee.lastName,
      updatedEmployee.email,
      updatedEmployee.phoneNumber,
      updatedEmployee.occupation,
      updatedEmployee.clearance.clearanceLevel,
      updatedEmployee.img,
      0,
      updatedEmployee.location.id
    ).subscribe(response => {
      this.getAllEmployees();
    });
  }

}

