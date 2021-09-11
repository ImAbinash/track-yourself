import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-flow-dialog',
  templateUrl: './cash-flow-dialog.component.html',
  styleUrls: ['./cash-flow-dialog.component.scss']
})
export class CashFlowDialogComponent implements OnInit {
  cashFlowForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.cashFlowForm = this.fb.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      operatedAgainst: ['', Validators.required],
      operatedOnInstance: ['', Validators.required],
      amount: ['', [Validators.required]],
      description: ['', Validators.required]
    })
  };
  options: string[] = ['TCS', 'Kare4U', 'Accenture'];
  ngOnInit(): void {

  }

}
