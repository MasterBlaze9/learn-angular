import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  imports: [FormsModule],
  selector: 'app-user-input',
  styleUrl: './user-input.css',
  templateUrl: './user-input.html',
})
export class UserInput {
  private investmentService = inject(InvestmentService);

  initialInvestment = signal<string>('0');
  annualInvestment = signal<string>('0');
  expectedReturn = signal<string>('5');
  duration = signal<string>('10');

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment,
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.expectedReturn,
      duration: +this.duration,
    });
    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
  }
}
