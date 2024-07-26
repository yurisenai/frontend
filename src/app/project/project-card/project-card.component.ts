import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  projectId : number = 0;
  projectcodeName : string = "";
  projectDescription : string = "";
  projectminClearance : string = "";
  projectPriority : string = "";
  projectPersonnel : number = 0;
  projectImg : string = "";
  projectEmployees : any[] = [];

  constructor () {
    this.projectId = this.project.id;
    this.projectcodeName = this.project.codename;
    this.projectDescription = this.project.description;
    this.projectminClearance = this.project.minClearance;
    this.projectPriority = this.project.priority;
    this.projectPersonnel = this.project.personnel;
    this.projectImg = this.project.img;
    this.projectEmployees = this.project.employees;
  }

  @Input() project: Project = new Project(0,'','','','',0,'',[]);

  @Output() deleteProjectEvent = new EventEmitter<number>();
  @Output() updateProjectEvent = new EventEmitter<Project>();
  @Output() viewProjectEvent = new EventEmitter<Project>();

  viewThisProject() {
    this.viewProjectEvent.emit(this.project);
  }

  updateProject() {
    this.updateProjectEvent.emit(new Project(this.projectId, this.projectcodeName, this.projectDescription,
      this.projectminClearance, this.projectPriority, this.projectPersonnel, this.projectImg, this.projectEmployees
    ));
  }

  deleteThisProject() {
    this.deleteProjectEvent.emit(this.project.id);
  }


}
