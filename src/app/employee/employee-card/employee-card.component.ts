import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { Project } from '../../models/project';
import { FormsModule } from '@angular/forms';
import { Location } from '../../models/location';
import { Clearance } from '../../models/clearance';

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
  holderOccupation:string="";
  holderClear:number=0;
  holderImg:string="";
  holderProj:number=0;
  holderLocal:number=0


  constructor(){
    this.holderId=this.employee.id;
    this.holderFirstName=this.employee.firstName;
    this.holderLastName=this.employee.lastName;
    this.holderEmail= this.employee.email;
    this.holderPhoneNumber=this.employee.phoneNumber;
    this.holderOccupation=this.employee.occupation;
    this.holderClear=this.employee.clearance.id;
    this.holderImg=this.employee.img;
    this.holderProj=this.employee.projects.id;
    this.holderLocal=this.employee.location.id;
  }

  @Input() employee: Employee = new Employee(0,'','',
    '','','',new Clearance(0,'',[]),'', new Project(0,'','','','',0,'',[]), new Location(0,'','','',0,0,[]))

  @Output() deleteEmployeeEvent = new EventEmitter<number>();
  @Output() updateEmployeeEvent = new EventEmitter<Employee>();
  @Output() viewEmployeeEvent = new EventEmitter<Employee>();


  toggleEditVisible(): void {
    this.editVisible = !this.editVisible;
  }

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
    if (!this.holderOccupation){this.holderOccupation=this.employee.occupation}
    if (!this.holderClear){this.holderClear=this.employee.clearance.id}
    if (!this.holderImg){this.holderImg=this.employee.img}
    if (!this.holderProj){this.holderProj=this.employee.projects.id}
    if (!this.holderLocal){this.holderProj=this.employee.location.id}


    this.updateEmployeeEvent.emit(new Employee(this.holderId,
      this.holderFirstName, this.holderLastName,this.holderEmail,this.holderPhoneNumber,this.holderOccupation,
      new Clearance(this.holderClear, '',[]),this.holderImg, new Project(this.holderProj,'','','','',0,'',[]),
      new Location(this.holderLocal,'','','',0,0,[])));

      this.editVisible = !this.editVisible;
  }


  deleteThisEmployee(){
    console.log(this.employee.id)
    this.deleteEmployeeEvent.emit(this.employee.id);

  }

}
