import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../_intefaces/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarif',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarif.component.html',
  styleUrl: './tarif.component.css'
})
export class TarifComponent implements OnInit {

  services!: Service[];
  isLoading = false;
  constructor(
    private servicesService: ServicesService
  ){ }

  ngOnInit(): void {
    this.loadServiceWithPrice();
  }

  loadServiceWithPrice():void{
    this.isLoading = true;
    this.servicesService.getServices().subscribe(
      (services)=>{ 
        this.services = services;
        this.isLoading = false;
       },
       (error)=>{
        this.isLoading = false;
        console.log(error)
       }
    );
  }

}
