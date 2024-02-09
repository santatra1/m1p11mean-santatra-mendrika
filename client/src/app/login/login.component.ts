import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  credentialsError!: string;
  isLoading = false;
  isButtonDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['',Validators.required],
      },
    );
  }

  signIn(event: Event){
    event.preventDefault();
    this.isLoading = true;
    this.isButtonDisabled = true;

    this.authService.signIn(this.loginForm.value).subscribe(
      (data)=>{
        this.isLoading = false;
        this.isButtonDisabled = false;
        this.authService.saveToken(data.token)
      },
      (result)=>{
        this.isLoading = false; 
        this.isButtonDisabled = false;
        if(result.status === 401){
          this.credentialsError = "Ces identifiants ne correspondent pas à nos enregistrements.";
        }
      }
    );
  }
}
