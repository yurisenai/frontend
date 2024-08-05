import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Clearance, Project } from '../models/project';
import { HttpService } from '../services/http.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, NgFor, ProjectCardComponent],  
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projects: Project[] = [];
  projectToEdit: Project | null = null;  
  filteredProjects: Project[] = []; 
  searchTerm: string = '';

  constructor(private httpService: HttpService) {
    this.getAllProjects();
  }

  getAllProjects() {

    this.httpService.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects; 

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
            item.employees
          ));
        }
      }

    });
  }
  
  createProject() {
    const newProject = new Project(
      0,  
      'New Project',
      'New Project Description',
      new Clearance(0, 'Top Secret', []),
      'Low',
      0,
      '',
      []
    );

    this.filteredProjects.push(newProject);
  
    this.httpService.createProject(newProject).subscribe(
      (savedProject: Project) => {
        const index = this.filteredProjects.indexOf(newProject);
        if (index > -1) {
          this.filteredProjects[index] = savedProject;
        }
        this.getAllProjects(); 
      },
      (error) => {
        console.error('Error creating project:', error);

  getProjectById(id: number) {
    this.httpService.getProjectById(id).subscribe(response => {
      if (response && response.body) {
        let item = response.body;
        // this.selectedProject = new Project(
        //   // item.id,
        //   // item.codename,
        //   // item.description,
        //   // item.minClearance as Clearance,
        //   // item.priority,
        //   // item.personnel,
        //   // item.img,
        //   // item.employees
        // );

      }
    );
  }
  
  updateProject(updatedProject: Project) {
    console.log('Updating Project:', updatedProject);
    this.httpService.updateProject(updatedProject).subscribe(() => {
      this.getAllProjects();  
    });
  }


  saveProject() {
    if (this.projectToEdit) {
      this.httpService.updateProject(this.projectToEdit).subscribe(() => {

  updateProject(project: Project) {
    const clearanceObj = new Clearance(
        project.minClearance.clearanceLevel,
        project.minClearance.clearanceType,
        project.minClearance.employees
    );

    this.httpService.updateProject(
        project.id,
        project.codename,
        project.description,
        clearanceObj,
        project.priority,
        project.personnel,
        project.img,
        project.employees
    ).subscribe(response => {

        this.getAllProjects();
        this.projectToEdit = null;  
      });
    }
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
    console.log('Filtered Projects:', this.filteredProjects);  
  }
  
}
