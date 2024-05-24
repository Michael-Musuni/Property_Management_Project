import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-propertypreview',
  templateUrl: './propertypreview.component.html',
  styleUrls: ['./propertypreview.component.sass'],
  styles: [`
  .landscape-preview {
    width: 80%; /* Set width to fill the entire available space */
    height: 50%; /* Set height to fill the entire available space */
    display: flex; /* Use flexbox for layout */
    flex-direction: row; /* Display content in a row for landscape orientation */
  }
  /* Add additional styles as needed for landscape orientation */
`]
})
export class PropertypreviewComponent implements OnInit {
data: any;
ownerDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public formData: any) {this.data = formData; }

  ngOnInit(): void {
  }

}
