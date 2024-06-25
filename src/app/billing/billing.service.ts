import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BillingService {
  getUnpaidInvoiceStatusPerProperty(propertyId: any) {
    throw new Error('Method not implemented.');
  }
  getPaidInvoiceStatusPerProperty(propertyId: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl;
  selectedTenant: any;
  private fileToBase64(file: File): Observable<string> {
    const reader = new FileReader();
    const fileReaderObservable = new Observable<string>((observer) => {
      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
    });

    reader.readAsDataURL(file);
    return fileReaderObservable.pipe(map(result => result.split(',')[1])); // Remove the base64 header
  }
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
  uploadFile(file: File): Observable<any> {
    const url = `${this.apiUrl}/bulk-payments/upload`;

    return this.fileToBase64(file).pipe(
      switchMap(base64File => {
        const payload = { file: base64File };
        return this.http.post<any>(url, payload);
      })
    );
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
  // uploadFile(file: File, propertyId: number, month: number) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post<any>(`${this.apiUrl}/api/bill/water/upload?propertyId=` + propertyId + `&month=` + month, formData);
  // }
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
    return this.http.get(`${this.apiUrl}/api/property/revenue/tax/${month}`);
}

getDepositData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/v1/lease/deposits`);
}
  getTotalExpenses(month: number){
    return this.http.get(`${this.apiUrl}/api/property/revenue/expenses/${month}`, httpOptions);
  }
  
  deleteExpense(expenseName:string){}

  submitPayment(amountPaid: any,invoice: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/request-payment/${invoice}`
    return this.http.put<any>(url, amountPaid);
  }
  verifyPayment(invoiceNumber: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/invoices/approve-payment/${invoiceNumber}`
    return this.http.put<any>(url, invoiceNumber);
  }
 
  public downloadPaidInvoiceReport(propertyName: string, startDate: string, endDate: string): Observable<Blob> {
    // Adjust the URL and parameters as per your backend API
    const url = `/api/v1/reports/property/paid-invoices-report=${startDate}&endDate=${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  public downloadUnpaidInvoiceReport(propertyName: string, startDate: string, endDate: string): Observable<Blob> {
    // Adjust the URL and parameters as per your backend API
    const url = `/api/v1/reports/property/paid-invoices-report=${startDate}&endDate=${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }



  // public downloadPaidInvoiceReport(propertyName: string, startDate: Date, endDate: Date): Observable<Blob> {
  //   const url = `${this.apiUrl}/api/v1/reports/property/paid-invoices-report`;
  //   const params = { propertyName: propertyName, startDate: startDate.toISOString(), endDate: endDate.toISOString() };
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  // public downloadUnpaidInvoiceReport(propertyName: string, startDate: Date, endDate: Date): Observable<Blob> {
  //   const url = `${this.apiUrl}/api/v1/reports/property/paid-invoices-report`;
  //   const params = { propertyName: propertyName, startDate: startDate.toISOString(), endDate: endDate.toISOString() };
  //   return this.http.get(url, { responseType: 'blob' });
  // }

}










