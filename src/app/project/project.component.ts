import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../models/project';
import { HttpService } from '../services/http.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clearance } from '../models/clearance';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, NgFor, ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm: string = '';
  employees: Employee[] = [];

  constructor(private httpService: HttpService) {
    this.getAllProjects();
    this.getAllEmployees();
  }

  getAllProjects(): void {
    this.httpService.getAllProjects().subscribe((response: Project[]) => {
      this.projects = response; 
      this.filteredProjects = this.projects;
    });
  }
  

  getAllEmployees(): void {
    this.httpService.getAllEmployees().subscribe(response => {
      if (response && response.body) {
        const employeeArray = response.body as any[]; 
        this.employees = employeeArray.map(item => new Employee(
          item.id, item.firstName, item.lastName, item.email, 
          item.phoneNumber, item.occupation, item.clearance, 
          item.img, item.projects, item.location
        ));
      }
    });
  }

  createProject() {
    const newProject = new Project(
      0,
      'New Project',
      'New Project Description',
      new Clearance(1, 'Confidential', []),
      '',
      []
    );

    this.httpService.createProject(newProject).subscribe(() => {
      this.getAllProjects();
    });
  }

  updateProject(project: Project) {
    const employeeIds = project.employees.map(emp => emp.id);

    this.httpService.updateProject(
      project.id,
      project.codename,
      project.description,
      project.minClearance.clearanceLevel,
      project.img,
      employeeIds
    ).subscribe(() => {
      this.getAllProjects();
    });
  }

  deleteProject(id: number) {
    this.httpService.deleteProject(id).subscribe(() => {
      this.getAllProjects();
    });
  }

  processDeleteEvent(id: number) {
    this.deleteProject(id);
  }

  onSearchTermChange() {
    this.filteredProjects = this.projects.filter(project =>
      project.codename.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

    
}
