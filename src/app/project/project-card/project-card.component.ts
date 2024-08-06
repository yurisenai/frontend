

import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Project, Clearance } from '../../models/project';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnChanges {
  @Input() project: Project = new Project(0, '', '', new Clearance(), '', 0, '', []);  
  @Output() deleteProjectEvent = new EventEmitter<number>();
  @Output() updateProjectEvent = new EventEmitter<Project>();
  @Output() viewProjectEvent = new EventEmitter<Project>();

  editMode: boolean = false;
  originalProject: Project = { ...this.project };  

  ngOnChanges() {
    this.originalProject = { ...this.project };
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.originalProject = { ...this.project };
  }

  saveUpdate() {
    this.editMode = false;
    this.updateProjectEvent.emit(this.project);  
  }
  
  cancelUpdate() {
    this.project = { ...this.originalProject };
    this.editMode = false;
  }

  deleteThisProject() {
    this.deleteProjectEvent.emit(this.project.id);
  }

  viewThisProject() {
    this.viewProjectEvent.emit(this.project);
  } 

  updateProject() {
    this.updateProjectEvent.emit(this.project);
  }
  
}
