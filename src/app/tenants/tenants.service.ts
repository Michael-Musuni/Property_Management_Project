import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  addTenant(tenantData: any): Observable<any> {
    const addTenantUrl = `${this.apiUrl}/api/property/tenant/add`;

    return this.http.post<any>(addTenantUrl, tenantData);
  }
  getTenant(){
    const addTenantUrl = `${this.apiUrl}/api/property/tenant/tenants`;
    return this.http.get<any>(addTenantUrl);
  }
  public getProperties() {
    return this.http.get(`${environment.apiUrl}/api/v1/property/get`);
  }
  deletetenant(tenantData: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/customer/delete/`)
  }
  public downloadTenantsPerPropertyReport(propertyName: any): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/v1/reports/property/tenants-per-property?propertyName=${propertyName}`, { responseType: 'blob'});
  }
  // getTenantById(tenantId:any){
  //   const addTenantUrl = `${this.apiUrl}/api/property/tenant?tenantId=`+tenantId;
  //   return this.http.get<any>(addTenantUrl);
  // }

}