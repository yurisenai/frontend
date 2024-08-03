import { Clearance } from "./clearance";

export class Project {
  constructor(
    public id: number,
    public codename: string,
    public description: string,
    public minClearance: Clearance,
    public priority: string,
    public personnel: number,
    public img: string,
    public employees: any[] // Or define an Employee type if available
  ) {}
}

export { Clearance };

