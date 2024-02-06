import { Component } from '@angular/core';
import { TemplateComponent } from '../../_components/admin/template/template.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [TemplateComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {}
