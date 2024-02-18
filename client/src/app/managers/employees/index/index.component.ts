import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../_intefaces/employee';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../_components/spinner/spinner.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, CommonModule, SpinnerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  employees: Employee[] = [];
  isLoading = false;
  constructor(private employeeService: EmployeeService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        console.log(this.employees)
        this.isLoading = false;
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
      }
    )
  }

  deleteEmployee(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.employees = this.employees.filter(e => e._id !== id);
          this.toastrService.success("Suppression effectué");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
