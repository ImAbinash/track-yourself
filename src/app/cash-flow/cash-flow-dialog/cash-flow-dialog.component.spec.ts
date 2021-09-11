import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowDialogComponent } from './cash-flow-dialog.component';

describe('CashFlowDialogComponent', () => {
  let component: CashFlowDialogComponent;
  let fixture: ComponentFixture<CashFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
