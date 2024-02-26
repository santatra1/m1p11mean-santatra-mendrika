import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; 
import { ClientService } from '../../../services/client.service';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FooterComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private emailService: EmailService
  ){}

  ngOnInit(): void {
    this.clientService.getClientProfile().subscribe(
      (data: any) => {

      },
      (error) => {
        console.log("error data client:")
        console.log(error);
      }
    );

  }

  logout(): void{
    this.authService.doLogout();
  }
}
