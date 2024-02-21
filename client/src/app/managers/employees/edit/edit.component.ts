import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Service } from '../../../_intefaces/service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../../_components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../_intefaces/employee';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = false;
  employeeId!: string | null;
  employeeDefaultValue!: Employee;
  servicesList: Service[] = [];

  constructor(private fb: FormBuilder, private serviceService: ServicesService,
    private employeeService: EmployeeService,
    private router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log(this.employeeId)
    this.setDefaultValue();
    
    console.log("data: ")
    console.log(this.employeeDefaultValue)
    this.editForm = this.fb.group({
      matricule: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      service: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
    },
    { validator: this.passwordMatchValidator }
    );
  }

  async getServicesAndSetValue(serviceId: string){
    this.serviceService.getServices().subscribe(
      (services) => {
        this.servicesList = services;
        this.editForm.patchValue({
          service: serviceId,
        });
        console.log(this.servicesList)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setDefaultValue(){
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee)=>{
      this.getServicesAndSetValue(employee.service._id)
      this.editForm.patchValue({
        matricule: employee.matricule,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.user.email,
      });
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
  updateEmployee() {
    if (this.editForm.valid) {
      const employeeData = this.editForm.value;
      console.log(employeeData)
      this.isLoading = true;
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(
        (data) => {
          this.isLoading = false;
          this.toastrService.success("Employé modifié avec succès.");
          this.router.navigate(['/manager/employee']);
        },
        (error) => {
          this.isLoading = false;
          console.log(error)
        }
      )
    } else {
      console.error("Erreur dans le formulaire");
    }
  }
}
