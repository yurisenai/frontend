import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { MapsComponent } from './maps/maps.component';

export const routes: Routes = [
    {
        path:'',
        component: LandingComponent
    },
    {
        path:'employees',
        component: EmployeeComponent
    },
    {
        path:'projects',
        component: ProjectComponent
    },
    {
      path:'map',
      component: MapsComponent
  },

];
