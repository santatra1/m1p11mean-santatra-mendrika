import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../_intefaces/service';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { OfferSpecialService } from '../../services/offer-special.service';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-special',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './offer-special.component.html',
  styleUrl: './offer-special.component.css'
})
export class OfferSpecialComponent {
  specialOfferForm!: FormGroup;
  servicesList: Service[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private serviceService: ServicesService, 
    private toastrService: ToastrService,
    private offerSpecialService: OfferSpecialService
    ){}

  ngOnInit(){
    this.specialOfferForm = this.fb.group({
      service: ['', Validators.required],
      remise: ['', Validators.required],
      finalValue: ['']
    },
    );

    this.getServices();

    this.specialOfferForm.get('remise')?.valueChanges.subscribe(() => {
      this.calculateFinalValue();
    });
  }

  getServices(){
    this.serviceService.getServices().subscribe(
      (services) => {
        this.servicesList = services;
        console.log(this.servicesList)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(){
    if (this.specialOfferForm.valid) {
      const offerData = this.specialOfferForm.value;
      this.isLoading = true;
      // console.log(offerData);
      this.offerSpecialService.sendOfferSpecial(offerData).subscribe(
        (data)=>{
          this.isLoading = false;
          this.toastrService.success("Offre envoyé à tous nos clients.");
          this.specialOfferForm.reset();
        },
        (error)=>{
          this.isLoading = false;
          this.toastrService.error(error.message);
          console.log(error)
        }
      )
    }else{
      console.error("Erreur dans le formulaire");
    }
  }

  calculateFinalValue() {
    const service = this.specialOfferForm.get('service')?.value;
    const remise = this.specialOfferForm.get('remise')?.value;
  
    if (service && remise !== null && remise !== '') {
      const servicePrice = this.servicesList.find((s) => s._id === service)?.prix || 0;
      const finalValue = servicePrice - (servicePrice * remise) / 100;
      this.specialOfferForm.patchValue({
        finalValue: finalValue.toFixed(2)
      });
    } else {
      this.specialOfferForm.patchValue({
        finalValue: ''
      });
    }
  }
  
  
}
