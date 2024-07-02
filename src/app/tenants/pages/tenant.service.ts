import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  downloadtenantpayementsReport(propertyName: any, selectedYear: any, selectedMonth: any) {
    throw new Error('Method not implemented.');
  }
  getProperties() {
    throw new Error('Method not implemented.');
  }
  getTenants(startDate: Date, endDate: Date) {
    throw new Error('Method not implemented.');
  }
  
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
  getTenantById(tenantId:any){
    const addTenantUrl = `${this.apiUrl}/api/property/tenant?tenantId=`+tenantId;
    return this.http.get<any>(addTenantUrl);
  }
  // updateTenant(tenantId:any){
  //   const addTenantUrl = `${this.apiUrl}/api/property/tenant?tenantId=`+tenantId;
  //   return this.http.get<any>(addTenantUrl);
  // }

  addadditionalInfo(showAdditionalInfoForm:boolean): Observable<boolean> {
    const addadditionalInfoUrl =`${this.apiUrl}/api/v1/kyc/verify`;
    return this.http.post<boolean>(addadditionalInfoUrl,showAdditionalInfoForm)
  }
  getAdditionalInfo(){
    const addadditionalInfoUrl = `${this.apiUrl}/api/v1/kyc/autheniticate`;
    
  }
  public deleteTenant(id: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/property/tenant/${id}`)
  }
  getunit(){
    return this.http.get(`${environment.apiUrl}/api/v1/property/vacant-properties`)
  }
  getunits(id:any){
    return this.http.get(`${environment.apiUrl}/api/v1/lease/details?propertyId=${id}`)
  }
  public updateTenant(id: any, data: any): Observable<any>{
    console.log("next of kin to be submitted "+data.nextOfKin.nextOfKinName)
    return this.http.put(`${environment.apiUrl}/api/property/tenant/${id}`, data)
  }
  public viewTenant(id: any, data: any): Observable<any>{
    console.log("next of kin to be submitted "+data.nextOfKin.nextOfKinName)
    return this.http.put(`${environment.apiUrl}/api/property/tenant/${id}`, data)
  }
  
  getOnboardedTenantsData(): Observable<any> {
    const onboardedTenantsUrl = `${this.apiUrl}/api/v1/analytics/onboardedTenants`;

    return this.http.get<any>(onboardedTenantsUrl);
  }
  // deleteTenant(tenantId: number): Observable<any> {
  //   return this.http.delete(`/api/property/tenant/${tenantId}`);
  // }
  getActiveTenants(startDate: Date, endDate: Date): Observable<number> {
    const activeTenantsUrl = `${this.apiUrl}/api/property/tenant/active/range`;
    return this.http.get<number>(activeTenantsUrl, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
  }
  

}