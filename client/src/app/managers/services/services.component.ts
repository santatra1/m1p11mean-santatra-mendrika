import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { Service } from '../../_intefaces/service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  serviceForm!: FormGroup;
  servicesList: Service[] = [];
  editForm!: FormGroup;
  editingService: Service | null = null;

  constructor(private fb: FormBuilder, private serviceService: ServicesService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission: ['', Validators.required],
    });
    this.loadServicesList();
  }

  loadServicesList() {
    this.serviceService.getServices().subscribe(
      (services) => {
        this.servicesList = services;
      },
      (error) => {
        console.error(error);
      }
    );
  }  

  onSubmit() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      this.serviceService.insertService(serviceData).subscribe(
        (response) => {
          this.serviceForm.reset();
          this.loadServicesList();
        },
        (error) => {
          console.error(error);
        }
      );
      this.toastrService.success("Ajout service effectué.")
      console.log(this.serviceForm.value);
    }else{
      console.error("Erreur dans le formulaire");
    }
  }

  editService(service: Service) {
    this.editingService = service;
    this.editForm.patchValue({
      nom: service.nom,
      description: service.description,
      prix: service.prix,
      duree: service.duree,
      commission: service.commission,
    });
  }

  onSubmitEdit() {
    if (this.editForm.valid && this.editingService) {
      const updatedServiceData = this.editForm.value;
      const serviceId = this.editingService._id;
      this.serviceService.updateService(serviceId, updatedServiceData).subscribe(
        (response) => {
          const updatedIndex = this.servicesList.findIndex(service => service._id === this.editingService?._id);
          if (updatedIndex !== -1) {
            this.servicesList[updatedIndex] = response.service;
          }
          this.toastrService.success("Modification effectué.")
          this.editForm.reset();
          this.editingService = null;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  cancelEdit() {
    this.editForm.reset();
    this.editingService = null;
  }

  deleteService(service: Service) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
      this.serviceService.deleteService(service._id).subscribe(
        () => {
          this.servicesList = this.servicesList.filter(s => s._id !== service._id);
          this.toastrService.success("Suppression effectué.")
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  
}
