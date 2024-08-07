import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clearance } from '../../models/clearance';
import { HttpService } from '../../services/http.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() project: Project = new Project(0, '', '', new Clearance(0, '', []), '', []);
  @Input() employees: Employee[] = [];
  @Output() deleteProjectEvent = new EventEmitter<number>();
  @Output() updateProjectEvent = new EventEmitter<Project>();
  @Output() viewProjectEvent = new EventEmitter<Project>();

  editMode: boolean = false;
  originalProject: Project = { ...this.project };
  showEmployeeDropdown: boolean = false;

  constructor(private httpService: HttpService) {
    this.getAllEmployees();
  }

  ngOnChanges() {
    this.originalProject = { ...this.project };
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.originalProject = { ...this.project };
  }

  toggleEmployeeDropdown(): void {
    this.showEmployeeDropdown = !this.showEmployeeDropdown;
  }

  getAllEmployees(): void {
    this.httpService.getAllEmployees().subscribe((response: HttpResponse<any>) => {
      const employeeArray = response.body as Employee[];
      this.employees = employeeArray.map(item => new Employee(
        item.id, item.firstName, item.lastName, item.email,
        item.phoneNumber, item.occupation, item.clearance,
        item.img, item.projects, item.location
      ));
    });
  }

  updateEmployee(employee:Employee){
    this.httpService.updateEmployee(
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phoneNumber,
      employee.occupation,
      employee.clearance.clearanceLevel,
      employee.img,
      employee.projects.id,
      employee.location.id).subscribe(response => {
      this.getAllEmployees();
    });
  }


  addEmployeeToProject(employee: Employee, project : Project): void {
    console.log(employee.firstName, project.codename);
    console.log(employee.projects);
    employee.projects = project;
    console.log(employee.projects);
    //this.updateEmployee(employee);

  }

  updateProjectEmployees(): void {
    const employeeIds = this.project.employees.map(emp => emp.id);
    this.httpService.updateProject(
      this.project.id,
      this.project.codename,
      this.project.description,
      this.project.minClearance.clearanceLevel,
      this.project.img,
      employeeIds
    ).subscribe((response) => {
      console.log('Project updated with new employee:', response);
    });
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
      case 1:
        return 'Top Secret';
      case 2:
        return 'Secret';
      case 3:
        return 'Confidential';
      case 4:
        return 'Q Clearance';
      case 5:
        return 'L Clearance';
      default:
        return 'Clearance Level';
    }
  }
}
