import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../_intefaces/employee';
import { Service } from '../../_intefaces/service';
import { ServicesService } from '../../services/services.service';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  editForm!: FormGroup;
  isLoading = false;
  employeeId!: string | null;
  employeeDefaultValue!: Employee;
  servicesList: Service[] = [];
  isReadonly = true;
  isTimeDefine = false;

  constructor(private fb: FormBuilder, private serviceService: ServicesService,
    private employeeService: EmployeeService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.employeeId = localStorage.getItem('userId');
    this.setDefaultValue();
    
    this.editForm = this.fb.group({
      matricule: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      isFromEmployee: [true]
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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setDefaultValue(){
    this.employeeService.getEmployeeByUserId(this.employeeId).subscribe(
      (employee)=>{
      this.getServicesAndSetValue(employee.service._id)
      this.editForm.patchValue({
        matricule: employee.matricule,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.user.email,
        startTime: employee.startTime,
        endTime: employee.endTime,
        isTimeDefine: employee.isTimeDefine,
        isFromEmployee: true
      });
      this.isTimeDefine = employee.isTimeDefine
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
          this.router.navigate(['/employee/profil']);
        },
        (error) => {
          this.isLoading = false;
          this.toastrService.error("Erreur lors de la modification.");
          console.log(error)
        }
      )
    } else {
      this.toastrService.success("Erreur dans le formulaire.");
      console.error("Erreur dans le formulaire");
    }
  }
}
