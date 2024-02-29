import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dateActuelle: Date = new Date();
  commissionData: any[] = [];
  totalCommission: number = 0;
  isLoading = false;
  selectedDate: Date = new Date();

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCommissionData();
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.loadCommissionData();
  }

  loadCommissionData() {
    this.isLoading = true;
    const employeeId = localStorage.getItem('userId');
    this.employeeService.getCommissionMonitoring(employeeId, this.selectedDate).subscribe(
      (response) => {
        this.commissionData = response.commissionData;
        this.totalCommission = response.totalCommission;
        this.isLoading = false;
        this.toastrService.success('Données de commission récupérer.');
      },
      (error) => {
        console.error(error);
        this.toastrService.error('Erreur lors de la récupération des données de commission.');
        this.isLoading = true;
      }
    );
  }
}
