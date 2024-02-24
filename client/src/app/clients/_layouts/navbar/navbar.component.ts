import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; 
import { ClientService } from '../../../services/client.service';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

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
    private clientService: ClientService
  ){}

  ngOnInit(): void {
    this.clientService.getClientProfile().subscribe(
      (data) => {
        console.log("data client:");
        console.log(data);
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
