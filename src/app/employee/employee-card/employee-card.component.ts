import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { Project } from '../../models/project';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {

  editVisible: boolean = false;
  holderId: number = 0;
  holderFirstName: string="";
  holderLastName: string="";
  holderEmail: string="";
  holderPhoneNumber:string="";
  holderJob:number=0;
  holderDept:number=0;
  holderSalary:number=0;
  holderProj:number=0;
  

  constructor(){
    this.holderId=this.employee.id;
    this.holderFirstName=this.employee.firstName;
    this.holderLastName=this.employee.lastName;
    this.holderEmail= this.employee.email;
    this.holderPhoneNumber=this.employee.phoneNumber;
    this.holderSalary=this.employee.salary;
    this.holderProj=this.employee.projects.id;
  }

  @Input() employee: Employee = new Employee(0,'','',
    '','',0, new Project(0,'','','','',[]))

  @Output() deleteEmployeeEvent = new EventEmitter<number>();
  @Output() updateEmployeeEvent = new EventEmitter<Employee>();
  @Output() viewEmployeeEvent = new EventEmitter<Employee>();

  viewThisEmployee() {
    this.viewEmployeeEvent.emit(this.employee);
    this.editVisible = !this.editVisible;
  }

  updateEmployee(){
    this.holderId = this.employee.id;
    if (!this.holderFirstName){this.holderFirstName=this.employee.firstName}
    if (!this.holderLastName){this.holderLastName=this.employee.lastName}
    if (!this.holderEmail){this.holderEmail=this.employee.email}
    if (!this.holderPhoneNumber){this.holderPhoneNumber=this.employee.phoneNumber}
    if (!this.holderSalary){this.holderSalary=this.employee.salary}
    if (!this.holderProj){this.holderProj=this.employee.projects.id}
    

    this.updateEmployeeEvent.emit(new Employee(this.holderId,
      this.holderFirstName, this.holderLastName,this.holderEmail,this.holderPhoneNumber,this.holderSalary,
      new Project(this.holderProj,'','','','',[])));

      this.editVisible = !this.editVisible;
  }


  deleteThisEmployee(){
    console.log(this.employee.id)
    this.deleteEmployeeEvent.emit(this.employee.id);

  }

}
