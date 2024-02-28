import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../_intefaces/service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../_intefaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { RendezvousService } from '../../services/rendezvous.service';
import { DateService } from '../../services/date.service';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demande-de-rendez-vous',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, RouterModule],
  templateUrl: './demande-de-rendez-vous.component.html',
  styleUrl: './demande-de-rendez-vous.component.css'
})
export class DemandeDeRendezVousComponent implements OnInit {
  rdvForm!: FormGroup;
  services!: Service;
  serviceId!: string | null;
  service!: Service;
  employees!: Employee[];
  rendezVous!: [];
  freeHours!: string[];
  isFreeHoursLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private rendezVousService: RendezvousService,
    private dateService: DateService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rdvForm = this.formBuilder.group({
      service: ['', Validators.required],
      date: ['', Validators.required],
      employee: ['', Validators.required],
      startHour: ['', Validators.required],
      cardNumber: ['', Validators.required],
      amount: ['', Validators.required],
    },)

    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.loadService();
  }

  loadEmployees(serviceId: string): void {
    this.employeeService.getEmployeesByServiceId(serviceId).subscribe(
      (employees) => {
        this.employees = employees.filter((employee) => employee.startTime && employee.endTime );
        console.log(this.employees)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  loadService(): void {
    this.servicesService.getById(this.serviceId).subscribe(
      (service) => {
        this.service = service;
        this.loadEmployees(service._id);
        this.rdvForm.patchValue({
          service: service._id,
          amount: service.prix
        })
        console.log("rdv" + service.nom)
      },
      (error) => {
        console.log(error)
      }
    )
  }


  onSubmit(): void {
    if (this.rdvForm.valid) {
      const rdvData = this.rdvForm.value;
      console.log(rdvData)
      this.rendezVousService.createRendezVous(rdvData).subscribe(
        (data) => {
          this.toastrService.success("Rendez vous ajouté avec succès.");
          this.router.navigate(['/client/service']);
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.error("Erreur dans le formulaire");
    }
  }

  calculateFreeHours() {
    const selectedEmployee = this.employees.find(employee => employee._id === this.rdvForm.value.employee);
    const selectedDate = this.rdvForm.value.date;
    if (selectedEmployee) {
      const workHoursStart = selectedEmployee.startTime;
      const workHoursEnd = selectedEmployee.endTime; 
      this.isFreeHoursLoading = true;

      this.rendezVousService.getRendezVousByEmployee(selectedEmployee._id, selectedDate).subscribe(
        (rendezVous) => {
          const busyHours = rendezVous.map(rdv => {
            const start = this.dateService.numberToHours(rdv.startHour);
            const end = new Date()
            end.setHours(rdv.startHour + rdv.service.duree, parseInt("00",10));
            return {
              start,
              end
            };
          });


          console.log(busyHours)

          const freeHours = [];
          let currentHour = this.dateService.stringToHours(workHoursStart);
          // Parcourir toutes les heures de travail de l'employé
          while (currentHour < this.dateService.stringToHours(workHoursEnd)) {
            console.log(currentHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "\n")
            currentHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            // Vérifier si l'heure actuelle n'est pas occupée par un rendez-vous
            const isBusy = busyHours.some(appointment => {
              return currentHour >= appointment.start && currentHour < appointment.end;
            });

            //console.log(isBusy)

            if (!isBusy) {
              freeHours.push(currentHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }

            // Passer à l'heure suivante'
            currentHour.setHours(currentHour.getHours() + 1);
          }

          
          const arrayFinal = []

          //parcourir les heures libres
          for(let i=0;i<freeHours.length;i++){

            //ajouter à l'heure libre le temps de traitement d'un service
            let hour = parseInt(freeHours[i].split(':')[0],10) + parseInt(this.service.duree);
            let hourString = hour.toString()+":00";
            //Vérifier si l'heure libre permet d'effectuer un service avant le prochain rdv 
            let found = freeHours.includes(hourString);
            if(found){
              arrayFinal.push(freeHours[i]);
            }
            console.log(found)
          }

          this.freeHours = arrayFinal;
          this.isFreeHoursLoading = false;
          console.log("free hours:");
          console.log(arrayFinal);
        },
        (error)=>{
          this.isFreeHoursLoading = false;
          console.log("erreur req"+error)
        }
      );

    }
  }


  loadScheduleForEmployee(): void {
    if (this.rdvForm.value.employee && this.rdvForm.value.date) {
      //alert("loading shedule")
      this.calculateFreeHours();
    }
  }



}
