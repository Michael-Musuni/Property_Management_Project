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
export class UtilitiesService {

  constructor(private httpClient: HttpClient) { }

 getUtilities() {
    return this.httpClient.get(`${environment.apiUrl}/api/v1/utilities/getall`, httpOptions)
  }
  addUtilities(data: any) {
  
    return this.httpClient.post(`${environment.apiUrl}/api/v1/utilities/add`, data)
  }
  updateAmenity(data: any) {
  
    return this.httpClient.put(`${environment.apiUrl}/api/v1/utilities/add`, data)
  }
}
