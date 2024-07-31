import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapsComponent, NgFor, NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  isProjectView = true;

  employees = [
    { pfp: "./assets/images/person3.png", name: 'James Brown', location: 'New York' },
    { pfp: "./assets/images/person2.png", name: 'Sophia Martinez', location: 'Los Angeles' },
    { pfp: "./assets/images/person1.png", name: 'Alyssa Johnson', location: 'Off World' },
    { pfp: "./assets/images/person4.png", name: 'Michael Anderson', location: 'On Base' },

  ];

  toggleView() {
    this.isProjectView = !this.isProjectView;
  }


  projects = [
    { name: 'Imperial Welcome', staff: { count: 40}, completion: { percent: 77 } },
    { name: 'Medical Exchanges', staff: { count: 16}, completion: { percent: 75 } },
    { name: 'Space Lasers', staff: { count: 49 }, completion: {percent: 188 } },
    { name: 'Reverse Engineer UAP', staff: { count: 50 }, completion: { percent: 70 } },
    { name: 'ET Translation System', staff: { count: 30 }, completion: { percent: 45 } },

  ];

}
