import { Clearance } from "./clearance";


export class Project {

  id: number;
  codename: string;
  description: string;
  minClearance: Clearance;
  img: string;
  employees: any[];

  constructor(id: number, codename: string, description: string,
      minClearance: Clearance, img: string,
       employees: any[]){
      this.id = id;
      this.codename = codename;
      this.description = description;
      this.minClearance = minClearance;
      this.img = img;
      this.employees = employees;
  }

}
