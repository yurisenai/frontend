import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { NgFor, NgIf } from '@angular/common';
import { Employee } from '../models/employee';
import { HttpService } from '../services/http.service';
import { Project } from '../models/project';
import { Clearance } from '../models/clearance';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapsComponent, NgFor, NgIf],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  isProjectView = true;

  employees: Employee[] = [];
  projects: Project[] = [];

  constructor(private httpService: HttpService) {
    this.getAllEmployees();
    this.getAllProjects();
  }

  getAllEmployees(){
    this.httpService.getAllEmployees().subscribe(response => {
      if (response && response.body) {
        this.employees = [];

        let body: any = response.body || {}
        for (let item of body) {
          this.employees.push(new Employee(item.id, item.firstName,
             item.lastName,item.email, item.phoneNumber, item.occupation,item.clearance,item.img, item.projects,item.location));

        }
      }
    });
  }

  toggleView() {
    this.isProjectView = !this.isProjectView;
  }

  getAllProjects() {
    this.httpService.getAllProjects().subscribe(response => {
      this.projects = response.map(item => new Project(
        item.id,
        item.codename,
        item.description,
        new Clearance(item.minClearance.clearanceLevel, item.minClearance.clearanceType, item.minClearance.employees),
        item.img,
        item.employees
      ));
    });
  }



  getLocationLabel(id: number): string {
    switch (id) {
      case 1:
        return 'Area 51';
      case 2:
        return 'Bermuda Triangle';
      case 3:
        return 'The Great Pyramids';
      case 4:
        return 'Point Nemo';
      case 5:
        return 'Pimpirev Ice Wall';
      case 6:
        return 'Roswell';
      case 7:
        return 'Stonehenge';
      case 8:
        return 'Nazca Lines';
      case 9:
        return 'Easter Island';
      case 10:
        return 'Himeji Castle';
      case 11:
        return 'Mount Osore';
      case 12:
        return 'The Vatican';
      case 13:
        return 'New York';
      case 14:
        return 'Moscow';
      case 15:
        return 'Paris';
      case 16:
        return 'Beijing';
      case 17:
        return 'Los Angeles';
      case 18:
        return 'Tokyo';
      case 19:
        return 'Orlando';
      case 20:
        return 'London';
      case 21:
        return 'Cincinnati';
      default:
        return 'Unknown Location';
    }
  }

}
