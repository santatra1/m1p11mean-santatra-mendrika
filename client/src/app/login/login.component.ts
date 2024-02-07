import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
      },
    );
  }

  signIn(event: Event){
    event.preventDefault();
    this.authService.signIn(this.loginForm.value).subscribe(
      (data)=>{
        this.authService.saveToken(data.token)
      },
      (error)=>{
        console.log("erreur")
        console.log(error)
      }
    );
  }
}
