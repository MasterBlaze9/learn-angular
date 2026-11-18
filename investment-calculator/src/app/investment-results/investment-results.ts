import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-investment-results',
  styleUrl: './investment-results.css',
  templateUrl: './investment-results.html',
})
export class InvestmentResults {
  private investmentService = inject(InvestmentService);

  get results(){
    return this.investmentService.resultData;
  }
}
