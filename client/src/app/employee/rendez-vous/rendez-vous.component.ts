import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendezvousService } from '../../services/rendezvous.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent {
  rendezVous: any[] = [];
  isLoading = false;

  constructor(
    private rendezVousService: RendezvousService,
  ){}

  ngOnInit(): void {
    this.loadRendezVous()
  }

  loadRendezVous():void{
    this.isLoading = true;
    this.rendezVousService.getRendezVousByUserAccountOfEmployee().subscribe(
      (rendezVous)=>{
        this.rendezVous = rendezVous.map((rdv)=> {
          rdv.date = rdv.date.split("T")[0];
          return rdv;
        });
        console.log(this.rendezVous);
        console.log("success");
        
        this.isLoading = false;

      },
      (error)=>{
        console.log(error)
        this.isLoading = false;
      }
    );
  }

}
