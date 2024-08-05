import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { NgFor, NgIf } from '@angular/common';
import { Employee } from '../models/employee';
import { HttpService } from '../services/http.service';
import { Clearance, Project } from '../models/project';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapsComponent, NgFor, NgIf],
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

  getAllEmployees() {
    this.httpService.getAllEmployees().subscribe(response => {
      // if (response) {
      //   this.employees = response.map(item => new Employee(
      //     item.id,
      //     item.firstName,
      //     item.lastName,
      //     item.email,
      //     item.phoneNumber,
      //     item.occupation,
      //     item.clearance,
      //     item.img,
      //     item.projects,
      //     item.location
      //   ));
      // }
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
        item.priority,
        item.personnel,
        item.img,
        item.employees
      ));
    });
  }
  
}
