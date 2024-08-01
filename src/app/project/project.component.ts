import { Component } from '@angular/core';
import { Project, Clearance } from '../models/project';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  selectedProject: Project | null = null;
  projects: Project[] = [
    new Project(
      1,
      'Reverse Engineer Ship',
      'Analyze alien technology and recreate it.',
      new Clearance(1, 'Top Secret', []),
      'High',
      50,
      '',
      []
    ),
    new Project(
      2,
      'Alien Translation System',
      'Analyze alien language and translate it.',
      new Clearance(2, 'Secret', []),
      'Middle',
      35,
      '',
      []
    ),
    new Project(
      3,
      'Test Laser Firearms',
      'Understand the mechanisms of alien technology.',
      new Clearance(3, 'Top Secret', []),
      'Middle',
      20,
      '',
      []
    )
  ];

  constructor(private httpService: HttpService) {
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
    });
  }

  createProject(){
    this.httpService.createProject().subscribe(data=>{
      this.getAllProjects();
    });
  }

  updateProject(project: Project) {
    const clearanceObj = new Clearance(
        project.minClearance.id, 
        project.minClearance.clearance, 
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
    });
}



  deleteProject(id: number) {
    this.httpService.deleteProject(id).subscribe(data => {
      this.getAllProjects();
    });
  }

  processDeleteEvent(id: number) {
    this.deleteProject(id);
  }
}
