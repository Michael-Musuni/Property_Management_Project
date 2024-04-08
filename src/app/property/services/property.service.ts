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


  public downloadUnitsOccupiedReport(propertyName: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-occupied?propertyName=${propertyName}`);
  }
  
  public downloadUnitsunoccupiedReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-unoccupied?propertyName=${propertyName}`, { responseType: 'blob'});
  }

  public getamenityonboardeddata() {
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/amenity-onboarded`,httpOptions);
  }

  public getutilitycostdata() {
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/utility-cost`,httpOptions);
  }
  downloadUnitsperPropertyReport(propertyName: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/units-per-property?propertyName=${propertyName}`, { responseType: 'blob'});
}
}