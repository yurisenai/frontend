import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MenubarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
