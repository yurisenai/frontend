import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { AccountComponent } from './account/account.component';

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
        path:'account',
        component: AccountComponent
    },
    
];
