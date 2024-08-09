import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { HttpService } from '../services/http.service';
import maplibregl from 'maplibre-gl';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Employee } from '../models/employee';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  private employeeSubscription: Subscription | undefined;
  private markers: maplibregl.Marker[] = [];

  constructor(private http: HttpService) {}

  startPolling() {
    setInterval(() => {
      this.loadEmployeeMarkers();
    }, 2500);
}

  ngOnInit(): void {
    config.apiKey = 'itaEKSCmuXbP7HO6pHye';
    this.loadEmployeeMarkers();
    this.startPolling();
  }

  ngAfterViewInit() {
    const initialState = { lng: 14.59, lat: 28.67, zoom: 1 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  loadEmployeeMarkers() {
    this.employeeSubscription = this.http.getAllEmployees().subscribe(
      (response: HttpResponse<any>) => {
        if (response && response.body) {
          const employees: any[] = response.body;
          this.updateEmployeeMarkers(employees);
        } else {
          console.error('Response body is empty or undefined.');
        }
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  updateEmployeeMarkers(employees: any[]) {
    // Remove existing markers from the map
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    employees.forEach(item => {
      const employee = new Employee(
        item.id,
        item.firstName,
        item.lastName,
        item.email,
        item.phoneNumber,
        item.occupation,
        item.clearance,
        item.img,
        item.projects,
        item.location
      );

      if (employee.location && employee.location.longitude !== undefined && employee.location.latitude !== undefined) {
        const marker = new maplibregl.Marker()
            .setLngLat([employee.location.latitude, employee.location.longitude])
            .addTo(this.map!);
    
        const popup = new maplibregl.Popup()
            .setHTML(`${employee.location.employees.map(emp => `${emp.firstName} ${emp.lastName}`).join('<br>')}`);
    
        marker.getElement().addEventListener('mouseenter', () => {
            popup.setLngLat([employee.location.latitude, employee.location.longitude]).addTo(this.map!);
        });

        marker.getElement().addEventListener('mouseleave', () => {
            popup.remove();
        });

        this.markers.push(marker);
      } else {
        console.warn('Employee location is undefined or incomplete:', employee);
      }
    });
  }

  ngOnDestroy() {
    this.map?.remove();
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
