import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../_layouts/navbar/navbar.component';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../_intefaces/service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NavbarComponent, CommonModule, SpinnerComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  services!: Service[];
  isLoading = false;
  constructor(
    private servicesService: ServicesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadServices();

  }

  loadServices(): void {
    this.isLoading = true;
    this.servicesService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.isLoading = false;
        console.log(services)
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  navigateToRdv(serviceId: string): void {
    this.router.navigate([`client/demande-de-rendez-vous/${serviceId}`]);
  }

}
