
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
          occupation: "Occupation" ,
          clearance: new Clearance(3, '',[]),
          location: new Location(1,'','','',0,0,[]),
          projects: new Project(5, '', '', new Clearance(0, '', []), '', [])
        };

        console.log('New Employee initialized:', newEmployee);

        return this.http.post(this.url + 'employee', newEmployee, { observe: 'response' });
      })
    );
  }

  updateEmployee(id: number, firstName: string, lastName: string, email: string, phoneNumber: string, occupation: string, clearId: number, img: string, projId: number, localId: number) {
    return this.http.put(this.url + 'employee/' + id, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      occupation: occupation,
      clearance: new Clearance(clearId, '', []),
      img: img,
      projects: new Project(5, '', '', new Clearance(0, '', []), '', []),
      location: new Location(localId, '', '', '', 0, 0, [])
    },
    {
      observe: 'response'
    });
  }

  deleteEmployee(id:number){
    return this.http.delete(this.url + 'employee/' + id,
                             {observe:'response'})
  }


  private urlProj = 'http://localhost:8080/project';
  // PROJECTS
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urlProj);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.urlProj}/${id}`);
  }

  createProject(newProject: Project) {
    return this.http.get(this.urlProj, { observe: 'response' }).pipe(
      switchMap(response => {
        const projects = response.body as any[];
        let highestId = 0;
        projects.forEach(proj => {
          if (proj.id > highestId) {
            highestId = proj.id;
          }
        });
        const newProject = {
          id: highestId + 1,
          codename: "New Project",
          description: "New Project Description",
          minClearance: new Clearance(3, '', []),
          img: '',
          employees: []
        };
        return this.http.post(this.urlProj, newProject, { observe: 'response' });
      })
    );
  }

  updateProject(id: number, codename: string, description: string, minClearanceLevel: number, img: string, employeeIds: number[]) {
    return this.http.put(this.urlProj + '/' + id, {
      id: id,
      codename: codename,
      description: description,
      minClearance: new Clearance(minClearanceLevel, '', []),
      img: img,
      employees: employeeIds.map(empId => ({ id: empId }))
    }, {
      observe: 'response'
    });
  }





  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.urlProj}/${id}`);
  }
}
