import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { EmailService } from '../services/email.service';

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
    private router: Router,
    private clientService: ClientService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['',Validators.required],
      },
    );
  }

  signIn(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.isButtonDisabled = true;
  
    this.authService.signIn(this.loginForm.value).subscribe(
      (data) => {
        this.isLoading = false;
        this.isButtonDisabled = false;
        this.authService.saveToken(data.token);
        this.clientService.getClientProfile().subscribe(
          (data: any) => {
            console.log(data);
            const nom = data.client.firstName;
            const to = data.client.user.email;
            const dateConnexion = new Date().toLocaleString();
      
            this.sendEmail(to,nom, dateConnexion);
          },
          (error) => {
            console.log("error data client:")
            console.log(error);
          }
        );
      },
      (result) => {
        this.isLoading = false;
        this.isButtonDisabled = false;

        if (result.status === 401) {
          this.credentialsError = "Ces identifiants ne correspondent pas à nos enregistrements.";
        }
      }
    );
  }

  sendEmail(to: string, nom: string, dateConnexion: string) {
    const subject = 'Connexion succès';
    const templateFileName = 'loginSuccess';
    const content = { nom: nom, date: dateConnexion };
    this.emailService.sendEmail(to, subject, templateFileName, content).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
  
}
