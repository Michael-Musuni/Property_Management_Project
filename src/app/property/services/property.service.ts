import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // getmonthlyrentdata: any;
  // getpropertycountdata: any;

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public registerProperty(property: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/property/add`, property);
  }

  public getProperties() {
    return this.http.get(`${environment.apiUrl}/api/v1/property/get`);
  }

  public getCharges(propertyId: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/property/charges?propertyId=` + propertyId, httpOptions);
  }

  getUnits(status: string, propertyId: any) {
    return this.http.get(`${environment.apiUrl}/api/v1/property/units?status=` + status + `&popertyId=` + propertyId, httpOptions);
  }
  getPropertyOwners() {
    return this.http.get(`${environment.apiUrl}/api/v1/property/owner`, httpOptions);
  }

  public getlinegraphdata() {
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/onboardedTenants`, httpOptions);
  }

 
   
  public getmonthlyrentdata(){
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/monthly-rent`,httpOptions);
  }

  public getpropertycountdata(){
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/property-count`,httpOptions);
  }


  public downloadUnitsOccupiedReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-occupied?propertyName=${propertyName}`, { responseType: 'blob'});
  }
  
  public downloadUnitsunoccupiedReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-unoccupied?propertyName=${propertyName}`, { responseType: 'blob'});
  }
  public updateProperty(id: any, data: any): Observable<any>{
    // console.log("next of kin to be submitted "+data.nextOfKin.nextOfKinName)
    return this.http.put(`${environment.apiUrl}/api/v1/property/update?id=${id}`, data)
  }
  public deleteProperty(id: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/property/delete?id=${id}`)
  }
  
  downloadUnitsperPropertyReport(propertyName: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-per-property?propertyName=${propertyName}`, { responseType: 'blob'});
}
}
