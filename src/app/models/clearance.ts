import { Employee } from "./employee";

export class Clearance {

  id: number;
    clearance: string;
    employees: any[];


    constructor(id: number, clearance: string, employees: any[]){
        this.id = id;
        this.clearance = clearance;
        this.employees = employees;
    }

}
