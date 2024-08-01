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


  projects: Project[] = [
    new Project(
      1,
      'Reverse Engineer Ship',
      'Analyze alien technology and recreate it.',
      new Clearance(1, 'Top Secret', []),
      'High',
      50,
      '',
      [],
    ),
    new Project(
      2,
      'Alien Translation System',
      'Analyze alien language and translate it.',
      new Clearance(2, 'Secret', []),
      'Middle',
      35,
      '',
      [],
    ),
    new Project(
      3,
      'Test Laser Firearms',
      'Understand the mechanisms of alien technology.',
      new Clearance(3, 'Top Secret', []),
      'Middle',
      20,
      '',
      [],
    )
  ];

  getAllProjects() {
    this.httpService.getAllProjects().subscribe(response => {
      if (response && response.body) {
        this.projects = []; 
        let body: any = response.body || [];
        for (let item of body) {
          this.projects.push(new Project(
            item.id,
            item.codename,
            item.description,
            new Clearance(item.minClearance.id, item.minClearance.clearance, item.minClearance.employees),  
            item.priority,
            item.personnel,
            item.img,
            item.employees,
          ));
        }
      }
    });
  }

}
