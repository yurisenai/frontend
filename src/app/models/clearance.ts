import { Employee } from "./employee";

export class Clearance {
  clearanceLevel: number;
  clearanceType: string;
  employees: any[];

  constructor(clearanceLevel?: number, clearanceType?: string, employees?: any[]) {
    this.clearanceLevel = clearanceLevel || 0;
    this.clearanceType = clearanceType || '';
    this.employees = employees || [];
  }
}


