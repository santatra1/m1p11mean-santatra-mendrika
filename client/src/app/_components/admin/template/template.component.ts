import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FooterComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {}
