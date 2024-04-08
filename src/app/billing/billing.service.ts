import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = environment.apiUrl;
  selectedTenant: any;

  constructor(private http: HttpClient) { }

  getAllInvoices() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/invoices`, httpOptions);
  }
  getInvoiceById(invoiceId: number): Observable<any> {
    const url = `${this.apiUrl}/${invoiceId}`;
    return this.http.get<any>(url);
  }
  fetchInvoicesForTenant(tenantId: string): Observable<any> {
    return this.http.get<any>(`/api/tenants/${tenantId}`);
  }
  getPaidInvoices() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/status?status=paid`, httpOptions);
  }
  getStandingInvoices() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/status?status=not%20paid`, httpOptions);
  }
  downloadInvoice(invoiceNumber: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/download?invoiceNumber=${invoiceNumber}`, { responseType: 'blob' });
  }
  sendInvoiceViaSMS(invoiceNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/send/sms?invoiceNumber=${invoiceNumber}`);
  }
  sendInvoiceViaEmail(invoiceNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/send/email?invoiceNumber=${invoiceNumber}`);
  }


  getAllRents() {
    return this.http.get(`${this.apiUrl}/api/v1/invoices/invoices`, httpOptions);
  }
  getRentById(invoiceId: number): Observable<any> {
    const url = `${this.apiUrl}/${invoiceId}`;
    return this.http.get<any>(url);
  }
  deleteRent(invoiceId: number): Observable<any> {
    const url = `${this.apiUrl}/${invoiceId}`;
    return this.http.delete(url);
  }

  getAllRevenues(month: number) {
    return this.http.get(`${this.apiUrl}/api/property/revenue/revenues/${month}`, httpOptions);
  }
  getAllCommissions(month: number) {
    return this.http.get(`${this.apiUrl}/api/property/revenue/commission/${month}`, httpOptions);
  }
  uploadFile(file: File, propertyId: number, month: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/api/bill/water/upload?propertyId=` + propertyId + `&month=` + month, formData);
  }
  onSubmit(expensesData: any): Observable<any> {

    const url = `${this.apiUrl}/api/v1/expenses/add`;
    return this.http.post<any>(url, expensesData);
  }

  getExpenses() {
    return this.http.get(`${this.apiUrl}/api/v1/expenses/all-expenses`, httpOptions);

  }
 

  getInvoiceStatusPerProperty(propertyId: number): Observable<any> {
    const url = `${this.apiUrl}/api/v1/analytics/invoice-status-per-property/${propertyId}`;
    return this.http.get<any>(url, httpOptions);
  }
  public getProperties() {
    return this.http.get(`${environment.apiUrl}/api/v1/property/get`);
  }


  getVatData(month: number): Observable<any> {
    return this.http.get(`http://localhost:9701/api/property/revenue/tax/?month=${month}`);
}
  getTotalExpenses(month: number){
    return this.http.get(`${this.apiUrl}/api/property/revenue/expenses/${month}`, httpOptions);
  }
  
  deleteExpense(expenseName:string){}

  submitPayment(invoiceNumber: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/request-payment/${invoiceNumber}`
    return this.http.put<any>(url, invoiceNumber);
  }
  verifyPayment(invoiceNumber: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/approve-payment/${invoiceNumber}`
    return this.http.put<any>(url, invoiceNumber);
  }
  public downloadPaidInvoiceReport(propertyName: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}http://localhost:9701/swagger-ui/index.html#/report-controller/getPaidInvoices?propertyName=${propertyName}`, { responseType: 'blob'});
}
  public downloadUnpaidInvoiceReport(propertyName: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}http://localhost:9701/swagger-ui/index.html#/report-controller/getUnPaidInvoices?propertyName=${propertyName}`, { responseType: 'blob'});
}

}









