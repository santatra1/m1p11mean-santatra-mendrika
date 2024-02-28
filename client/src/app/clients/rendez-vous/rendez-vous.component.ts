import { Component, OnInit } from '@angular/core';
import { RendezvousService } from '../../services/rendezvous.service';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [CommonModule,SpinnerComponent],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent implements OnInit{

  rendezVous: any[] = [];
  isLoading = false;

  constructor(
    private rendezVousService: RendezvousService,
    private clientService: ClientService
  ){}

  ngOnInit(): void {
    this.loadClientProfile()
  }

  loadRendezVous(clientId: string):void{
    this.rendezVousService.getRendezVousByClient(clientId).subscribe(
      (rendezVous)=>{
        this.rendezVous = rendezVous.map((rdv)=> {
          rdv.date = rdv.date.split("T")[0];
          return rdv;
        });
        console.log(this.rendezVous);
        console.log(rendezVous);
        
        this.isLoading = false;

      },
      (error)=>{
        console.log(error)
        this.isLoading = false;
      }
    );
  }

  loadClientProfile():void{
    this.isLoading=true;
    this.clientService.getClientProfile().subscribe(
      (data: any) => {
        console.log(data.client)
        this.loadRendezVous(data.client._id);
      },
      (error) => {
        console.log("error data client:")
        console.log(error);
        this.isLoading = false;
      }
    );
  }


}
