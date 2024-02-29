import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../_components/sidebar/sidebar.component';
import Chart from 'chart.js/auto';
import { RendezvousService } from '../../services/rendezvous.service';
import { ServicesService } from '../../services/services.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthlyChart: any;
  monthlyCounts: any[] = [];
  monthlyTurnOverChart: any;
  monthlyTurnOverCounts: any[] = [];
  dailyTurnOver!: number;
  dailyCounts!: number;

  constructor(private rendezvousService: RendezvousService, private servicesService: ServicesService) {}

  ngOnInit() {
    this.initializeMonthlyChart();
    this.fetchMonthlyAppointmentCounts();
    this.fetchMonthlyTurnOverCounts();
    this.initializeMonthlyTurnOverChart();
    this.fetchDailyTurnOver();
    this.fetchDailyCounts();
  }

  fetchMonthlyAppointmentCounts() {
    this.rendezvousService.getMonthlyAppointmentCount().subscribe(
      (counts: any) => {
        this.monthlyCounts = counts;
        this.updateMonthlyChart();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchMonthlyTurnOverCounts() {
    this.servicesService.getTurnOverMonthly().subscribe(
      (counts: any) => {
        this.monthlyTurnOverCounts = counts;
        this.updateMonthlyTurnOverChart();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchDailyTurnOver() {
    this.servicesService.getTurnOverForCurrentDay().subscribe(
      (chiffreAffaire: any) => {
        console.log(chiffreAffaire)
        this.dailyTurnOver = chiffreAffaire[0].chiffreAffaires;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchDailyCounts() {
    this.rendezvousService.getDailyAppointmentCount().subscribe(
      (count: any) => {
        console.log(count)
        this.dailyCounts = count.count;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateMonthlyChart() {
    if (this.monthlyCounts.length > 0) {
      const labels = this.monthlyCounts.map(entry => entry.monthName);
      const data = this.monthlyCounts.map(entry => entry.count);

      this.monthlyChart.data.labels = labels;
      this.monthlyChart.data.datasets[0].data = data;
      this.monthlyChart.update();
    }
  }

  updateMonthlyTurnOverChart() {
    if (this.monthlyTurnOverCounts.length > 0) {
      const labels = this.monthlyTurnOverCounts.map(entry => entry.monthName);
      const data = this.monthlyTurnOverCounts.map(entry => entry.chiffreAffaires);
  
      this.monthlyTurnOverChart.data.labels = labels;
      this.monthlyTurnOverChart.data.datasets[0].data = data;
      this.monthlyTurnOverChart.update();
    }
  }
  

  initializeMonthlyChart() {
    this.monthlyChart = new Chart('monthlyCanvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Nombre de rendez-vous par mois',
            data: [],
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  initializeMonthlyTurnOverChart() {
    this.monthlyTurnOverChart = new Chart('monthlyTurnOverCanvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Chiffre d affaire par mois',
            data: [],
            backgroundColor: '#2ecc71',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

