import { Project } from "./project";
import { Clearance } from "./clearance";
import { Location } from "./location";

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    occupation:string;
    clearance: Clearance;
    img :string;
    projects: Project;
    location: Location;


    constructor(id: number, firstName: string, lastName: string,
        email: string, phoneNumber: string,
        occupation:string,clearance: Clearance ,img:string, projects: Project, location: Location){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.occupation = occupation;
        this.clearance = clearance;
        this.img =img;
        this.projects = projects;
        this.location = location;
    }
}
