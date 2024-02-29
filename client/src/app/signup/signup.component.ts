import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { ClientService } from '../services/client.service';
import { RouterLink,RouterLinkActive, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../_components/spinner/spinner.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    RouterLink,
    SpinnerComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  roles$!: Observable<{ _id: string; name: string }[]>;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private clientService: ClientService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
    this.roles$ = this.roleService.getRoles();
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.isLoading = true;
      this.clientService.registerClient(userData).subscribe(
        (response: any) => {
          this.registrationForm.reset();
          this.toastService.success('Inscription réussie');
          this.isLoading = false;
          console.log(response)
        },
        (error: any) => {
          console.log(error)
          this.isLoading = false;
          this.toastService.error("Erreur lors de l'inscription");
        }
      );
    }
  }
}
