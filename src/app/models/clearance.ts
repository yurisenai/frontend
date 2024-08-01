import { Employee } from "./employee";

export class Clearance {
  id: number;
  clearance: string;
  employees: any[];

  constructor(id?: number, clearance?: string, employees?: any[]) {
    this.id = id || 0;
    this.clearance = clearance || '';
    this.employees = employees || [];
  }
}


