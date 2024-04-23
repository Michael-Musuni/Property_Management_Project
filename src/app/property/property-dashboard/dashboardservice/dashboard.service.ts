import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  pickproperty() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}
  public getRevenueFromPropertiesData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/revenue-from-properties`,httpOptions);
  }
  public getRevenuePieChartData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/revenue-pie-chart`,httpOptions);
  }
  public getWidgetsdata(){
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/dashboardData`,httpOptions);
  }
  public getConfigs() {
    return this.http.get(`${environment.apiUrl}/api/v1/rent/configuration/configuratios`,httpOptions);
  }
  public getChartsdata(propertyId:any){
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/occupied-unoccupied/`+ propertyId, httpOptions);
  }
  public getlinegraphdata(){
    return this.http.get(`${environment.apiUrl}/api/v1/analytics/onboardedTenants`,httpOptions);
  }
  public getpropertydata(){
    return this.http.get(`${environment.apiUrl}/api/v1/property/get`,httpOptions);
  }
  public getvacantunitsdata(){
    return this.http.get(`${environment.apiUrl}/api/v1/property/vacantunits`,httpOptions);
    
  }
 
}
