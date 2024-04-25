import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  private apiUrl = environment.apiUrl

  private baseUrl = '/api/v1';

  private updateDataSubject = new Subject<void>();

  constructor(private http:HttpClient) { }

  updateData() {
    this.updateDataSubject.next();
  }

  getUpdateData() {
    return this.updateDataSubject.asObservable();
  }


  newContract(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/lease/create-contract`,data)
  }
  updateContract(data:any): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/v1/lease/update-contract`,data)
  }
  getContracts(){
    return this.http.get(`${environment.apiUrl}/api/v1/lease/all-contracts`,httpOptions)
  }
  deleteContracts(contractId: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/lease/delete/${contractId}`);
  }

  // public getLeaseReport(params?: HttpParams):Observable <any>{
  //   const url =   `${environment.apiUrl}/api/v1/lease/download`;
  //   return this.http.get<any>(url, {params:params});
  // }

  public getLeaseReport(leaseId: any):Observable <Blob>{
    return this.http.get(`${environment.apiUrl}/api/v1/lease/download?leaseId=${leaseId}`, { responseType: 'blob'});
  }
  getActiveContracts(): Observable<any> {
    const onboardedTenantsUrl = `${this.apiUrl}/api/v1/analytics/onboardedTenants`;
   
    return this.http.get<any>(onboardedTenantsUrl);
   
  }
  getActiveContractsData(): Observable<any> {
    const endpointUrl = `${this.baseUrl}/api/v1/analytics/active-contracts`;
    return this.http.get<any>(endpointUrl);
  }
  public getProperties() {
    return this.http.get(`${environment.apiUrl}/api/v1/property/get`);
  }
  public downloadActiveContractsReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/active-lease?propertyName=${propertyName}`, { responseType: 'blob' });
  }
  public downloadTerminatedContractsReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/terminated-lease?propertyName=${propertyName}`, { responseType: 'blob' });
  }
  terminateContract(contractId: any): Observable<any> {
    // Construct the URL with the contractId
    const url = `${this.apiUrl}/api/v1/lease/terminate/${contractId}`;

    // Send a DELETE request to terminate the contract
    return this.http.delete(url);
  }
  
}
