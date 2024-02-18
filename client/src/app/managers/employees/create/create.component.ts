import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Service } from '../../../_intefaces/service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../../_components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  createForm!: FormGroup;
  servicesList: Service[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private serviceService: ServicesService, 
    private employeeService: EmployeeService,
    private router: Router,
    private toastrService: ToastrService
    ){}

  ngOnInit(){
    this.createForm = this.fb.group({
      matricule: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      service: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validator: this.passwordMatchValidator }
    );

    this.getServices();

  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  getServices(){
    this.serviceService.getServices().subscribe(
      (services) => {
        this.servicesList = services;
        console.log(this.servicesList)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(){
    if (this.createForm.valid) {
      const employeeData = this.createForm.value;
      this.isLoading = true;
      this.employeeService.insertEmployee(employeeData).subscribe(
        (data)=>{
          this.isLoading = false;
          this.toastrService.success("Employé ajouté avec succès.");
          this.router.navigate(['/manager/employee']);
        },
        (error)=>{
          this.isLoading = false;
          console.log(error)
        }
      )
    }else{
      console.error("Erreur dans le formulaire");
    }
  }
}
