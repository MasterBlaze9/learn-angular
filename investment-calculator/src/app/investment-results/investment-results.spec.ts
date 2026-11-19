import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentResults } from './investment-results';
import { signal } from '@angular/core';
import { InvestmentService } from '../investment.service';

describe('InvestmentResults', () => {
  let component: InvestmentResults;
  let fixture: ComponentFixture<InvestmentResults>;
  let resultData: ReturnType<typeof signal>;

  beforeEach(async () => {
    resultData = signal([
      {
        year: 1,
        interest: 50,
        valueEndOfYear: 1250,
        annualInvestment: 200,
        totalInterest: 50,
        totalAmountInvested: 1200,
      },
    ]);

    await TestBed.configureTestingModule({
      imports: [InvestmentResults],
      providers: [{ provide: InvestmentService, useValue: { resultData } }],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render investment result rows', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(element.textContent).toContain('1,250.00');
  });

  it('should show the fallback before any calculation', () => {
    resultData.set(undefined);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.center')?.textContent).toContain('Please insert');
  });
});
