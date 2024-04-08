import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RentService {


  constructor(private http: HttpClient) { }

  public config(data:any){
    return this.http.post(`${environment.apiUrl}/api/v1/rent/configuration/configure`,data);
  }
  public getConfigs() {
    return this.http.get(`${environment.apiUrl}/api/v1/rent/configuration/configurations`,httpOptions);
  }
  public getConfigsPerProperty(propertyId:any) {
    return this.http.get(`${environment.apiUrl}/api/v1/rent/configuration/property?propertyId=`+propertyId,httpOptions);
  }
}
