export class Location {

  id: number;
  locationName: string;
  province: string;
  country: string;
  longitude: number;
  latitude: number;
  employees: any[];

  constructor(id: number, locationName: string, province: string,
      country: string, longitude: number,
      latitude:number, employees: any[]){
      this.id = id;
      this.locationName = locationName;
      this.province = province;
      this.country = country;
      this.longitude = longitude;
      this.latitude = latitude;
      this.employees = employees;
  }

}
