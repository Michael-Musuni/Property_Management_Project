import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { Account } from '../users/models/account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeAccounts: Account[] = [];
  lockedAccounts: Account[] = [];
  deletedAccounts: Account[] = [];
  allAccounts: Account[] = [];
  
  panelOpenState = false;
  is_Director = false;
  is_Second_Level_prev = false;
  role: any;
  is_Supervisor: any;

  constructor(private accountService: AuthService) { }

  ngOnInit(): void {
    this.getActiveUserAccounts();
    this.getLockedAccounts();
    this.getAllAccounts();
    this.getDeletedAccounts();
  }

  getActiveUserAccounts() {
    this.accountService.allActiveUsers().subscribe(
        (res) => {
          this.activeAccounts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLockedAccounts() {
    this.accountService.allLockedUserAccounts().subscribe(
        (res) => {
          this.lockedAccounts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDeletedAccounts() {
    this.accountService.allDeletedUserAccounts().subscribe(
        (res) => {
          this.deletedAccounts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllAccounts() {
    this.accountService.allUsers().subscribe(
        (res) => {
          this.allAccounts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  

  text:any;

  onFileChange(event) {
    const file = event.target.files[0];
  
    const reader = new FileReader();
    reader.readAsText(file, 'utf-8');
  
    reader.onload = () => {
      this.text = reader.result;
      // you can now use the text to display the file preview
    };
  }
  

  subscription!: Subscription;
  subscriptions = 0;
  deposits = 0;
  withdrawals = 0;
  transfers = 0;
  sms = 0;
  users = 0;
  loading = false;
  date = new Date();

  Authorize() {
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[0];

    // First Level Authorization - Admin
    if (this.role == "ROLE_DIRECTOR") {
      this.is_Director = true;
    }
    // Second Level AUthorization - Admin/HR
    if (this.role == "ROLE_DIRECTOR" || this.role == "ROLE_HR") {
      this.is_Second_Level_prev = true;
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    if (this.role == "ROLE_SUPERVISOR") {
      this.is_Supervisor = true;
    }
  }


}
