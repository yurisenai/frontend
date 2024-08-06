import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clearance } from '../../models/clearance';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() project: Project = new Project(0, '', '', new Clearance(0, '', []), '', []);
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
    this.updateProjectEvent.emit(this.project);
    this.editMode = false; 
  }
  
  cancelUpdate() {
    this.project = { ...this.originalProject };
    this.editMode = false;
  }

  deleteThisProject() {
    this.deleteProjectEvent.emit(this.project.id);
  }

  getClearanceLabel(id: number): string {
    switch (id) {
      case 1: return 'Top Secret';
      case 2: return 'Secret';
      case 3: return 'Confidential';
      case 4: return 'Q Clearance';
      case 5: return 'L Clearance';
      default: return 'Clearance Level';
    }
  }
}
