import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-print-lease',
  templateUrl: './print-lease.component.html',
  styleUrls: ['./print-lease.component.sass']
})
export class PrintLeaseComponent implements OnInit {
lease: any;

  constructor() { }

  ngOnInit(): void {
  }

}
