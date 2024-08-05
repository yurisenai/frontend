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
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  isProjectView = true;

  employees: Employee[] = [];

  constructor(private httpService: HttpService){
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


  projects: Project[] = [];

  getAllProjects() {
    this.httpService.getAllProjects().subscribe(response => {
      if (response) {
        this.projects = [];
  
        let body: any = response || [];  
        for (let item of body) {
          this.projects.push(new Project(
            item.id,
            item.codename,
            item.description,
            new Clearance(item.minClearance.id, item.minClearance.clearance, item.minClearance.employees),
            item.priority,
            item.personnel,
            item.img,
            item.employees
          ));
        }
      }
    });
  }
  
  

}
