import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.sass']
})
export class PrintInvoiceComponent implements OnInit, AfterViewInit {
  invoice: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoice = data.invoice;
  }

  ngOnInit(): void {
    // No initialization logic needed here
  }

  ngAfterViewInit(): void {
    // Trigger printing after the view has been fully initialized
    setTimeout(() => {
      window.print();
    }, 0);
  }
}
