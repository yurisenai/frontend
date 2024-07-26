import { Component } from '@angular/core';
import { Project } from '../models/project';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedProject: Project | null = null;

  projects: Project[] = [
    new Project(
      1,
      'Reverse Engineer Alien Ship',
      'Analyze alien technology and recreate it',
      'Top Secret',
      'High',
      50,
      '',
      []
    )
  ];

  constructor(private httpService: HttpService){
    this.getAllProjects();
  }

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
            item.minClearance,
            item.priority,
            item.personnel,
            item.img,
            item.employees
          ));
        }
      }
    });
  }

  getProjectById(id: number) {
    this.httpService.getProjectById(id).subscribe(response => {
      if (response && response.body) {
        let item = response.body;
        // this.selectedProject = new Project(
        //   // item.id,
        //   // item.codename,
        //   // item.description,
        //   // item.minClearance,
        //   // item.priority,
        //   // item.personnel,
        //   // item.img,
        //   // item.employees
        // );
      }
    });
  }

  createProject(){
    this.httpService.createEmployee().subscribe(data=>{
      this.getAllProjects();
    });
  }

  updateProject(project: Project) {
    this.httpService.updateProject(
      project.id,
      project.codename,
      project.description,
      project.minClearance,
      project.priority,
      project.personnel,
      project.img,
      project.employees).subscribe(response => {
        this.getAllProjects();
      });
  }

  deleteProject(id: number) {
    this.httpService.deleteProject(id).subscribe(data => {
      this.getAllProjects();
    });
  }

  processDeleteEvent(id: number){
    this.deleteProject(id);
  }

}
