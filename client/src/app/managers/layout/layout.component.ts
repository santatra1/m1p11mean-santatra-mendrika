import { Component } from '@angular/core';
import { NavbarComponent } from '../../managers/navbar/navbar.component';
import { SidebarComponent } from '../../managers/sidebar/sidebar.component';
import { FooterComponent } from '../../managers/footer/footer.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
