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
          occupation: "Occupation" ,
          clearance: new Clearance(3, '',[]),
          location: new Location(1,'','','',0,0,[]),
          projects: new Project(5,'','',new Clearance(0,'',[]),'',0,'',[])
        };
        return this.http.post(this.url + 'employee', newEmployee, { observe: 'response' });
      })
    );
  }

  updateEmployee(id: number, firstName: string, lastName: string, email:string, phoneNumber:string,
                 occupation:string, clearId:number, img:string, projId:number,localId:number) {
    return this.http.put(this.url + 'employee/' + id,
      new Employee(id, firstName, lastName,email,phoneNumber, occupation,new Clearance(clearId,'',[]),img,
         new Project(projId,'','',new Clearance(0,'',[]),'',0,'',[]), new Location(localId,'','','',0,0,[])), { observe: 'response' });
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

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.urlProj, project); 
  }
  
  
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.urlProj}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.urlProj}/${id}`);
  }
}
