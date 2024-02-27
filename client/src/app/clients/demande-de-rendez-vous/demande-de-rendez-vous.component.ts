import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../_intefaces/service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../_intefaces/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-demande-de-rendez-vous',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,SpinnerComponent],
  templateUrl: './demande-de-rendez-vous.component.html',
  styleUrl: './demande-de-rendez-vous.component.css'
})
export class DemandeDeRendezVousComponent implements OnInit {
  rdvForm!: FormGroup;
  services!: Service;
  serviceId!: string | null;
  service!: Service;
  employees!: Employee[];
  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ){ }

  ngOnInit(): void {
    this.rdvForm = this.formBuilder.group({
      date: ['', Validators.required],
      employee: ['', Validators.required],
    },)

    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.loadService();
    this.loadEmployees();
  }

  loadEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (employees)=>{
        this.employees = employees;
        console.log(this.employees)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  loadService(): void{
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

  onSubmit(): void{

  }

  loadScheduleForEmployee():void{
    if(this.rdvForm.value.employee && this.rdvForm.value.date){
      alert("loading shedule")
    }
  }


}
