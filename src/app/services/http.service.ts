import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { min, Observable, switchMap } from 'rxjs';
import { Employee } from '../models/employee';
import { Project } from '../models/project';
import { Clearance } from '../models/clearance';
import { Location } from '../models/location';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: String = 'http://localhost:8080/'



  //EMPLOYEES
  getAllEmployees(){
    return this.http.get(this.url + 'employee', { observe : 'response'});
  }

  getEmployeeById(id:number){
    return this.http.get(this.url + 'employee/' + id, {observe:'response'})
  }

  createEmployee() {
    return this.http.get(this.url + 'employee', { observe: 'response' }).pipe(
      switchMap(response => {
        const employees = response.body as any[];
        let highestId = 0;
        employees.forEach(emp => {
          if (emp.id > highestId) {
            highestId = emp.id;
          }
        });
        const newEmployee = {
          id: highestId + 1,
          firstName: "First Name",
          lastName: "Last Name",
          email:"Email",
          phoneNumber:"Phone Number",
          occupation: 1 ,
          Location: 1,
          projects: 1
        };
        return this.http.post(this.url + 'employee', newEmployee, { observe: 'response' });
      })
    );
  }

  updateEmployee(id: number, firstName: string, lastName: string, email:string, phoneNumber:string,
                 occupation:string, clearId:number, img:string, projId:number,localId:number) {
    return this.http.put(this.url + 'employee/' + id,
      new Employee(id, firstName, lastName,email,phoneNumber, occupation,new Clearance(clearId,'',[]),img,
         new Project(projId,'','','','',0,'',[]), new Location(localId,'','','',0,0,[])), { observe: 'response' });
  }

  deleteEmployee(id:number){
    return this.http.delete(this.url + 'employee/' + id,
                             {observe:'response'})
  }



  //PROJECTS
  getAllProjects(){
    return this.http.get(this.url + 'project', { observe : 'response'});
  }

  getProjectById(id:number){
    return this.http.get(this.url + 'project/' + id, {observe:'response'})
  }

  createProject(): Observable<any> {
    return this.http.get(this.url + 'project', { observe: 'response' }).pipe(
      switchMap(response => {
        const projects = response.body as any[];
        let highestId = 0;
        projects.forEach(project => {
          if (project.id > highestId) {
            highestId = project.id;
          }
        });
        const newProject = {
          id: highestId + 1,
          codename: "New Project",
          description: "New Project Description",
          minClearance: new Clearance(0, 'Top Secret', []), 
          priority: 'Low',
          personnel: 0,
          img: '',
          employees: []
        };
        return this.http.post(this.url + 'project', newProject, { observe: 'response' });
      })
    );
  }

  updateProject(id: number, codename: string, description: string, minClearance: Clearance, priority: string, personnel: number, img: string, employees: any[]) {
    return this.http.put(this.url + 'project/' + id,
      new Project(id, codename, description, minClearance, priority, personnel, img, employees), { observe: 'response' });
  }
  

  deleteProject(id: number): Observable<any> {
    return this.http.delete(this.url + 'project/' + id, { observe: 'response' });
  }
}
