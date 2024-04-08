import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ExpensesService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  onSubmit(expensesData: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.post<any>(url, expensesData);
  }
  getExpenses(){
    return this.http.get(`${this.apiUrl}/api/v1/invoices/invoices`,httpOptions);
  }
 
}