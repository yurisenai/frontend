import { Clearance } from "./clearance";

export class Project {
  id: number;
  codename: string;
  description: string;
  minClearance: Clearance;  
  priority: string;
  personnel: number;
  img: string;
  employees: any[];

  constructor(
    id: number,
    codename: string,
    description: string,
    minClearance: Clearance,  
    priority: string,
    personnel: number,
    img: string,
    employees: any[]
  ) {
    this.id = id;
    this.codename = codename;
    this.description = description;
    this.minClearance = minClearance;
    this.priority = priority;
    this.personnel = personnel;
    this.img = img;
    this.employees = employees;
  }
}
export { Clearance };

