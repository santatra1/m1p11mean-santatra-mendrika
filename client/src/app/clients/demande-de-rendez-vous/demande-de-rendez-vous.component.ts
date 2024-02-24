import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../_intefaces/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demande-de-rendez-vous',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './demande-de-rendez-vous.component.html',
  styleUrl: './demande-de-rendez-vous.component.css'
})
export class DemandeDeRendezVousComponent implements OnInit {
  rdvForm!: FormGroup;
  services!: Service;
  serviceId!: string | null;
  service!: Service;
  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService,
    private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.rdvForm = this.formBuilder.group({
      employee: ['', Validators.required],
    },)

    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.loadServices();
  }

  loadServices(): void{
    this.servicesService.getById(this.serviceId).subscribe(
      (service)=>{
        this.service = service
        console.log("rdv"+service.nom)
      },
      (error)=>{
        console.log(error)
      }
    )
  }


}
