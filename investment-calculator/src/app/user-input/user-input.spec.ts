import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInput } from './user-input';
import { InvestmentService } from '../investment.service';
import { vi } from 'vitest';

describe('UserInput', () => {
  let component: UserInput;
  let fixture: ComponentFixture<UserInput>;
  let investmentService: { calculateInvestmentResults: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    investmentService = {
      calculateInvestmentResults: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserInput],
      providers: [{ provide: InvestmentService, useValue: investmentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate and reset the initial and annual investments', () => {
    component.initialInvestment.set('1000');
    component.annualInvestment.set('200');
    component.expectedReturn.set('5');
    component.duration.set('10');

    component.onSubmit();

    expect(investmentService.calculateInvestmentResults).toHaveBeenCalledWith({
      initialInvestment: 1000,
      annualInvestment: 200,
      expectedReturn: 5,
      duration: 10,
    });
    expect(component.initialInvestment()).toBe('0');
    expect(component.annualInvestment()).toBe('0');
  });
});
