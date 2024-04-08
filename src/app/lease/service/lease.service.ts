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
  getActiveContractsPerProperty(propertyId:number):Observable<any>{
    const url = `${this.apiUrl}/api/v1/analytics/active-contracts/{propertyId}/${propertyId}`;
    return this.http.get<any>(url, httpOptions);
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

  
}
