import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { min, switchMap } from 'rxjs';
import { Employee } from '../models/employee';
import { Project } from '../models/project';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  url: String = 'http://localhost:8080/'


  
  //EMPLOYEES
  getAllEmployees(){
    return this.http.get(this.url + 'employees', { observe : 'response'});
  }

  getEmployeeById(id:number){
    return this.http.get(this.url + 'employees/' + id, {observe:'response'})
  }

  createEmployee() {
    return this.http.get(this.url + 'employees', { observe: 'response' }).pipe(
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
          projects: []
        };
        return this.http.post(this.url + 'employees', newEmployee, { observe: 'response' });
      })
    );
  }

  updateEmployee(id: number, firstName: string, lastName: string, email:string, phoneNumber:string,
                 occupation:string, clearance:string, img:string, projId:number) {
    return this.http.put(this.url + 'employees/' + id,
      new Employee(id, firstName, lastName,email,phoneNumber, occupation,clearance,img,
         new Project(projId,'','','','',0,'',[])), { observe: 'response' });
  }

  deleteEmployee(id:number){
    return this.http.delete(this.url + 'employees/' + id,
                             {observe:'response'})
  }



  //PROJECTS
  getAllProjects(){
    return this.http.get(this.url + 'projects', { observe : 'response'});
  }

  getProjectById(id:number){
    return this.http.get(this.url + 'projects/' + id, {observe:'response'})
  }

  createProject() {
    return this.http.get(this.url + 'projects', { observe: 'response' }).pipe(
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
          name: "New Project",
          description: "New Project Description",
          employees: []
        };
        return this.http.post(this.url + 'projects', newProject, { observe: 'response' });
      })
    );
  }

  updateProject(id: number, codename: string, description: string, minClearance:string, priority:string ,personnel:number,img:string, employees:any[]) {
    return this.http.put(this.url + 'projects/' + id,
      new Project(id, codename, description,minClearance,priority,personnel,img, employees), { observe: 'response' });
  }

  deleteProject(id:number){
    return this.http.delete(this.url + 'projects/' + id,
                            {observe:'response'})
  }
}
