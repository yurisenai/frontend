import { Project } from "./project";

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    occupation:string;
    clearance: string;
    img :string;
    projects: Project;

    constructor(id: number, firstName: string, lastName: string,
        email: string, phoneNumber: string,
        occupation:string,clearance:string,img:string, projects: Project){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.occupation = occupation;
        this.clearance = clearance;
        this.img =img;
        this.projects = projects;
    }
}
