export class Location {

  id: number;
  name: string;
  province: string;
  country: string;
  longitude: number;
  latitude: number;
  employees: any[];

  constructor(id: number, name: string, province: string,
      country: string, longitude: number,
      latitude:number, employees: any[]){
      this.id = id;
      this.name = name;
      this.province = province;
      this.country = country;
      this.longitude = longitude;
      this.latitude = latitude;
      this.employees = employees;
  }

}
