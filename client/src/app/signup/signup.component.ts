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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  roles$!: Observable<{ _id: string; name: string }[]>;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private clientService: ClientService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
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
      this.clientService.registerClient(userData).subscribe(
        (response: any) => {
          this.registrationForm.reset();
          this._toastService.info('Inscription réussie');
          console.log(response)
        },
        (error: any) => {
          console.log(error)
          this._toastService.error("Erreur lors de l'inscription");
        }
      );
    }
  }
}
